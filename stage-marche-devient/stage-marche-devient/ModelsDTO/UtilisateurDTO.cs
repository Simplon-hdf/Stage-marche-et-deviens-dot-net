using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.ModelsDTO
{
    public class UtilisateurDTO
    {
        [Required(ErrorMessage = "Le nom est requis")]
        public string Nom { get; set; }

        [Required(ErrorMessage = "Le prénom est requis")]
        public string Prenom { get; set; }

        [Required(ErrorMessage = "L'email est requis")]
        [EmailAddress(ErrorMessage = "Format d'email invalide")]
        public string Mail { get; set; }

        [Required(ErrorMessage = "Le numéro de téléphone est requis")]
        [Phone(ErrorMessage = "Format de numéro de téléphone invalide")]
        public string Telephone { get; set; }

        [Required(ErrorMessage = "Le mot de passe est requis")]
        [MinLength(12, ErrorMessage = "Le mot de passe doit contenir au moins 8 caractères")]
        public string Mdp { get; set; }
    }
}
