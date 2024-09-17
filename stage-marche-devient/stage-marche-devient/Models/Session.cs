using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class Session
    {
        #region Propriétés d'identification
        [Column("id_session"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity),Required]
        public int IdSession { get; set; }
        #endregion

        #region Informations sur la session
        [Column("lieu_depart"), MaxLength(40),Required]
        public string Lieu { get; set; }

        [Column("date_debut_session"), Required]
        public string DateDebut { get; set; }

        [Column("date_fin_session")]
        public string DateFin { get; set; }

        [Column("id_randonnee"), ForeignKey("randonnee")]
        public int RandonneeId { get; set; }

        [Column("id_theme"), ForeignKey("theme")]
        public int ThemeId { get; set; }
        #endregion
    }
}
