using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class SharingStoryUpdateRequest : SharingStoryAddRequest
    {
        [Required]
        public int StoryId { get; set; }
    }
}