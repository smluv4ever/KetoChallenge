using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class RegisterAddRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}