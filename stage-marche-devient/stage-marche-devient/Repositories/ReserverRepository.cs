using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public class ReserverRepository : IReserverRepository<ReserverModel, int, int>
    {
        private readonly ApiDbContext _contexteDeBDD; // Contexte de la base de données pour accéder aux données

        // Constructeur : initialise le contexte de la base de données
        public ReserverRepository(ApiDbContext context) => _contexteDeBDD = context;

        #region Create (Création)
        // Méthode pour ajouter une nouvelle réservation
        public async Task<bool> Add(ReserverModel model)
        {
            // Ajoute le modèle de réservation au contexte
            _contexteDeBDD.Add(model);
            // Sauvegarde les changements dans la base de données et récupère le nombre de lignes affectées
            int colonnesAffectees = await _contexteDeBDD.SaveChangesAsync();
            // Vérifie si au moins une ligne a été affectée
            if (colonnesAffectees > 0)
            {
                // Vérifie si la réservation a été ajoutée avec succès en cherchant dans la base
                return await _contexteDeBDD.Reserver.AnyAsync(r =>
                    r.IdSession == model.IdSession &&
                    r.IdUtilisateur == model.IdUtilisateur);
            }
            return false; // Retourne false si l'ajout a échoué
        }
        #endregion

        #region Read (Lecture)
        // Méthode pour récupérer toutes les réservations
        public async Task<ReserverModel> GetByIds(int idUtilisateur, int idSession)
        {
            // Recherche et retourne la réservation correspondante
            return await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r =>
                    r.IdSession == idSession &&
                    r.IdUtilisateur == idUtilisateur);
        }
        public async Task<IEnumerable<ReserverModel>> GetAll()
        {
            // Récupère toutes les réservations et les retourne sous forme de liste
            return await _contexteDeBDD.Reserver.ToListAsync();
        }

        // Méthode pour récupérer une réservation par ID utilisateur et ID session
        public async Task<IEnumerable<ReserverModel>> GetByUtilisateurId(int idUtilisateur)
        {
            // Recherche et retourne la réservation correspondante
            var listDeRetour = await _contexteDeBDD.Reserver.Where(r => r.IdSession == idUtilisateur).ToListAsync();
            if (listDeRetour.Count() < 1) { return null; }
            else { return listDeRetour; }
        }
        public async Task<IEnumerable<ReserverModel>> GetBySessionId(int idSession)
        {
            // Recherche et retourne la réservation correspondante
            var listDeRetour = await _contexteDeBDD.Reserver.Where(r => r.IdUtilisateur == idSession).ToListAsync();
            if (listDeRetour.Count() < 1) { return null; }
            else { return listDeRetour; }
        }
        #endregion

        #region Update (Mise à jour)
        // Méthode pour mettre à jour une réservation existante
        public async Task<bool> Update(ReserverModel model, int idUtilisateur, int idSession)
        {
            // Recherche la réservation à mettre à jour
            var reservationAMettreAJour = await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r =>
                    r.IdSession == idSession &&
                    r.IdUtilisateur == idUtilisateur);

            // Si aucune réservation n'est trouvée, retourne false
            if (reservationAMettreAJour == null) return false;

            // Met à jour les propriétés de la réservation avec les nouvelles valeurs
            reservationAMettreAJour.IdUtilisateur = model.IdUtilisateur;
            reservationAMettreAJour.IdSession = model.IdSession;
            reservationAMettreAJour.NbrActuelParticipant = model.NbrActuelParticipant;
            reservationAMettreAJour.RefReservation = model.RefReservation;
            reservationAMettreAJour.DatePaiement = model.DatePaiement;
            reservationAMettreAJour.ValidationReservation = model.ValidationReservation;
            reservationAMettreAJour.NbrParticipantsInscrits = model.NbrParticipantsInscrits;

            // Sauvegarde les changements dans la base de données
            await _contexteDeBDD.SaveChangesAsync();

            // Vérifie si la mise à jour a été effectuée avec succès
            var reservationMiseAJour = await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r =>
                    r.IdSession == idSession &&
                    r.IdUtilisateur == idUtilisateur);

            // Retourne true si toutes les propriétés mises à jour correspondent aux nouvelles valeurs
            return reservationMiseAJour != null &&
                   reservationMiseAJour.IdUtilisateur == model.IdUtilisateur &&
                   reservationMiseAJour.IdSession == model.IdSession &&
                   reservationMiseAJour.NbrActuelParticipant == model.NbrActuelParticipant &&
                   reservationMiseAJour.RefReservation == model.RefReservation &&
                   reservationMiseAJour.DatePaiement == model.DatePaiement &&
                   reservationMiseAJour.ValidationReservation == model.ValidationReservation &&
                   reservationMiseAJour.NbrParticipantsInscrits == model.NbrParticipantsInscrits;
        }
        #endregion

        #region Delete (Suppression)
        // Méthode pour supprimer une réservation par ID utilisateur et ID session
        public async Task<bool> Delete(int idUtilisateur, int idSession)
        {
            // Recherche la réservation à supprimer dans la base de données
            var reservationASupprimer = await _contexteDeBDD.Reserver
                .FirstOrDefaultAsync(r =>
                    r.IdSession == idSession &&
                    r.IdUtilisateur == idUtilisateur);

            // Si aucune réservation n'est trouvée, retourne false
            if (reservationASupprimer == null) return false;

            // Supprime la réservation trouvée
            _contexteDeBDD.Remove(reservationASupprimer);
            // Sauvegarde les changements dans la base de données
            await _contexteDeBDD.SaveChangesAsync();

            // Vérifie si la réservation existe toujours après la suppression
            return !await _contexteDeBDD.Reserver.AnyAsync(r =>
                r.IdSession == idSession &&
                r.IdUtilisateur == idUtilisateur);
        }
        #endregion
    }
}
