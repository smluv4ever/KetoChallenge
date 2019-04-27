using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class LoginAddRequest
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}