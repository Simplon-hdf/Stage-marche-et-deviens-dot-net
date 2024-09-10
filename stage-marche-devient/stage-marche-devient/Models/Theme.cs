using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class Theme
    {
        #region Propriétés d'identification
        [Column("id_Theme"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity),Required]
        public int IdTheme { get; set; }
        #endregion

        #region Informations sur la session
        [Column("nom_theme"), MaxLength(40), Required]
        public string NomTheme { get; set; }
        #endregion
    }
}
