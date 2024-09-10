using stage_marche_devient.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using stage_marche_devient.Data;
using stage_marche_devient.ModelsDTO;
using stage_marche_devient.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Antiforgery;

namespace stage_marche_devient.Controllers
{
    public class AuthentificationController : ControllerBase
    {
        private readonly IAuthentificationRepository _authRepository;
        private readonly ApiDbContext _dataContext;
        private readonly IConfiguration _configuration;
        UtilisateurModel utilisateurModel = new UtilisateurModel();
        private readonly IAntiforgery _antiforgery;

        public AuthentificationController(ApiDbContext dataContext, IAuthentificationRepository authconfig, IConfiguration configuration, IAntiforgery antiforgery)
        {
            _authRepository = authconfig;
            _dataContext = dataContext;
            _configuration = configuration;
            _antiforgery = antiforgery;
        }

        // Clé Pepper secrète (Ne jamais stocker en base de données, gardez-la sécurisée)
        private static readonly string Pepper = "Tl*KnfIaz&!bMlV$6z3hJ$i-mwfaE^BO+Hg%6kn0eyc5n%nl$kJEzT7Sw1Nn+XHs";

        // Méthode pour dériver le salt à partir d'une donnée constante (par exemple, email)
        private string DeriveSalt(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email), "L'email ne peut pas être null ou vide.");
            }

            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] emailBytes = Encoding.UTF8.GetBytes(email);
                byte[] hashBytes = sha512.ComputeHash(emailBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        // fonction de creation du hash et salt du mdp en sha512 et retour du salt et hash 
        private string CreerMdpHash(string password, string salt, string pepper)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(salt) || string.IsNullOrEmpty(pepper))
            {
                throw new ArgumentNullException("Les paramètres password, salt et pepper ne peuvent pas être null ou vides.");
            }
            // Combiner le mot de passe avec le salt et le pepper
            string combined = password + salt + pepper;

            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] combinedBytes = Encoding.UTF8.GetBytes(combined);
                byte[] hashBytes = sha512.ComputeHash(combinedBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        // methode d'enregistrement d'un Utilisateur

        [HttpPost("Inscription")]
        public async Task<ActionResult<UtilisateurModel>> Enregistrer(UtilisateurDTO requete)
        {
            string Salt = DeriveSalt(requete.Mail);
            try
            {
                // hash et salt du mdp
                string mdpHash = CreerMdpHash(requete.Mdp, Salt, Pepper);

                // creation d'un nouvel utilisateur avec un id,nom,prenom,mail et tel ainsi que les hash et salt+pepper du mdp
                utilisateurModel.DateCreationUtilisateur = Convert.ToString(DateOnly.FromDateTime(DateTime.Now));
                utilisateurModel.MailUtilisateur = requete.Mail;
                utilisateurModel.NomUtilisateur = requete.Nom;
                utilisateurModel.PrenomUtilisateur = requete.Prenom;
                utilisateurModel.MdpUtilisateur = mdpHash;
                utilisateurModel.TelUtilisateur = requete.Telephone;
                _dataContext.Utilisateur.Add(utilisateurModel);
                _dataContext.SaveChanges();
                return Ok(utilisateurModel);
            }
            // si échec, gestion de l'erreur avec un message
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur du serveur : {ex.Message}");
            }
        }

        [HttpPost("Connexion")]
        public async Task<ActionResult<UtilisateurModel>> Connexion(LoginDTO requete)
        {
            // Vérification des champs du formulaire
            if (requete == null || string.IsNullOrEmpty(requete.mailUtilisateur) || string.IsNullOrEmpty(requete.motDePasse))
            {
                return BadRequest("Formulaire incomplet");
            }

            // Deriver le salt à partir de l'email
            string Salt = DeriveSalt(requete.mailUtilisateur);

            // Rechercher l'utilisateur dans la base de données
            var utilisateur = await _dataContext.Utilisateur.FirstOrDefaultAsync(r => r.MailUtilisateur == requete.mailUtilisateur);

            if (utilisateur == null)
            {
                return BadRequest("Mail ou mot de passe incorrect");
            }

            try
            {
                // Comparer le hash du mot de passe fourni avec celui stocké en BDD
                if (CreerMdpHash(requete.motDePasse, Salt, Pepper) == utilisateur.MdpUtilisateur)
                {
                    // Retourner un utilisateur avec le token
                    string token = CreationToken(utilisateur);
                    return Ok(new { Utilisateur = utilisateur, Token = token });
                }
                else
                {
                    return BadRequest("Mot de passe erroné");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur du serveur : {ex.Message} - {ex.StackTrace}");
            }
        }

        // fonction de creation de token
        private string CreationToken(UtilisateurModel utilisateur)
        {
            // création de claim
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Email, utilisateur.MailUtilisateur),
                new Claim(ClaimTypes.Role, "Utilisateur")
            };
            // génération du token
            var secretKey = _configuration.GetValue<string>("JwtSettings:Token");
            // vérification si token est existant
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("La clé secrète du token n'est pas configurée.");
            }
            // génération de la clé pour le token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // génération de la signature pour le token
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // génération de la structure token avec les claims, credentials et la date d'expiration
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            // création du token
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            //renvoie du token
            return jwt;
        }

        [HttpGet("csrf-token")]
        public IActionResult GetCsrfToken()
        {
            var token = _antiforgery.GetAndStoreTokens(HttpContext);
            return Ok(new { token = token.RequestToken });
        }
    }
}
