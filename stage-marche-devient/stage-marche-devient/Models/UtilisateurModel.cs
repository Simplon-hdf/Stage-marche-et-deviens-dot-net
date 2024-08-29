using System; 
using System.Collections.Generic;        /* contient des classes génériques pour manipuler les collections*/
using System.ComponentModel.DataAnnotations.Schema; /* contient des attributs qui permettent de définir des métadonnéees pour le mapping*/
using System.ComponentModel.DataAnnotations; /*contient les attributs pour valider les données comme required ou maxlenght*/
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace stage_marche_devient.Models; /*Je  déclare l'espace de noms et la classe*/

public class UtilisateurModel                                           /* Je déclare la classe utilisateur */

{ /* je déclare les propriétés  qui sont des colonnes de la table Utilisateur dans bdd*/

    [Column("id_utilisateur"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required] /* key indique que la propriété "column"
                                                                                                    * est la clé primaire
                                                                                                    Databasegenerated=la valeur de la colonne
                                                                                                    est générée automatiquement par la bdd
                                                                                                    Required= propriété obligatoire qui ne peut etre nulle
                                                                                                    */
    public int IdUtilisateur { get; set; } /*je déclare la propriété idutilisateur de type int*/

    [Column("date_creation_utilisateur"), Required] /*propriété obligatoire et ce qui est entre gillemet c'est le nom de la colonne dans bdd*/
    public string DateCreationUtilisateur { get; set; }

    [Column("prenom_utilisateur"), MaxLength(50), Required] /*Limite de chaine de caractere à 50*/
    public string PrenomUtilisateur { get; set; } = null!; /*j'initialise à null pour éviter un avertissement de nullabilité indiquant que 
                                                            * cette propriété ne sera jamais null en pratique*/
    
    [Column("nom_utilisateur"), MaxLength(50), Required]
    public string NomUtilisateur { get; set; } = null!;

    [Column("telephone_utilisateur"), MaxLength(50), Required]
    public string TelUtilisateur { get; set; } = null!;

    [Column("mdp_utilisateur"), MaxLength(35), Required, DataType(DataType.Password)] /*datatype spécifie que cette propriété est un password*/
    public string MdpUtilisateur { get; set; } = null!;
     
    [Column("mail_utilisateur"), MaxLength(50), Required]
    public string MailUtilisateur { get; set; } = null!;

    [Column("total_distance_parcourue_utilisateur"), Required]
    public int? TotalDistanceParcourueUtilisateur { get; set; } /*int? veut dire que cette propriété peut etre null, obligatoire mais peut etre nullable*/
}

