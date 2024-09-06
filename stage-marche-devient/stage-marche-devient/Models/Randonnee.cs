using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class Randonnee
    {
        [Column("Id_randonnee"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public int IdRandonnee { get; set; }
        [Column("Nom_rando"), Required]
        public string NomRandonnee { get; set; }
        [Column("description_randonnee"), MaxLength(150), Required]
        public string DescriptionRandonnee { get; set; }

        [Column("lieu_rando"), MaxLength(40), Required]
        public string LieuRandonnee { get; set; }

        [Column("Image_rando"), MaxLength(50), Required]
        public string ImageRandonnee { get; set; }

        [Column("prix_rando"), Required]
        public double PrixRandonnee { get; set; }

        [Column("nbr_nuit_rando"), Required]
        public int NbrNuitRandonnee { get; set; }

        [Column("min_participant"), Required]
        public int MinimumParticipant { get; set; }

        [Column("max_participant"), Required]
        public int MaximumParticipant { get; set; }

        [Column("visible_front"), Required]
        public Boolean EstVisible { get; set; }

        [Column("distance_kms_rando"), Required]
        public int DistanceKmRandonnee { get; set; }
    }
}
