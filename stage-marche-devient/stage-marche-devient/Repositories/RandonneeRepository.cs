using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public class RandonneeRepository : IRepository<Randonnee, int>
    {
        private readonly ApiDbContext _context;
        public RandonneeRepository(ApiDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Randonnee>> GetAll()                                  //Fonction permettant le listing des randonnées
        {
            IEnumerable<Randonnee> randonnee = await _context.Randonnee.ToArrayAsync();     //On créé une liste de randonnée
            return randonnee;                                                               //On retourne la liste de randonnée                  
        }

        public async Task<Randonnee> GetById(int id)                                        //Fonction de recherche de randonnée en fonction de leur Id
        {
            return await _context.Randonnee.FindAsync(id);                                  //Recherche dans la base de donnée l'élément Randonnée auquel est associé l'Id
        }

        public async Task<bool> Add(Randonnee model)                                        //Fonction d'ajout d'une randonnée à la base de donées
        {
            _context.Randonnee.Add(model);                                                  //Le type de donnée ajoutée est issus du model Randonnee
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données
            int id = model.IdRandonnee;                                                        
            return await _context.Randonnee.FindAsync(id) != null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Delete(int id)                                              //Fonction de suppression d'une randonnée à la base de données
        {
            var bddRandonneSupprimer = await _context.Randonnee.FindAsync(id);              //On recupère l'Id de la randonnée qu'on souhaite supprimer
            if (bddRandonneSupprimer == null) { return false; }                             //Si la randonnée n'existe pas on retourne une erreur
            _context.Randonnee.Remove(bddRandonneSupprimer);                                //Sinon on supprime l'entité de la base de donnée
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données     
            return await _context.Randonnee.FindAsync(id) == null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Update(Randonnee model, int id)                             //Fonction de mise-à-jour d'une randonnée dans la base de données
        {
            var dbRandonnee = await _context.Randonnee.FindAsync(id);                       //On récupère l'Id de la randonnée à laquelle on souhaite apporter des modifications
            dbRandonnee.NomRandonnee = model.NomRandonnee;                                  //On change la valeur du nom de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.DescriptionRandonnee = model.DescriptionRandonnee;                  //On change la valeur de la description de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.LieuRandonnee = model.LieuRandonnee;                                //On change la valeur du lieu de la randonnée par celle rentrée par l'utilisateur               
            dbRandonnee.ImageRandonnee = model.ImageRandonnee;                              //On change la valeur du chemin d'accès à l'image de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.PrixRandonnee = model.PrixRandonnee;                                //On change la valeur du prix de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.NbrNuitRandonnee = model.NbrNuitRandonnee;                          //On change la valeur du nombre de nuit de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.MinimumParticipant = model.MinimumParticipant;                      //On change la valeur du nombre minimum de participant de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.MaximumParticipant = model.MaximumParticipant;                      //On change la valeur du nombre maximum de la randonnée par celle rentrée par l'utilisateur
            dbRandonnee.EstVisible = model.EstVisible;                                      //On change la visibilité de la randonnée à laquelle on souhaite apporter des modifications
            dbRandonnee.DistanceKmRandonnee = model.DistanceKmRandonnee;                    //On change la valeur du nombre de kilomètre de la randonnée par celle rentrée par l'utilisateur
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données   
            var dbVerifAction = await _context.Randonnee.FindAsync(id);      
            return dbVerifAction.NomRandonnee == model.NomRandonnee &&                      //On verifie les changements apportés par l'utilisateur
                    dbVerifAction.DescriptionRandonnee == model.DescriptionRandonnee &&
                    dbVerifAction.LieuRandonnee == model.LieuRandonnee &&
                    dbVerifAction.ImageRandonnee == model.ImageRandonnee &&
                    dbVerifAction.PrixRandonnee == model.PrixRandonnee &&
                    dbVerifAction.NbrNuitRandonnee == model.NbrNuitRandonnee &&
                    dbVerifAction.MinimumParticipant == model.MinimumParticipant &&
                    dbVerifAction.MaximumParticipant == model.MaximumParticipant &&
                    dbVerifAction.EstVisible == model.EstVisible &&
                    dbVerifAction.DistanceKmRandonnee == model.DistanceKmRandonnee;
        }
    }
}
