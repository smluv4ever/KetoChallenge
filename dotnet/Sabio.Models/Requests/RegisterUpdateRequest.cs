using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class RegisterUpdateRequest : RegisterAddRequest
    {
        [Required]
        public int RegisterId { get; set; }
    }
}