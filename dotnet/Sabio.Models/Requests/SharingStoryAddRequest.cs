using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class SharingStoryAddRequest
    {
        [Required]
        public string StoryTitle { get; set; }

        [Required]
        public string Story { get; set; }

        public string ModifiedBy { get; set; }
    }
}