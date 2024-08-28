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
            PossederModel posseder = await _repository.GetById(idPublication, idTagPublication);
            if (posseder == null) { return NotFound(); } // Retourne 404 si non trouvé
            return Ok(posseder); // Retourne le Posseder trouvé avec un statut 200 OK
        }
        #endregion

        #region Création posseder
        [HttpPost] // Définit une route POST pour créer un nouveau Posseder
        public async Task<ActionResult<PossederModel>> CreationPosseder(PossederModel posseder)
        {
            bool result = await _repository.Add(posseder);
            if (result) { return CreatedAtAction("Création de la relation Posseder :", new { posseder }); } // Retourne 201 Created si réussi
            return BadRequest(); // Retourne 400 Bad Request si échec
        }
        #endregion

        #region Mise à jour posseder
        [HttpPut("{idPublication},{idTagPublication}")] // Définit une route PUT pour mettre à jour un Posseder
        public async Task<ActionResult> MiseAJourPosseder(PossederModel posseder, int idPublication, int idTagPublication)
        {
            PossederModel possederAMettreAJour = await _repository.GetById(idPublication, idTagPublication);
            if (possederAMettreAJour == null) { return NotFound(); } // Retourne 404 si non trouvé
            else
            {
                bool aEteMisAJour = await _repository.Update(posseder, idPublication, idTagPublication);
                if (!aEteMisAJour) { return BadRequest("Erreur : Mise à jour impossible"); } // Retourne 400 si échec
                else { return Ok(); } // Retourne 200 OK si réussi
            }
        }
        #endregion

        #region Suppression posseder
        [HttpDelete("{idPublication},{idTagPublication}")] // Définit une route DELETE pour supprimer un Posseder
        public async Task<ActionResult> SuppressionPosseder(int idPublication, int idTagPublication)
        {
            PossederModel possederASupprimer = await _repository.GetById(idPublication, idTagPublication);
            if (possederASupprimer == null) { return NotFound(); } // Retourne 404 si non trouvé
            else
            {
                bool aEteSupprime = await _repository.Delete(idPublication, idTagPublication);
                if (!aEteSupprime) { return BadRequest("Erreur : Suppression impossible"); } // Retourne 400 si échec
                else { return Ok(); } // Retourne 200 OK si réussi
            }
        }
        #endregion
    }
}