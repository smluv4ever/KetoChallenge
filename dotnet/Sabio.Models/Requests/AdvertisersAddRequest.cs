using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class AdvertisersAddRequest
    {
        [Required]
        public string shortTitle { get; set; }

        [Required]
        public string title { get; set; }

        [Required]
        public string shortDescription { get; set; }

        [Required]
        public string content { get; set; }

        [Required]
        public string slug { get; set; }

        [Required]
        public int entityTypeId { get; set; }

        [Required]
        public int statusId { get; set; }

        public string modifiedBy { get; set; }
    }
}