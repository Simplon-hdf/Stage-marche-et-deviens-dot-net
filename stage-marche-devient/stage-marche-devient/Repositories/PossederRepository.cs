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
            int colonnesAffectees = await _contexteDeBDD.SaveChangesAsync(); // Sauvegarde les changements
            if (colonnesAffectees > 0)
            {
                // Vérifie si la relation a été ajoutée avec succès
                return await _contexteDeBDD.Posseder.AnyAsync(p =>
                    p.IdPublication == model.IdPublication &&
                    p.IdTagPublication == model.IdTagPublication);
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

        // Méthode pour récupérer une relation Posseder par son ID
        public async Task<PossederModel> GetById(int possederId)
        {
            return await _contexteDeBDD.Posseder.FindAsync(possederId);
        }

        // Méthode pour récupérer une relation Posseder par ses IDs de publication et de tag
        public async Task<PossederModel> GetByIds(int idPublication, int idTagPublication)
        {
            return await _contexteDeBDD.Posseder
                .FirstOrDefaultAsync(p =>
                    p.IdPublication == idPublication &&
                    p.IdTagPublication == idTagPublication);
        }

        // Méthode pour récupérer les relations Posseder par ID de publication
        public async Task<IEnumerable<PossederModel>> GetByPublicationId(int idPublication)
        {
            var listDeRetour = await _contexteDeBDD.Posseder.Where(p => p.IdPublication == idPublication).ToListAsync();
            return listDeRetour.Any() ? listDeRetour : null;
        }

        // Méthode pour récupérer les relations Posseder par ID de tag
        public async Task<IEnumerable<PossederModel>> GetByTagId(int idTagPublication)
        {
            var listDeRetour = await _contexteDeBDD.Posseder.Where(p => p.IdTagPublication == idTagPublication).ToListAsync();
            return listDeRetour.Any() ? listDeRetour : null;
        }
        #endregion

        #region Update
        // Méthode pour mettre à jour une relation Posseder existante
        public async Task<bool> Update(PossederModel model, int idPosseder)
        {
            var possederAMettreAJour = await _contexteDeBDD.Posseder.FindAsync(idPosseder);
            if (possederAMettreAJour == null) return false;

            possederAMettreAJour.IdPublication = model.IdPublication;
            possederAMettreAJour.IdTagPublication = model.IdTagPublication;

            await _contexteDeBDD.SaveChangesAsync();

            var possederMisAJour = await _contexteDeBDD.Posseder
                .FirstOrDefaultAsync(p =>
                    p.IdPublication == model.IdPublication &&
                    p.IdTagPublication == model.IdTagPublication);

            return possederMisAJour != null;
        }
        #endregion

        #region Delete
        // Méthode pour supprimer une relation Posseder
        public async Task<bool> Delete(int idPosseder)
        {
            var possederASupprimer = await _contexteDeBDD.Posseder.FindAsync(idPosseder);
            if (possederASupprimer == null) return false;

            _contexteDeBDD.Remove(possederASupprimer);
            await _contexteDeBDD.SaveChangesAsync();

            return await _contexteDeBDD.Posseder.FindAsync(idPosseder) == null;
        }
        #endregion
    }
}