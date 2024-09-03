using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Models;
using stage_marche_devient.Data;

namespace stage_marche_devient.Repositories
{
    public class ThemeRepository : IRepository<Theme, int>
    {
        private readonly ApiDbContext _context;
        private readonly ILogger<ThemeRepository> _logger;

        public ThemeRepository(ApiDbContext context, ILogger<ThemeRepository> logger) //=> 
        {
            _context = context;
            _logger = logger;

        }
  

        public async Task<IEnumerable<Theme>> GetAll()                                  //Fonction permettant le listing des themes
        {
            IEnumerable<Theme> theme = await _context.Theme.ToArrayAsync();     //On créé une liste de theme
            return theme;                                                               //On retourne la liste de theme                  
        }

        public async Task<Theme> GetById(int id)                                        //Fonction de recherche de theme en fonction de leur Id
        {
            return await _context.Theme.FindAsync(id);                                  //Recherche dans la base de donnée l'élément Randonnée auquel est associé l'Id
        }

        public async Task<bool> Add(Theme model)                                        //Fonction d'ajout d'une theme à la base de donées
        {
            _context.Theme.Add(model);                                                  //Le type de donnée ajoutée est issus du model Theme
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données
            int id = model.IdTheme;
            return await _context.Theme.FindAsync(id) != null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                // Supprimer les sessions dépendantes
                var sessionsToDelete = _context.Session.Where(s => s.ThemeId == id);
                _context.Session.RemoveRange(sessionsToDelete);
                await _context.SaveChangesAsync();  // Sauvegarder les modifications pour supprimer les sessions

                // Supprimer le thème
                var themeToDelete = await _context.Theme.FindAsync(id);
                if (themeToDelete == null)
                {
                    return false;  // Si le thème n'existe pas, retourner false
                }

                _context.Theme.Remove(themeToDelete);  // Marquer le thème pour suppression
                await _context.SaveChangesAsync();  // Sauvegarder les modifications pour supprimer le thème

                return true;  // Retourner true pour indiquer que la suppression a réussi
            }
            catch (Exception ex)
            {
                // Log l'erreur pour le diagnostic
                _logger.LogError(ex, "Erreur lors de la suppression du thème avec ID {Id}", id);
                return false;  // Retourner false en cas d'erreur
            }
        }


         /*public async Task<bool> Delete(int id)                                              //Fonction de suppression d'une theme à la base de données
         {
             var bddRandonneSupprimer = await _context.Theme.FindAsync(id);              //On recupère l'Id de la theme qu'on souhaite supprimer
             if (bddRandonneSupprimer == null)
             {
                 return false;
             }                             //Si la theme n'existe pas on retourne une erreur

             _context.Theme.Remove(bddRandonneSupprimer);                                //Sinon on supprime l'entité de la base de donnée
             await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données     
             return await _context.Theme.FindAsync(id) == null;                          //On verifie que l'ajout a bien été réalisé
         }*/

        public async Task<bool> Update(Theme model, int id)                             //Fonction de mise-à-jour d'une theme dans la base de données
        {
            var dbTheme = await _context.Theme.FindAsync(id);                       //On récupère l'Id de la theme à laquelle on souhaite apporter des modifications
            dbTheme.NomTheme = model.NomTheme;                                //On change la valeur du lieu de la theme par celle rentrée par l'utilisateur               
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données   
            var dbVerifAction = await _context.Theme.FindAsync(id);
            return dbVerifAction.NomTheme == model.NomTheme;                     //On verifie les changements apportés par l'utilisateur
        }
    }
}
