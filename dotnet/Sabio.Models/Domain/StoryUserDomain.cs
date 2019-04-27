using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Domain
{
    public class StoryUserDomain
    {
        [Required]
        public int StoryPostingId { get; set; }

        [Required]
        public string NickName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}