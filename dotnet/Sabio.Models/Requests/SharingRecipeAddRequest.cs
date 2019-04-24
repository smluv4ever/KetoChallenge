using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class SharingRecipeAddRequest
    {
        [Required]
        public string RecipeTitle { get; set; }

        [Required]
        public string Ingredients { get; set; }

        [Required]
        public string Recipe { get; set; }

        public string ModifiedBy { get; set; }
    }
}