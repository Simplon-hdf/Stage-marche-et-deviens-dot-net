using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.Models
{
    public class Randonnee
    {
        [Column("id_randonee"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity), Required]
        public int IdRandonnee { get; set; }
        [Column("Nom_randonnee"), MaxLength(150), Required]
        public int NomRandonnee { get; set; }
        [Column("description_randonnee"), MaxLength(150), Required]
        public string DescriptionRandonnee { get; set; }

        [Column("lieu_randonnee"), MaxLength(40), Required]
        public string LieuRandonnee { get; set; }

        [Column("image_randonnee"), MaxLength(50), Required]
        public string ImageRandonnee { get; set; }

        [Column("prix_randonnee"), MaxLength(6), Required]
        public int PrixRandonnee { get; set; }

        [Column("nbr_nuit_randonnee"), MaxLength(1), Required]
        public int NbrNuitRandonnee { get; set; }

        [Column("min_participant"), MaxLength(2), Required]
        public int MinimumParticipant { get; set; }

        [Column("max_participant"), MaxLength(2), Required]
        public int MaximumParticipant { get; set; }

        [Column("visible_front"), Required]
        public Boolean EstVisible { get; set; }

        [Column("distance_kms_rando"), MaxLength(2), Required]
        public int DistanceKmRandonnee { get; set; }
    }
}
