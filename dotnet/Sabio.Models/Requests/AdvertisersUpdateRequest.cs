using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class AdvertisersUpdateRequest : AdvertisersAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}