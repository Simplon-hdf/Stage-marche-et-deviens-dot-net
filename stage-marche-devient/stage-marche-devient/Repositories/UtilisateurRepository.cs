using MarcheEtDevient.Server.Models;    /*Importation du namespace contenant le modèle Utilisateur défini précédemment.*/
using Microsoft.EntityFrameworkCore;    /*Importation des classes nécessaires pour utiliser efc*/
using MarcheEtDevient.Server.Data;      /*Importation du namespace où se trouve ma classe ApiDBContext, qui est la configuration de base de données. */

namespace MarcheEtDevient.Server.Repository     /*je declare mon namespace et ma classe*/
{
    public class UtilisateurRepository : IRepository<Utilisateur, int> /*je declare la classe UtilisateurRepository qui implémente l'interface IRepository<Utilisateur, int>.*/
    {                                                                   /* cette classe doit fournir des implémentations pour ttes les methodes
                                                                         * définies dans Irepo pour le type Utilisateur et identifiants de type int*/
        
        private readonly ApiDBContext _contexteDeBDD;   /*je definis un champs privé enlecture seule pour stocker 
                                                         * l'instance ApiDBcontext ma classe de context de bdd 
                                                         * qui me permet d'accéder à la bdd*/
        
        public UtilisateurRepository(ApiDBContext context) => _contexteDeBDD = context;     /*constructeur de la classe UtilisateurRepository
                                                                                             * Il prend une instance de ApiDBContext en parametre*/
                                                                                            /*la formule = permet d'assigner l'instance de context bdd
                                                                                             * au champ privé 'contexteDeBdd' pour permettre à la
                                                                                             * classe de travailler avec la BDD*/
       
        
        public async Task<bool> Add(Utilisateur model) /*Je declare ma méthode Add qui est publique et async pour ajout utilisateur
                                                        * elle retourne true si ajout reussi sinon false*/
        {
            _contexteDeBDD.Utilisateur.Add(model);      /*ajoute le model 'Utilisateur' à l'ensemble 'Utilisateur' du contexte de bdd*/                         
            await _contexteDeBDD.SaveChangesAsync();      /*  Sauvegarde les modifs dans la bdd asynchrone'*/                   
            int id = model.IdUtilisateur;                  /*recupere l'IDUtilisateur après qu'il a été ajouté*/                  
            return await _contexteDeBDD.Utilisateur.FindAsync(id) != null;    /*Verifie si l'utilisateur a été correctement ajouté en cherchant par
                                                                               * son ID. retourne true si trouvé sinon false*/
        }

        
        public async Task<bool> Delete(int id) /*je declare la methode Delete publique asynchrone qui supprime 
                                                * un utilisateur de la bdd par son ID, booleen idem true or false*/
        {
            var bddUtilisateurSupprimer = await _contexteDeBDD.Utilisateur.FindAsync(id);  /*recherche l'utilisateur par son Id*/  
            if (bddUtilisateurSupprimer == null) { return false; }                          /*Si utilisateur n'existe pas, retourne false*/                     
            _contexteDeBDD.Utilisateur.Remove(bddUtilisateurSupprimer);     /*supprime l'utilisateur de l'ensemble 'utilisateur' du contexte*/            
            await _contexteDeBDD.SaveChangesAsync();                        /*sauvegarde les modifs dans la BDD de manière asynchrone*/                                  
            return await _contexteDeBDD.Utilisateur.FindAsync(id) != null;   /*Verifie si l'utilisateur a été correctement supprimé 
                                                                              * en le recherchant par son ID. 
                                                                              * Retourne false si l'utilisateur a été supprimé 
                                                                              * (puisqu'il ne devrait plus exister). */             
        }

        
        public async Task<IEnumerable<Utilisateur>> GetAll()    /* Je déclare une méthode publique asynchrone qui retourne 
                                                                 * une liste de tous les utilisateurs.*/
        {
            IEnumerable<Utilisateur> utilisateurs = await _contexteDeBDD.Utilisateur.ToArrayAsync();   /*Récupère tous les utilisateurs de la base de données 
                                                                                                        * sous forme de tableau asynchrone.*/
            return utilisateurs;             /*     Retourne la liste des utilisateurs*/                                                     
        }

        
        
        public async Task<Utilisateur> GetById(int id) /*je déclare une méthode publique asynchrone 
                                                        * qui retourne un utilisateur spécifique par son ID*/
        {
            return await _contexteDeBDD.Utilisateur.FindAsync(id);     /* Recherche et retourne l'utilisateur correspondant à l'ID fourni.*/
        }

        
        public async Task<bool> Update(Utilisateur model, int id) /*je déclare une méthode publique asynchrone 
                                                                   * qui met à jour un utilisateur existant en fonction de son ID. 
                                                                   * Retourne true si la mise à jour est réussie, sinon false.*/
        {
            var dbUtilisateur = await _contexteDeBDD.Utilisateur.FindAsync(id);   /*Recherche l'utilisateur par son ID.*/
            if (dbUtilisateur == null) /* Si l'utilisateur n'existe pas, retourne false*/
            {
                return false;
            }
            /*Les lignes suivantes : Met à jour les propriétés de l'utilisateur avec les nouvelles valeurs du modèle model.*/
            dbUtilisateur.DateCreationUtilisateur = model.DateCreationUtilisateur;      /*Met à jour la date de création de l'utilisateur.*/
            dbUtilisateur.PrenomUtilisateur = model.PrenomUtilisateur;    /*idem et pour les lignes suivantes*/             
            dbUtilisateur.NomUtilisateur = model.NomUtilisateur;                                          
            dbUtilisateur.TelUtilisateur = model.TelUtilisateur;                        
            dbUtilisateur.MdpUtilisateur = model.MdpUtilisateur;                            
            dbUtilisateur.MailUtilisateur = model.MailUtilisateur;
            
            await _contexteDeBDD.SaveChangesAsync();                 /*Sauvegarde les modifications dans la base de données de manière asynchrone*/                  
            var dbVerifAction = await _contexteDeBDD.Utilisateur.FindAsync(id);    /*Recherche l'utilisateur après la maj 
                                                                                    * pour vérifier que les modifications ont été appliquées*/
            
            return dbVerifAction != null &&                                     /* Retourne true si l'utilisateur 
                                                                                 * mis à jour existe et 
                                                                                 * que toutes les propriétés correspondent 
                                                                                 * aux valeurs attendues, sinon false*/
                
                   dbVerifAction.DateCreationUtilisateur == model.DateCreationUtilisateur &&
                   dbVerifAction.PrenomUtilisateur == model.PrenomUtilisateur &&
                   dbVerifAction.NomUtilisateur == model.NomUtilisateur &&
                   dbVerifAction.TelUtilisateur == model.TelUtilisateur &&
                   dbVerifAction.MdpUtilisateur == model.MdpUtilisateur &&
                   dbVerifAction.MailUtilisateur == model.MailUtilisateur;       /*verification de la modification*/
          
        }
    }
}
