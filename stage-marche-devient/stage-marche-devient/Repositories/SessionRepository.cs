using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Models;
using stage_marche_devient.Data;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Repositorys
{
    public class SessionRepository : IRepository<Session, int>
    {
        private readonly ApiDbContext _context;
        public SessionRepository(ApiDbContext context) => _context = context;

        public async Task<IEnumerable<Session>> GetAll()                                  //Fonction permettant le listing des randonnées
        {
            IEnumerable<Session> session = await _context.Session.ToArrayAsync();     //On créé une liste de randonnée
            return session;                                                               //On retourne la liste de randonnée                  
        }

        public async Task<Session> GetById(int id)                                        //Fonction de recherche de randonnée en fonction de leur Id
        {
            return await _context.Session.FindAsync(id);                                  //Recherche dans la base de donnée l'élément Randonnée auquel est associé l'Id
        }

        public async Task<bool> Add(Session model)                                        //Fonction d'ajout d'une randonnée à la base de donées
        {
            _context.Session.Add(model);                                                  //Le type de donnée ajoutée est issus du model Session
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données
            int id = model.IdSession;
            return await _context.Session.FindAsync(id) != null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Delete(int id)                                              //Fonction de suppression d'une randonnée à la base de données
        {
            var bddRandonneSupprimer = await _context.Session.FindAsync(id);              //On recupère l'Id de la randonnée qu'on souhaite supprimer
            if (bddRandonneSupprimer == null) { return false; }                             //Si la randonnée n'existe pas on retourne une erreur
            _context.Session.Remove(bddRandonneSupprimer);                                //Sinon on supprime l'entité de la base de donnée
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données     
            return await _context.Session.FindAsync(id) != null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Update(Session model, int id)                             //Fonction de mise-à-jour d'une randonnée dans la base de données
        {
            var dbSession = await _context.Session.FindAsync(id);                       //On récupère l'Id de la randonnée à laquelle on souhaite apporter des modifications
            dbSession.Lieu = model.Lieu;                                //On change la valeur du lieu de la randonnée par celle rentrée par l'utilisateur               
            dbSession.DateDebut = model.DateDebut;                          //On change la valeur du nombre de nuit de la randonnée par celle rentrée par l'utilisateur
            dbSession.DateFin = model.DateFin;
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données   
            var dbVerifAction = await _context.Session.FindAsync(id);
            return dbVerifAction.Lieu == model.Lieu &&                      //On verifie les changements apportés par l'utilisateur
                    dbVerifAction.DateDebut == model.DateDebut &&
                    dbVerifAction.DateFin == model.DateFin;
        }
    }
}
