using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class LoginUpdateRequest : LoginAddRequest
    {
        [Required]
        public int LoginId { get; set; }
    }
}