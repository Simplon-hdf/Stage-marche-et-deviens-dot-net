using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace stage_marche_devient.Models
{
    // Classe représentant le modèle Posseder
    public class PossederModel
    {
                                                                // Propriété représentant l'ID unique de Posseder
        [Column("Id_posseder")]                                 // Nom de la colonne dans la base de données
        [Required]                                              // Champ obligatoire
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   // Généré automatiquement par la base de données
        [Key]                                                   // Clé primaire
        [JsonIgnore]                                            // Ignore cette propriété lors de la sérialisation JSON
        public int IdPosseder { get; set; }

        // Propriété représentant l'ID de la publication associée
        [Column("Id_publication")]      // Nom de la colonne dans la base de données
        [Required]                      // Champ obligatoire
        [ForeignKey("publication")]     // Clé étrangère faisant référence à la table "publication"
        public int IdPublication { get; set; }

        // Propriété représentant l'ID du tag de publication associé
        [Column("Id_tag_publication")]      // Nom de la colonne dans la base de données
        [Required]                          // Champ obligatoire
        [ForeignKey("tag_publication")]     // Clé étrangère faisant référence à la table "tag_publication"
        public int IdTagPublication { get; set; }
    }
}