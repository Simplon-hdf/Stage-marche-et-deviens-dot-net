using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    // Classe repository pour gérer les opérations CRUD sur l'entité PossederModel
    public class PossederRepository : IPossederRepository<PossederModel, int, int>
    {
        private readonly ApiDbContext _contexteDeBDD; // Contexte de la base de données

        // Constructeur injectant le contexte de la base de données
        public PossederRepository(ApiDbContext context) => _contexteDeBDD = context;

        #region Create
        // Méthode pour ajouter une nouvelle relation Posseder
        public async Task<bool> Add(PossederModel model)
        {
            _contexteDeBDD.Add(model); // Ajoute le modèle au contexte
            int colonnesAffectees = await _contexteDeBDD.SaveChangesAsync(); // Sauvegarde les changements et récupère le nombre de lignes affectées
            if (colonnesAffectees > 0)
            {
                // Vérifie si la relation a été ajoutée avec succès
                return await _contexteDeBDD.Posseder.AnyAsync(p =>
                    p.idPublication == model.idPublication &&
                    p.idTagPublication == model.idTagPublication);
            }
            return false; // Retourne false si l'ajout a échoué
        }
        #endregion

        #region Read
        // Méthode pour récupérer toutes les relations Posseder
        public async Task<IEnumerable<PossederModel>> GetAll()
        {
            return await _contexteDeBDD.Posseder.ToListAsync();
        }

        // Méthodes pour récupérer une relation Posseder spécifique par ses IDs
        public async Task<IEnumerable<PossederModel>> GetByPublicationId(int idPublication)
        {
            return await _contexteDeBDD.Posseder.Where(p => p.idPublication == idPublication).ToListAsync();
        }
        public async Task<IEnumerable<PossederModel>> GetByTagId(int idTagPublication)
        {
            return await _contexteDeBDD.Posseder.Where(p => p.idTagPublication == idTagPublication).ToListAsync();
        }
        #endregion

        #region Update
        // Méthode pour mettre à jour une relation Posseder existante
        public async Task<bool> Update(PossederModel model, int idPublication, int idTagPublication)
        {
            // Recherche la relation à mettre à jour
            var possederAMettreAJour = await _contexteDeBDD.Posseder
                .FirstOrDefaultAsync(p =>
                    p.idPublication == idPublication &&
                    p.idTagPublication == idTagPublication);

            if (possederAMettreAJour == null) return false; // Retourne false si la relation n'existe pas

            // Met à jour les propriétés
            possederAMettreAJour.idPublication = model.idPublication;
            possederAMettreAJour.idTagPublication = model.idTagPublication;

            await _contexteDeBDD.SaveChangesAsync(); // Sauvegarde les changements

            // Vérifie si la mise à jour a été effectuée avec succès
            var possederMisAJour = await _contexteDeBDD.Posseder
                .FirstOrDefaultAsync(p =>
                    p.idPublication == model.idPublication &&
                    p.idTagPublication == model.idTagPublication);

            return possederMisAJour != null; // Retourne true si la relation mise à jour existe
        }
        #endregion

        #region Delete
        // Méthode pour supprimer une relation Posseder
        public async Task<bool> Delete(int idPublication, int idTagPublication)
        {
            // Recherche la relation à supprimer
            var possederASupprimer = await _contexteDeBDD.Posseder
                .FirstOrDefaultAsync(p =>
                    p.idPublication == idPublication &&
                    p.idTagPublication == idTagPublication);

            if (possederASupprimer == null) return false; // Retourne false si la relation n'existe pas

            _contexteDeBDD.Remove(possederASupprimer); // Supprime la relation
            await _contexteDeBDD.SaveChangesAsync(); // Sauvegarde les changements

            // Vérifie si la suppression a été effectuée avec succès
            return !await _contexteDeBDD.Posseder.AnyAsync(p =>
                p.idPublication == idPublication &&
                p.idTagPublication == idTagPublication);
        }
        #endregion
    }
}