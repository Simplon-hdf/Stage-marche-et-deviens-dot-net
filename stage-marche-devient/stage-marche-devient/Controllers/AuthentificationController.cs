using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.ModelsDTO;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [ApiController]
    [Route("Auth")]
    public class AuthentificationController : ControllerBase
    {
        private readonly IAuthentificationRepository _authRepository;
        private readonly ApiDbContext _dataContext;
        private readonly IConfiguration _configuration;
        private readonly IAuditRepository<AuditLog> _auditRepository;
        private readonly IAntiforgery _antiforgery;
        private readonly ILogger<AuthentificationController> _logger;
        private static readonly string Pepper = "Tl*KnfIaz&!bMlV$6z3hJ$i-mwfaE^BO+Hg%6kn0eyc5n%nl$kJEzT7Sw1Nn+XHs";

        public AuthentificationController(
            ApiDbContext dataContext,
            IAuthentificationRepository authconfig,
            IConfiguration configuration,
            IAuditRepository<AuditLog> auditRepository,
            IAntiforgery antiforgery,
            ILogger<AuthentificationController> logger)
        {
            _authRepository = authconfig;
            _dataContext = dataContext;
            _configuration = configuration;
            _antiforgery = antiforgery;
            _logger = logger;
            _auditRepository = auditRepository;
        }

        private string DeriveSalt(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentNullException(nameof(email), "L'email ne peut pas être null ou vide.");
            }

            using var sha512 = SHA512.Create();
            byte[] emailBytes = Encoding.UTF8.GetBytes(email);
            byte[] hashBytes = sha512.ComputeHash(emailBytes);
            return Convert.ToBase64String(hashBytes);
        }

        private string CreerMdpHash(string password, string salt, string pepper)
        {
            if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(salt) || string.IsNullOrEmpty(pepper))
            {
                throw new ArgumentNullException("Les paramètres password, salt et pepper ne peuvent pas être null ou vides.");
            }
            string combined = password + salt + pepper;

            using var sha512 = SHA512.Create();
            byte[] combinedBytes = Encoding.UTF8.GetBytes(combined);
            byte[] hashBytes = sha512.ComputeHash(combinedBytes);
            return Convert.ToBase64String(hashBytes);
        }

        [HttpPost("Inscription")]
        public async Task<ActionResult<UtilisateurModel>> Enregistrer(UtilisateurDTO requete)
        {
            _logger.LogInformation($"Tentative d'inscription pour l'email: {requete.Mail}");
            
            if (!ModelState.IsValid)
            {
                await _auditRepository.CreationLog(requete.Mail, "Inscription", "Utilisateur", "Tentative d'inscription d'un utilisateur.");
                return BadRequest(ModelState);
            }

            try
            {
                string Salt = DeriveSalt(requete.Mail);
                string mdpHash = CreerMdpHash(requete.Mdp, Salt, Pepper);

                var utilisateur = new UtilisateurModel
                {
                    DateCreationUtilisateur = DateOnly.FromDateTime(DateTime.Now).ToString(),
                    MailUtilisateur = requete.Mail,
                    NomUtilisateur = requete.Nom,
                    PrenomUtilisateur = requete.Prenom,
                    MdpUtilisateur = mdpHash,
                    TelUtilisateur = requete.Telephone
                };

                _dataContext.Utilisateur.Add(utilisateur);
                await _dataContext.SaveChangesAsync();

                // Log d'audit pour l'inscription réussie
                await _auditRepository.CreationLog(requete.Mail, "Inscription", "Utilisateur", "Nouvel utilisateur inscrit.");

                _logger.LogInformation("Inscription réussie.");
                return Ok(utilisateur);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'inscription.");
                // Log d'audit pour l'échec de l'inscription
                await _auditRepository.CreationLog(requete.Mail, "Inscription", "Utilisateur", $"Erreur lors de l'inscription : {ex.Message}");
                return StatusCode(500, "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.");
            }
        }

        [HttpPost("Connexion")]
        public async Task<ActionResult<UtilisateurModel>> Connexion(LoginDTO requete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var utilisateur = await _dataContext.Utilisateur.FirstOrDefaultAsync(r => r.MailUtilisateur == requete.mailUtilisateur);

                if (utilisateur == null)
                {
                    await _auditRepository.CreationLog(requete.mailUtilisateur, "Connexion", "Utilisateur", "Erreur lors de la connexion : mail incorrect");
                    return BadRequest("Mail incorrect");
                }

                string Salt = DeriveSalt(requete.mailUtilisateur);
                if (CreerMdpHash(requete.motDePasse, Salt, Pepper) == utilisateur.MdpUtilisateur)
                {
                    string token = CreationToken(utilisateur);
                    await _auditRepository.CreationLog(requete.mailUtilisateur, "Connexion", "Utilisateur", "Connexion réussi par l'utilisateur");
                    return Ok(new { Utilisateur = utilisateur, Token = token });
                }
                else
                {
                    await _auditRepository.CreationLog(requete.mailUtilisateur, "Connexion", "Utilisateur", "Erreur lors de la connexion : mot de passe incorrect");
                    return BadRequest("Mot de passe erroné");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la connexion.");
                await _auditRepository.CreationLog(requete.mailUtilisateur, "Connexion", "Utilisateur", "Erreur lors de la connexion : délai expiré");
                return StatusCode(500, "Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.");
            }
        }

        private string CreationToken(UtilisateurModel utilisateur)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, utilisateur.MailUtilisateur),
                new Claim(ClaimTypes.Role, "Utilisateur")
            };

            var secretKey = _configuration["JwtSettings:Token"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("La clé secrète du token n'est pas configurée.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet("csrf-token")]
        public IActionResult GetCsrfToken()
        {
            var token = _antiforgery.GetAndStoreTokens(HttpContext);
            return Ok(new { token = token.RequestToken });
        }
    }
}