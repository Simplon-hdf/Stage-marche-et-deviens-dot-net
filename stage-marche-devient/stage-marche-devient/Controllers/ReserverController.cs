using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReserverController : Controller
    {
        private readonly ApiDbContext _contexteBdd; // Contexte de la base de données
        private readonly ReserverRepository _repository; // Références au dépôt de réservations

        // Constructeur du contrôleur
        public ReserverController(ApiDbContext context)
        {
            _contexteBdd = context; // Initialisation du contexte de la base de données
            _repository = new ReserverRepository(context); // Création d'une instance du dépôt
        }

        #region Récupération liste
        // Méthode pour récupérer toutes les réservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReserverModel>>> RecupererReservations()
        {
            // Récupération de la liste des réservations
            IEnumerable<ReserverModel> listeReservations = await _repository.GetAll();
            return Ok(listeReservations); // Retourne la liste des réservations
        }
        #endregion

        #region Récupération par id
        // Méthode pour récupérer une réservation par ID utilisateur et ID session
        [HttpGet("{idUtilisateur},{idSession}")]
        public async Task<ActionResult<ReserverModel>> RecupererReservation(int idUtilisateur, int idSession)
        {
            // Récupération de la réservation spécifique
            ReserverModel reservation = await _repository.GetByIds(idUtilisateur, idSession);
            if (reservation == null) { return NotFound(); } // Si la réservation n'existe pas, retourne 404
            return Ok(reservation); // Retourne la réservation trouvée
        }

        [HttpGet("{idUtilisateur}")] // Définit une route GET 
        public async Task<ActionResult<IEnumerable<ReserverModel>>> RecupererPossederParIdPublication(int idUtilisateur)
        {
            IEnumerable<ReserverModel> posseder = await _repository.GetByUtilisateurId(idUtilisateur);
            if (posseder == null) { return NotFound(); } // Retourne 404 si non trouvé
            return Ok(posseder); // Retourne le Posseder trouvé avec un statut 200 OK
        }
        [HttpGet("{idSession}")] // Définit une route GET 
        public async Task<ActionResult<IEnumerable<ReserverModel>>> RecupererPossederParIdTag(int idSession)
        {
            IEnumerable<ReserverModel> posseder = await _repository.GetBySessionId(idSession);
            if (posseder == null) { return NotFound(); } // Retourne 404 si non trouvé
            return Ok(posseder); // Retourne le Posseder trouvé avec un statut 200 OK
        }
        #endregion

        #region Création réservation
        // Méthode pour créer une nouvelle réservation
        [HttpPost]
        public async Task<ActionResult<ReserverModel>> CreationReservation(ReserverModel reservation)
        {
            // Ajout de la nouvelle réservation
            bool result = await _repository.Add(reservation);
            if (result) { return CreatedAtAction("Création de la réservation :", new { reservation }); } // Retourne 201 si créé avec succès
            return BadRequest(); // Retourne 400 si la création échoue
        }
        #endregion

        #region Mise à jour réservation
        // Méthode pour mettre à jour une réservation existante
        [HttpPut("{idUtilisateur},{idSession}")]
        public async Task<ActionResult> MiseAJourReservation(ReserverModel reservation, int idUtilisateur, int idSession)
        {
            // Récupération de la réservation à mettre à jour
            ReserverModel reservationAMettreAJour = await _repository.GetByIds(idUtilisateur, idSession);
            if (reservationAMettreAJour == null) { return NotFound(); } // Retourne 404 si la réservation n'existe pas
            else
            {
                // Mise à jour de la réservation
                bool aEteMiseAJour = await _repository.Update(reservation, idUtilisateur, idSession);
                if (!aEteMiseAJour) { return BadRequest("Erreur : Mise à jour impossible"); } // Retourne 400 si la mise à jour échoue
                else { return Ok(); } // Retourne 200 si la mise à jour réussit
            }
        }
        #endregion

        #region Suppression réservation
        // Méthode pour supprimer une réservation
        [HttpDelete("{idUtilisateur},{idSession}")]
        public async Task<ActionResult> SuppressionReservation(int idUtilisateur, int idSession)
        {
            // Récupération de la réservation à supprimer
            ReserverModel reservationASupprimer = await _repository.GetByIds(idUtilisateur, idSession);
            if (reservationASupprimer == null) { return NotFound(); } // Retourne 404 si la réservation n'existe pas
            else
            {
                // Suppression de la réservation
                bool aEteSupprimee = await _repository.Delete(idUtilisateur, idSession);
                if (!aEteSupprimee) { return BadRequest("Erreur : Suppression impossible"); } // Retourne 400 si la suppression échoue
                else { return Ok(); } // Retourne 200 si la suppression réussit
            }
        }
        #endregion
    }
}