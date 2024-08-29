using System.ComponentModel.DataAnnotations;

namespace stage_marche_devient.ModelsDTO
{
    public class LoginDTO
    {
        public string mailUtilisateur { get; set; }
        [DataType(DataType.Password)]
        public string motDePasse { get; set; }
    }
}
