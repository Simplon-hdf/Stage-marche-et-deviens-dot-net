using Microsoft.AspNetCore.Mvc;
using stage_marche_devient.Data;
using stage_marche_devient.Models;
using stage_marche_devient.Repositorys;

namespace stage_marche_devient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReserverController : Controller
    {
        private readonly ApiDBContext _contexteBdd;
        private readonly ReserverRepository _repository;

        public ReserverController(ApiDBContext context)
        {
            _contexteBdd = context;
            _repository = new ReserverRepository(context);
        }
        #region Recuperation list
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReserverModel>>> RecupererReservations()
        {
            IEnumerable<ReserverModel> listeReservations = await _repository.GetAll();
            return Ok(listeReservations);
        }
        #endregion

        #region Recuperation par id
        [HttpGet("{idUtilisateur},{idSession}")]
        public async Task<ActionResult<ReserverModel>> RecupererReservation(int idUtilisateur, int idSession)
        {
            ReserverModel reservation = await _repository.GetById(idUtilisateur, idSession);
            if (reservation == null) { return NotFound(); }
            return Ok(reservation);
        }
        #endregion

        #region Creation reservation
        [HttpPost]
        public async Task<ActionResult<ReserverModel>> creationReserveation(ReserverModel reservation)
        {
            bool result = await _repository.Add(reservation);
            if (result) { return CreatedAtAction("creation de la reservation:", new { reservation }); };
            return BadRequest();
        }
        #endregion

        #region Mise a jour reservation
        [HttpPut("{idUtilisateur},{idSession}")]
        public async Task<ActionResult> miseAJourReservation(ReserverModel resevation, int idUtilisateur, int idSession)
        {
            ReserverModel reservationAMetreAJour = await _repository.GetById(idUtilisateur, idSession);
            if (reservationAMetreAJour == null) { return NotFound(); }
            else
            {
                bool aEteMiseAJour = await _repository.Update(resevation, idUtilisateur, idSession);
                if (!aEteMiseAJour) { return BadRequest("Erreur: Mise a Jour impossible"); }
                else{ return Ok(); }

            }
        }
        #endregion

        #region Suppression reservation
        [HttpDelete("{idUtilisateur},{idSession}")]
        public async Task<ActionResult> suppresionReservation(int idUtilisateur, int idSession)
        {
            ReserverModel reservationASupprimer = await _repository.GetById(idUtilisateur, idSession);
            if (reservationASupprimer == null) { return NotFound(); }
            else
            {
                bool aEteSupprimer = await _repository.Delete(idUtilisateur, idSession);
                if (!aEteSupprimer) { return BadRequest("Erreur: Suppression impossible"); }
                else{ return Ok(); }
            }
        }
        #endregion
    }
}
