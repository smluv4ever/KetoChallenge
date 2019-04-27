using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Domain
{
    public class LoginDomain
    {
        [Required]
        public int LoginId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}