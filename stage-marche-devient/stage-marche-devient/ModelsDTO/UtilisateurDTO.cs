using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.ModelsDTO
{
    public class UtilisateurDTO
    {
        [Required, MaxLength(50)]
        public string Mail { get; set; }

        [Required, MaxLength(50)]
        public string? Prenom { get; set; }

        [Required, MaxLength(50)]
        public string? Nom { get; set; }

        [Required, DataType(DataType.Password), MaxLength(35)]
        public string Mdp { get; set; }

        [Required, MinLength(9), MaxLength(10)]
        public string Telephone { get; set; }
    }
}
