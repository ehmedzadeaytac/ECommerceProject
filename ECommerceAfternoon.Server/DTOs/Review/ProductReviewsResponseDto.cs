namespace ECommerceAfternoon.Server.DTOs.Review
{
    public class ProductReviewsResponseDto
    {
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
        public List<ProductReviewDto> Reviews { get; set; } = [];
    }
}