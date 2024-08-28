using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositorys
{
    public class ReserverRepository : IReserverRepository<ReserverModel, int , int>
    {
        private readonly ApiDBContext _contexteDeBDD;   // intialisation d'une variable de type apiDBContext
        public ReserverRepository(ApiDBContext context) => _contexteDeBDD = context;   // ajout du contexte de program.cs a l'initialisation de ce repository

        public async Task<bool> Add(ReserverModel model)
        {
            _contexteDeBDD.Add(model);
            int colonneAffecter = await _contexteDeBDD.SaveChangesAsync();
            if (colonneAffecter > 0) 
            {
                return await _contexteDeBDD.Reserver.AnyAsync(r =>
                r.IdSession == model.IdSession &&
                r.IdUtilisateur == model.IdUtilisateur);
            }
            return false;
        }

        public async Task<bool> Delete(int idUtilisateur, int idSession)
        {
            var bddReservationSupprimer = await _contexteDeBDD.Reserver
            .Where(r =>
                r.IdSession == idSession &&
                r.IdUtilisateur == idUtilisateur)
            .FirstOrDefaultAsync();

            if (bddReservationSupprimer == null){ return false; }

            _contexteDeBDD.Remove(bddReservationSupprimer);
            await _contexteDeBDD.SaveChangesAsync();

            var reservationExisteToujoursApresSupression = await _contexteDeBDD.Reserver
            .Where(r =>
                r.IdSession == idSession &&
                r.IdUtilisateur == idUtilisateur)
            .AnyAsync();

            return !reservationExisteToujoursApresSupression;

        }

        public async Task<IEnumerable<ReserverModel>> GetAll()
        {
            IEnumerable<ReserverModel> listeReservation = await _contexteDeBDD.Reserver.ToArrayAsync();
            return listeReservation;
        }

        public async Task<ReserverModel> GetById(int idUtilisateur, int idSession)
        {
            ReserverModel reservationRecuperer = await _contexteDeBDD.Reserver.
            Where(r =>
                r.IdSession == idSession &&
                r.IdUtilisateur == idUtilisateur)
            .FirstOrDefaultAsync();
            
            return reservationRecuperer;
        }

        public async Task<bool> Update(ReserverModel model, int idUtilisateur, int idSession)
        {
            var reservationUpdateEnBdd = await _contexteDeBDD.Reserver.
            Where(r =>
                r.IdSession == idSession &&
                r.IdUtilisateur == idUtilisateur)
            .FirstOrDefaultAsync();
            reservationUpdateEnBdd.NbrActuelParticipant = model.NbrActuelParticipant;
            reservationUpdateEnBdd.RefReservation = model.RefReservation;
            reservationUpdateEnBdd.DatePaiement = model.DatePaiement;
            reservationUpdateEnBdd.ValidationReservation = model.ValidationReservation;
            reservationUpdateEnBdd.NbrParticipantsInscrits = model.NbrParticipantsInscrits;
            
            _contexteDeBDD.Reserver.Update(reservationUpdateEnBdd);

            await _contexteDeBDD.SaveChangesAsync();
            var verifModifEnBdd = await _contexteDeBDD.Reserver.
            Where(r =>
                r.IdSession == idSession &&
                r.IdUtilisateur == idUtilisateur)
            .FirstOrDefaultAsync();

            return verifModifEnBdd.NbrActuelParticipant == model.NbrActuelParticipant &&
                   verifModifEnBdd.RefReservation == model.RefReservation &&
                   verifModifEnBdd.DatePaiement == model.DatePaiement &&
                   verifModifEnBdd.ValidationReservation == model.ValidationReservation &&
                   verifModifEnBdd.NbrParticipantsInscrits == model.NbrParticipantsInscrits;


        }
    }
}
