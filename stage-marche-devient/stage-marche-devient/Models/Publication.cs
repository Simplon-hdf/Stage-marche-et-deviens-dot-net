﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class Publication
    {
        [Column("id_publication"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public int IdPublication { get; set; }

        [Column("nom_publication"), MaxLength(50), Required]
        public string NomPublication { get; set; }

        [Column("date_publication"), MaxLength(10), Required]
        public string DatePublication { get; set; }

        [Column("lien_media"), MaxLength(40)]
        public string LienMedia { get; set; }

        [Column("contenu_texte"), MaxLength(50)]
        public string ContenuTexte { get; set; }

        [Column("id_session"), MaxLength(3), Required]
        public int IdSession { get; set; }
    }
}