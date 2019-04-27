using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Domain
{
    public class RegisterDomain
    {
        [Required]
        public int RegisterId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}