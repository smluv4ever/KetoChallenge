using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Domain
{
    public class SharingStoryDomain
    {
        [Required]
        public int StoryId { get; set; }

        [Required]
        public string StoryTitle { get; set; }

        [Required]
        public string Story { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}