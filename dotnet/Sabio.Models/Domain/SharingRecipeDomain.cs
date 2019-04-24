using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Domain
{
    public class SharingRecipeDomain
    {
        [Required]
        public int RecipeId { get; set; }

        [Required]
        public string RecipeTitle { get; set; }

        [Required]
        public string Ingredients { get; set; }

        [Required]
        public string Recipe { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}