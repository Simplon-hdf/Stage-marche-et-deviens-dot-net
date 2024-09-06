using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class TagPublicationModel
    {
        [Column("Id_tag_publication"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public int IdTagPublication { get; set; }

        [Column("Nom_tag_publication"), MaxLength(40), Required]
        public string Nom { get; set; }

        [Column("Couleur_tag_publication"), MaxLength(50), Required]
        public string Couleur { get; set; }

    }
}
