using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Models;
using stage_marche_devient.Data;
using stage_marche_devient.Repositories;

namespace stage_marche_devient.Repositorys
{
    public class SessionRepository : IRepository<Session, int>
    {
        private readonly ApiDbContext _context;
        private readonly ILogger<SessionRepository> _logger;
        public SessionRepository(ApiDbContext context, ILogger<SessionRepository> logger)
        {

            _context = context;
            _logger = logger;
        }
            
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
            /*_context.Session.Add(model);                                                  //Le type de donnée ajoutée est issus du model Session
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données
            int id = model.IdSession;
            return await _context.Session.FindAsync(id) != null;*/                          //On verifie que l'ajout a bien été réalisé

            // Assurez-vous que la randonnée existe
            var randonnee = await _context.Randonnee.AsNoTracking().FirstOrDefaultAsync(r => r.IdRandonnee == model.RandonneeId);
            if (randonnee == null)
            {
                throw new Exception("La randonnée spécifiée n'existe pas.");
            }

            // Assurez-vous que le thème existe
            var theme = await _context.Theme.AsNoTracking().FirstOrDefaultAsync(t => t.IdTheme == model.ThemeId);
            if (theme == null)
            {
                throw new Exception("Le thème spécifié n'existe pas.");
            }

            // Attacher les entités au contexte
            _context.Randonnee.Attach(randonnee);
            _context.Theme.Attach(theme);

            // Ajout de la session
            model.Randonnee = randonnee;
            model.Theme = theme;
            _context.Session.Add(model);
            await _context.SaveChangesAsync();

            return true;

        }

        public async Task<bool> Delete(int id)                                              //Fonction de suppression d'une session à la base de données
        {
            var bddSessionSupprimer = await _context.Session.FindAsync(id);              //On recupère l'Id de la session qu'on souhaite supprimer
            if (bddSessionSupprimer == null) 
            {
                return false;
            }                             //Si la session n'existe pas on retourne une erreur
            
            _context.Session.Remove(bddSessionSupprimer);                                //Sinon on supprime l'entité de la base de donnée
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données     
            return  true;
                
                //await _context.Session.FindAsync(id) != null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Update(Session model, int id)                             //Fonction de mise-à-jour d'une randonnée dans la base de données
        {
            var dbSession = await _context.Session.FindAsync(id);                       //On récupère l'Id de la randonnée à laquelle on souhaite apporter des modifications

            if (dbSession == null)                                                       /* Si la session n'existe pas, retourne false*/
            {
                return false;
            }

            /*Les lignes suivantes : Met à jour les propriétés de la session avec les nouvelles valeurs du modèle.*/
            dbSession.Lieu = model.Lieu;                                //On change la valeur du lieu de la randonnée par celle rentrée par l'utilisateur               
            dbSession.DateDebut = model.DateDebut;                          //On change la valeur du nombre de nuit de la randonnée par celle rentrée par l'utilisateur
            dbSession.DateFin = model.DateFin;
            dbSession.Theme = model.Theme;
            dbSession.Randonnee = model.Randonnee;
            
            await _context.SaveChangesAsync();                                              //On sauvegarde les changements apportés à la base de données   
            var dbVerifAction = await _context.Session.FindAsync(id);

            return dbVerifAction != null &&


                    dbVerifAction.Lieu == model.Lieu &&                      //On verifie les changements apportés par l'utilisateur
                    dbVerifAction.DateDebut == model.DateDebut &&
                    dbVerifAction.DateFin == model.DateFin &&
                    dbVerifAction.Randonnee == model.Randonnee &&
                    dbVerifAction.Theme == model.Theme;
        }
    }
}
