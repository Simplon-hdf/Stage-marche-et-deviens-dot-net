using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.ModelsDTO
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "L'adresse email est obligatoire.")]
        [EmailAddress(ErrorMessage = "Veuillez entrer une adresse email valide.")]
        [DataType(DataType.EmailAddress)]
        public string mailUtilisateur { get; set; }

        [Required(ErrorMessage = "Le mot de passe est obligatoire.")]
        [MinLength(12, ErrorMessage = "Le mot de passe doit comporter au moins 12 caractères.")]
        [DataType(DataType.Password)]
        public string motDePasse { get; set; }
    }
}
