using stage_marche_devient.Data;                         /* Importe le namespace contenant la classe ApiDBContext*/
using stage_marche_devient.Models;                       /*  Importe le namespace contenant le modèle Utilisateur*/
using stage_marche_devient.Repositories;                   /*Importe le namespace contenant le repository UtilisateurRepository*/
using Microsoft.AspNetCore.Mvc;                             /*Importe les classes nécessaires pour créer des contrôleurs Web API dans ASP.NET Core*/

namespace MarcheEtDevient.Server.Controllers                /*Définit le namespace pour regrouper les contrôleurs de l'application
                                                             * Cela aide à organiser le code*/
{
    [ApiController]                                         /* Indique que cette classe est un contrôleur API
                                                             * Cela active certaines fonctionnalités intégrées 
                                                             * comme la validation automatique du modèle*/


    [Route("api/[controller]")]                             /*Définit la route pour ce contrôleur. 
                                                            * [controller] sera remplacé par le nom du contrôleur, ici "Utilisateurs", 
                                                            * donc les routes commenceront par "api/utilisateurs"*/

    public class UtilisateurController : ControllerBase    /*Déclare la classe UtilisateursController qui hérite de ControllerBase
                                                            * la classe de base pour les contrôleurs API dans ASP.NET Core*/
    {
        private readonly ApiDbContext _context;             /*Champ privé pour stocker une instance de ApiDBContext
                                                            * utilisée pour interagir avec la base de données*/

        private readonly UtilisateurRepository _repository; /*Champ privé pour stocker une instance de UtilisateurRepository
                                                            * utilisée pour effectuer les opérations CRUD sur les utilisateurs*/
        private readonly IAuditRepository<AuditLog> _auditRepository;

        public UtilisateurController(ApiDbContext context, IAuditRepository<AuditLog> auditRepository) /*Constructeur de la classe UtilisateursController
                                                             * Il prend une instance de ApiDBContext en paramètre*/
        {
            _context = context;                                /*Initialise le champ _context avec l'instance de ApiDBContext passée en paramètre*/
            _repository = new UtilisateurRepository(_context);  /*Initialise le champ _repository avec une nouvelle instance de UtilisateurRepository
                                                                 * en passant le contexte de la base de données
                                                                 * Cela permet d'utiliser les méthodes du repository dans le contrôleur*/
            _auditRepository = auditRepository;

        }

        [HttpGet]                                              /*Indique que cette méthode répondra aux requêtes HTTP GET à l'URL définie 
                                                                 * par la route du contrôleur (par exemple, "api/utilisateurs")*/
        public async Task<ActionResult<IEnumerable<UtilisateurModel>>> GetAllUtilisateurs() /*Déclare une méthode asynchrone qui retourne une liste de tous les utilisateurs 
                                                                                        * sous forme de Task<ActionResult<IEnumerable<Utilisateur>>>*/
        {
            var utilisateurs = await _repository.GetAll();      /*Appelle la méthode GetAll du repository pour récupérer tous les utilisateurs de la base de données*/
            return Ok(utilisateurs);                            /*Retourne un code de réponse HTTP 200 OK 
                                                                 * avec la liste des utilisateurs en tant que corps de réponse*/
        }

        [HttpGet("{id}")]                                       /*Indique que cette méthode répondra aux requêtes HTTP GET 
                                                                * avec un paramètre id dans l'URL (par exemple, "api/utilisateurs/1")*/

        public async Task<ActionResult<UtilisateurModel>> GetUtilisateur(int id) /*Déclare une méthode asynchrone qui retourne un utilisateur spécifique par son ID*/
        {
            var utilisateur = await _repository.GetById(id);    /*Appelle la méthode GetById du repository pour récupérer l'utilisateur correspondant à l'ID fourni*/
            if (utilisateur == null)                             /*Vérifie si l'utilisateur n'existe pas*/
            {
                return NotFound();                              /* Si l'utilisateur n'existe pas 
                                                                 * retourne un code de réponse HTTP 404 Not Found*/
            }
            return Ok(utilisateur);                             /*Si l'utilisateur existe
                                                                 * retourne un code de réponse HTTP 200 OK avec l'utilisateur en tant que corps de réponse*/
        }

        [HttpPost]                                              /*Indique que cette méthode répondra aux requêtes HTTP POST
                                                                 * utilisées pour créer de nouvelles ressources*/

        /* je déclare une méthode asynchrone qui crée un nouvel utilisateur*/
        public async Task<ActionResult<UtilisateurModel>> CreateUtilisateur(UtilisateurModel utilisateur)
        {

            var result = await _repository.Add(utilisateur);    /*Appelle la méthode Add du repository pour ajouter le nouvel utilisateur à la BDD*/
            if (result)                                         /*Vérifie si l'ajout a réussi*/
            {
                await _auditRepository.CreationLog(utilisateur.MailUtilisateur, "Ajout", "Utilisateur", "Nouvel utilisateur ajouté.");
                return CreatedAtAction(nameof(GetUtilisateur), new { id = utilisateur.IdUtilisateur }, utilisateur);    /* Si l'ajout a réussi, 
                                                                                                                         * retourne un code de réponse HTTP 201 Created 
                                                                                                                         * avec l'URL de la nouvelle ressource créée 
                                                                                                                         * (utilisant GetUtilisateur pour générer l'URL) 
                                                                                                                         * et l'utilisateur en tant que corps de réponse*/
            }
            return BadRequest();                                 /*Si l'ajout a échoué, retourne un code de réponse HTTP 400 Bad Request*/
        }

        [HttpPut("{id}")]                                       /*Indique que cette méthode répondra aux requêtes HTTP PUT 
                                                                 * avec un paramètre id dans l'URL (par exemple, "api/utilisateurs/1"), 
                                                                 * utilisées pour mettre à jour une ressource existante*/

        public async Task<IActionResult> UpdateUtilisateur(int id, UtilisateurModel utilisateur) /*Déclare une méthode asynchrone qui met à jour un utilisateur existant*/

        {
            if (id != utilisateur.IdUtilisateur)                 /*Vérifie que l'ID fourni dans l'URL correspond à l'ID de l'utilisateur dans le corps de la requête*/
            {
                return BadRequest();                            /*Si les ID ne correspondent pas, retourne un code de réponse HTTP 400 Bad Request*/
            }

            var result = await _repository.Update(utilisateur, id); /*Appelle la méthode Update du repository pour mettre à jour l'utilisateur*/

            if (result)                                          /* Vérifie si la mise à jour a réussi*/
            {
                await _auditRepository.CreationLog(utilisateur.IdUtilisateur.ToString(), "Mise à jour", "Utilisateur", "Un utilisateur a été mis à jour.");
                return Ok("Modification réussie");              /*Si la mise à jour a réussi, 
                                                                 * retourne un code de réponse HTTP 200 OK avec un message de confirmation*/
            }
            return NotFound();                                   /*Si l'utilisateur n'a pas été trouvé (et donc pas mis à jour), retourne un code de réponse HTTP 404 Not Found*/

        }



        [HttpDelete("{id}")]                                     /*Indique que cette méthode répondra aux requêtes HTTP DELETE 
                                                                  * avec un paramètre id dans l'URL 
                                                                  * (par exemple, "api/utilisateurs/1")
                                                                  * utilisées pour supprimer une ressource existante*/

        public async Task<IActionResult> DeleteUtilisateurModel(int id) /*Déclare une méthode asynchrone qui supprime un utilisateur existant*/
        {
            bool result = await _repository.Delete(id);              /*Appelle la méthode Delete du repository pour supprimer l'utilisateur par son ID*/

            if (result)                                             /*Vérifie si la suppression a réussi*/
            {
                await _auditRepository.CreationLog(id.ToString(), "Supprimer", "Utilisateur", "L'utilisateur a été supprimé.");
                return Ok("Suppression réussie");                   /*Si la suppression a réussi, 
                                                                    * retourne un code de réponse HTTP 200 OK 
                                                                    * avec un message de confirmation*/
            }
            return NotFound();                                      /*Si l'utilisateur n'a pas été trouvé (et donc pas supprimé)
                                                                    * retourne un code de réponse HTTP 404 Not Found*/
        }
        [HttpGet("total")]
        public async Task<IActionResult> totalUtilisateur()
        {
            return Ok( await _repository.GetTotalUtilisateur());
        }
        [HttpGet("totalKms")]
        public async Task<ActionResult<int>> totalKmsUtilisateur()
        {
            IEnumerable<UtilisateurModel> utilisateurs = await _repository.GetAll();
            if(utilisateurs == null)
            {
                return NotFound("aucun utilisateur dans la banque de données");
            }
            int totalkms = 0;
            foreach(UtilisateurModel utilisateur in utilisateurs)
            {
                totalkms += utilisateur.TotalDistanceParcourueUtilisateur;
            }
            return Ok(totalkms);                            
                                                                
        }

    }
}

        
    

