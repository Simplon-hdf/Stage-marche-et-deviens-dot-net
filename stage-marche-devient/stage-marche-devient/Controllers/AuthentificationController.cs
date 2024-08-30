using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.ModelsDTO;
using stage_marche_devient.Repositorys;
using stage_marche_devient.Models;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace stage_marche_devient.Controllers
{
    public class AuthentificationController : ControllerBase
    {
        private readonly IAuthentificationRepository _authRepository;
        private readonly ApiDbContext _dataContext;
        private readonly IConfiguration _configuration;
        UtilisateurModel utilisateurModel = new UtilisateurModel();

        public AuthentificationController(ApiDbContext dataContext, IAuthentificationRepository authconfig, IConfiguration configuration)
        {
            _authRepository = authconfig;
            _dataContext = dataContext;
            _configuration = configuration;
        }

        // Clé Pepper secrète (Ne jamais stocker en base de données, gardez-la sécurisée)
        private static readonly string Pepper = "Tl*KnfIaz&!bMlV$6z3hJ$i-mwfaE^BO+Hg%6kn0eyc5n%nl$kJEzT7Sw1Nn+XHs";

        // Méthode pour dériver le salt à partir d'une donnée constante (par exemple, email)
        private string DeriveSalt(string email)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] emailBytes = Encoding.UTF8.GetBytes(email);
                byte[] hashBytes = sha256.ComputeHash(emailBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        // fonction de creation du hash et salt du mdp en sha512 et retour du salt et hash 
        private string CreerMdpHash(string password, string salt, string pepper)
        {
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
            string Salt = DeriveSalt(requete.mailUtilisateur);
            //si requête est vide ou un champs vide, envoie d'une erreur
            if (requete == null || string.IsNullOrEmpty(requete.mailUtilisateur) || string.IsNullOrEmpty(requete.motDePasse))
            {
                return BadRequest("formulaire incomplet");
            }

            // recherche du mail dans la bdd et assignation à la variable Utilisateur
            var utilisateur = await _dataContext.Utilisateur.FirstOrDefaultAsync(r => r.MailUtilisateur == requete.mailUtilisateur);

            // si Utilisateur n'est pas trouvé ou si le mdp est incorrect, renvoie d'un message
            if (utilisateur == null)
            {

                return BadRequest("Mail ou Mot de passe incorrect");
            }
            try
            {
                if (CreerMdpHash(requete.motDePasse, Salt, Pepper) == utilisateur.MdpUtilisateur)
                { //retour d'un Utilisateur
                    return Ok(new { Utilisateur = utilisateur });
                }
                else
                {
                    return BadRequest("Mot de passe éronné");
                }

            }
            // si "try" à échouer, envoie d'une erreur  
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
            var secretKey = _configuration.GetValue<string>("Token");
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
    }
}
