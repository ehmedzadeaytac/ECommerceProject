import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { addToCart } from "../services/cartService";
import { getReviews, addReview } from "../services/reviewService";

import api from "../services/api";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviewsData, setReviewsData] = useState({
    averageRating: 0,
    totalReviews: 0,
    reviews: [],
  });

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart(1, product.id, quantity);

      alert("Product added to cart!");
    } catch (error) {
      console.error(error);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await getReviews(id);

      setReviewsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitReview = async () => {
    if (!newRating) {
      alert("Please select a rating.");
      return;
    }

    try {
      setSubmitting(true);

      await addReview(id, 1, newRating, newComment);

      setNewRating(0);
      setNewComment("");

      await loadReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
    loadReviews();
  }, [id]);

  if (!product) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{
              width: "100%",
              borderRadius: 3,
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h3" fontWeight="bold">
            {product.name}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1.5 }}>
            {product.category?.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            <VisibilityIcon fontSize="small" />
            <Typography variant="body2">
              {product.viewCount?.toLocaleString()} views
            </Typography>
          </Box>

          {reviewsData.totalReviews > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <Rating value={reviewsData.averageRating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {reviewsData.averageRating} / 5 ({reviewsData.totalReviews} reviews)
              </Typography>
            </Box>
          )}

          <Typography variant="h4" fontWeight="bold" sx={{ mt: 3 }}>
            ${product.price}
          </Typography>

          <Typography sx={{ mt: 3 }}>{product.description}</Typography>

          <Typography sx={{ mt: 3 }}>Stock: {product.stock}</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>

            <Typography>{quantity}</Typography>

            <Button
              variant="outlined"
              onClick={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
            >
              +
            </Button>
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={product.stock === 0}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Reviews
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          {reviewsData.reviews.length === 0 ? (
            <Typography color="text.secondary">
              No reviews yet. Be the first to review this product!
            </Typography>
          ) : (
            reviewsData.reviews.map((review) => (
              <Box key={review.id} sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Avatar>{`U${review.userId}`.charAt(1)}</Avatar>

                <Box>
                  <Typography fontWeight="bold">
                    User #{review.userId}
                  </Typography>

                  <Rating value={review.rating} readOnly size="small" />

                  <Typography sx={{ mt: 0.5 }}>{review.comment}</Typography>

                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Write a Review
          </Typography>

          <Rating
            value={newRating}
            onChange={(_, value) => setNewRating(value)}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your thoughts about this product..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={submitting}
            onClick={handleSubmitReview}
          >
            Submit Review
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailsPage;