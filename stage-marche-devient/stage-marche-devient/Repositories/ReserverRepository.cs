using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    // Classe repository pour gérer les opérations CRUD sur l'entité ReserverModel
    public class ReserverRepository : IReserverRepository<ReserverModel, int, int>
    {
        private readonly ApiDbContext _contexteDeBDD; // Contexte de la base de données

        // Constructeur injectant le contexte de la base de données
        public ReserverRepository(ApiDbContext context) => _contexteDeBDD = context;

        #region Create
        // Méthode pour ajouter une nouvelle réservation
        public async Task<bool> Add(ReserverModel model)
        {
            _contexteDeBDD.Add(model); // Ajoute le modèle au contexte
            int colonnesAffectees = await _contexteDeBDD.SaveChangesAsync(); // Sauvegarde les changements
            if (colonnesAffectees > 0)
            {
                // Vérifie si la réservation a été ajoutée avec succès
                return await _contexteDeBDD.Reserver.AnyAsync(r =>
                    r.IdUtilisateur == model.IdUtilisateur &&
                    r.IdSession == model.IdSession);
            }
            return false; // Retourne false si l'ajout a échoué
        }
        #endregion

        #region Read
        // Méthode pour récupérer toutes les réservations
        public async Task<IEnumerable<ReserverModel>> GetAll()
        {
            return await _contexteDeBDD.Reserver.ToListAsync();
        }

        // Méthode pour récupérer les réservations par ID d'utilisateur
        public async Task<IEnumerable<ReserverModel>> GetByUtilisateurId(int idUtilisateur)
        {
            var listDeRetour = await _contexteDeBDD.Reserver.Where(r => r.IdUtilisateur == idUtilisateur).ToListAsync();
            return listDeRetour.Any() ? listDeRetour : null;
        }

        // Méthode pour récupérer les réservations par ID de session
        public async Task<IEnumerable<ReserverModel>> GetBySessionId(int idSession)
        {
            var listDeRetour = await _contexteDeBDD.Reserver.Where(r => r.IdSession == idSession).ToListAsync();
            return listDeRetour.Any() ? listDeRetour : null;
        }

        // Méthode pour récupérer une réservation par ses IDs d'utilisateur et de session
        public async Task<ReserverModel> GetByIds(int idUtilisateur, int idSession)
        {
            return await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r =>
                    r.IdUtilisateur == idUtilisateur &&
                    r.IdSession == idSession);
        }
        #endregion

        #region Update
        // Méthode pour mettre à jour une réservation existante
        public async Task<bool> Update(ReserverModel model, int idUtilisateur, int idSession)
        {
            var reservationAMettreAJour = await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r => r.IdUtilisateur == idUtilisateur && r.IdSession == idSession);
            if (reservationAMettreAJour == null) return false;

            reservationAMettreAJour.NbrActuelParticipant = model.NbrActuelParticipant;
            reservationAMettreAJour.RefReservation = model.RefReservation;
            reservationAMettreAJour.DatePaiement = model.DatePaiement;
            reservationAMettreAJour.ValidationReservation = model.ValidationReservation;
            reservationAMettreAJour.NbrParticipantsInscrits = model.NbrParticipantsInscrits;

            await _contexteDeBDD.SaveChangesAsync();

            var reservationMiseAJour = await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r =>
                    r.IdUtilisateur == idUtilisateur &&
                    r.IdSession == idSession);

            return reservationMiseAJour != null;
        }
        #endregion

        #region Delete
        // Méthode pour supprimer une réservation
        public async Task<bool> Delete(int idUtilisateur, int idSession)
        {
            var reservationASupprimer = await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r => r.IdUtilisateur == idUtilisateur && r.IdSession == idSession);
            if (reservationASupprimer == null) return false;

            _contexteDeBDD.Remove(reservationASupprimer);
            await _contexteDeBDD.SaveChangesAsync();

            return await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r => r.IdUtilisateur == idUtilisateur && r.IdSession == idSession) == null;
        }
        #endregion
    }
}