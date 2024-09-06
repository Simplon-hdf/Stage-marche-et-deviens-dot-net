using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Controllers
{
    [ApiController] // Indique que cette classe est un contrôleur API
    [Route("api/[controller]")] // Définit la route de base pour ce contrôleur
    public class PossederController : Controller
    {
        private readonly ApiDbContext _contexteBdd; // Contexte de la base de données
        private readonly PossederRepository _repository; // Repository pour les opérations sur Posseder

        // Constructeur du contrôleur
        public PossederController(ApiDbContext context)
        {
            _contexteBdd = context;
            _repository = new PossederRepository(context);
        }

        #region Récupération liste
        [HttpGet] // Définit une route GET pour récupérer tous les Posseders
        public async Task<ActionResult<IEnumerable<PossederModel>>> RecupererPosseders()
        {
            IEnumerable<PossederModel> listePosseders = await _repository.GetAll();
            return Ok(listePosseders); // Retourne la liste avec un statut 200 OK
        }
        #endregion

        #region Récupération par id

        [HttpGet("{idPublication},{idTagPublication}")] // Définit une route GET avec deux paramètres
        public async Task<ActionResult<PossederModel>> RecupererPosseder(int idPublication, int idTagPublication)
        {
            PossederModel posseder = await _repository.GetByIds(idPublication, idTagPublication);
            if (posseder == null) { return NotFound(); } // Retourne 404 si non trouvé
            return Ok(posseder); // Retourne le Posseder trouvé avec un statut 200 OK
        }

        [HttpGet("idPublication:{idPublication}")] // Définit une route GET avec deux paramètres
        public async Task<ActionResult<IEnumerable<PossederModel>>> RecupererPossederParIdPublication(int idPublication)
        {
            IEnumerable<PossederModel> posseder = await _repository.GetByPublicationId(idPublication);
            if (posseder == null) { return NotFound(); } // Retourne 404 si non trouvé
            return Ok(posseder); // Retourne le Posseder trouvé avec un statut 200 OK
        }

        [HttpGet("idTagPublication:{idTagPublication}")]
        public async Task<ActionResult<IEnumerable<PossederModel>>> RecupererPossederParIdTag(int idTagPublication)
        {
            IEnumerable<PossederModel> posseder = await _repository.GetByTagId(idTagPublication);
            if (posseder == null) { return NotFound(); } // Retourne 404 si non trouvé
            return Ok(posseder); // Retourne le Posseder trouvé avec un statut 200 OK
        }
        #endregion

        #region Création posseder
        [HttpPost] // Définit une route POST pour créer un nouveau Posseder
        public async Task<ActionResult<PossederModel>> CreationPosseder(PossederModel posseder)
        {
            bool result = await _repository.Add(posseder);
            if (result) { return Created("possetion defini", posseder); } // Retourne 201 Created si réussi
            return BadRequest(); // Retourne 400 Bad Request si échec
        }
        #endregion

        #region Mise à jour posseder
        [HttpPut("{idPosseder}")] // Définit une route PUT pour mettre à jour un Posseder
        public async Task<ActionResult> MiseAJourPosseder(PossederModel posseder, int idPosseder)
        {
            PossederModel possederAMettreAJour = await _repository.GetById(idPosseder);
            if (possederAMettreAJour == null) { return NotFound(); } // Retourne 404 si non trouvé
            else
            {
                bool aEteMisAJour = await _repository.Update(posseder, idPosseder);
                if (!aEteMisAJour) { return BadRequest("Erreur : Mise à jour impossible"); } // Retourne 400 si échec
                else { return Ok(); } // Retourne 200 OK si réussi
            }
        }
        #endregion

        #region Suppression posseder
        [HttpDelete("{idPosseder}")] // Définit une route DELETE pour supprimer un Posseder
        public async Task<ActionResult> SuppressionPosseder(int idPosseder)
        {
            PossederModel possederASupprimer = await _repository.GetById(idPosseder);
            if (possederASupprimer == null) { return NotFound(); } // Retourne 404 si non trouvé
            else
            {
                bool aEteSupprime = await _repository.Delete(idPosseder);
                if (!aEteSupprime) { return BadRequest("Erreur : Suppression impossible"); } // Retourne 400 si échec
                else { return Ok(); } // Retourne 200 OK si réussi
            }
        }
        #endregion
    }
}