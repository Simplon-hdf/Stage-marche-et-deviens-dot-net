using Microsoft.EntityFrameworkCore;
using stage_marche_devient.Data;
using stage_marche_devient.Models;

namespace stage_marche_devient.Repositories
{
    public class PublicationRepository : IRepository<Publication, int>
    {
        private readonly ApiDbContext _context;
        private readonly ILogger<PublicationRepository> _logger;
        public PublicationRepository(ApiDbContext context, ILogger< PublicationRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Publication>> GetAll()                                    //Fonction permettant le listing des publications
        {
            IEnumerable<Publication> publication = await _context.Publication.ToArrayAsync();  //On créé une liste de publication
            return publication;                                                                //On retourne la liste de publication                  
        }

        public async Task<Publication> GetById(int id)                                         //Fonction de recherche de publication en fonction de leur Id
        {
            return await _context.Publication.FindAsync(id);                                   //Recherche dans la base de donnée l'élément publication auquel est associé l'Id
        }

        public async Task<bool> Add(Publication model)                                        //Fonction d'ajout d'une publication à la base de donées
        {
            _context.Publication.Add(model);                                                  //Le type de donnée ajoutée est issus du model Randonnee
            await _context.SaveChangesAsync();                                                //On sauvegarde les changements apportés à la base de données
            int id = model.IdPublication;
            return await _context.Publication.FindAsync(id) != null;                          //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Delete(int id)                                               //Fonction de suppression d'une publication à la base de données
        {
            var bddPublicationSupprimer = await _context.Publication.FindAsync(id);          //On recupère l'Id de la publication qu'on souhaite supprimer
            if (bddPublicationSupprimer == null) { return false; }                           //Si la publication n'existe pas on retourne une erreur
            _context.Publication.Remove(bddPublicationSupprimer);                            //Sinon on supprime l'entité de la base de donnée
            await _context.SaveChangesAsync();                                               //On sauvegarde les changements apportés à la base de données     
            return await _context.Randonnee.FindAsync(id) != null;                           //On verifie que l'ajout a bien été réalisé
        }

        public async Task<bool> Update(Publication model, int id)                            //Fonction de mise-à-jour d'une publication dans la base de données
        {
            var dbRandonnee = await _context.Publication.FindAsync(id);                      //On récupère l'Id de la publication à laquelle on souhaite apporter des modifications
            dbRandonnee.NomPublication = model.NomPublication;                               //On change la valeur du nom de la publication par celle rentrée par l'utilisateur
            dbRandonnee.LienMedia = model.LienMedia;                                         //On change la valeur du chemin d'accès à l'image de la publication par celle rentrée par l'utilisateur
            dbRandonnee.ContenuTexte = model.ContenuTexte;                                   //On change le contenu de la publictaion par celle rentrée par l'utilisateur
            dbRandonnee.IdSession = model.IdSession;                                         //On change l'Id de la session associé à la publication par celle rentrée par l'utilisateur
            await _context.SaveChangesAsync();                                               //On sauvegarde les changements apportés à la base de données   
            var dbVerifAction = await _context.Publication.FindAsync(id);
            return dbVerifAction.NomPublication == model.NomPublication &&                   //On verifie les changements apportés par l'utilisateur
                    dbVerifAction.LienMedia == model.LienMedia &&
                    dbVerifAction.ContenuTexte == model.ContenuTexte &&
                    dbVerifAction.IdSession == model.IdSession;
        }
    }
}
