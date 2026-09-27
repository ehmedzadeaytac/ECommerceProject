using System.ComponentModel.DataAnnotations;

namespace ECommerceAfternoon.Server.DTOs.Review
{
    public class CreateProductReviewDto
    {
        public int UserId { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        public string Comment { get; set; } = string.Empty;
    }
}