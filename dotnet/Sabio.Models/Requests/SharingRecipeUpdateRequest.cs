using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class SharingRecipeUpdateRequest : SharingRecipeAddRequest
    {
        [Required]
        public int RecipeId { get; set; }
    }
}