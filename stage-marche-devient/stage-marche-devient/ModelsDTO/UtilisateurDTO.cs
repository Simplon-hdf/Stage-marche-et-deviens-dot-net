using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.ModelsDTO
{
    public class UtilisateurDTO
    {
        [Required(ErrorMessage = "Le nom est requis")]
        public string Nom { get; set; }

        [Required(ErrorMessage = "Le prénom est requis")]
        public string Prenom { get; set; }

        [Required(ErrorMessage = "L'adresse email est obligatoire.")]
        [EmailAddress(ErrorMessage = "Veuillez entrer une adresse email valide.")]
        [DataType(DataType.EmailAddress)]
        public string Mail { get; set; }

        [Required(ErrorMessage = "Le numéro de téléphone est requis")]
        [Phone(ErrorMessage = "Format de numéro de téléphone invalide")]
        [DataType(DataType.PhoneNumber), MaxLength(10), MinLength(9)]
        public string Telephone { get; set; }

        [Required(ErrorMessage = "Le mot de passe est obligatoire.")]
        [MinLength(12, ErrorMessage = "Le mot de passe doit comporter au moins 12 caractères.")]
        //[RegularExpression(@"^(?=.*[!@#$%^&*(),.?""{}|<>])", ErrorMessage = "Le mot de passe doit contenir au moins un caractère spécial.")]
        [DataType(DataType.Password)]
        public string Mdp { get; set; }
    }
}
