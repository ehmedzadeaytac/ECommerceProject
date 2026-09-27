import api from "./api";

export const getReviews = async (productId) => {
  const response = await api.get(`/products/${productId}/reviews`);
  return response.data;
};

export const addReview = async (productId, userId, rating, comment) => {
  const response = await api.post(`/products/${productId}/reviews`, {
    userId,
    rating,
    comment,
  });

  return response.data;
};