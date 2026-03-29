import { prisma } from "../../lib/prisma";

export const reviewService = {
  // Create a new review
  createReview: async (
    studentId: string,
    tutorId: string,
    rating: number,
    comment: string
  ) => {
    try {
      const review = await prisma.review.create({
        data: {
          studentId,
          tutorId,
          rating,
          comment,
        },
      });
      return review;
    } catch (error) {
      console.error("Create Review Service Error:", error);
      throw new Error("Failed to create review");
    }
  },

  // Get all reviews for a tutor
  getReviewsByTutor: async (tutorId: string) => {
    try {
      const reviews = await prisma.review.findMany({
        where: { tutorId },
        include: { student: { select: { id: true, name: true } } },
      });
      return reviews;
    } catch (error) {
      console.error("Get Reviews Service Error:", error);
      throw new Error("Failed to fetch reviews");
    }
  },

  // Get a single review by id
  getReviewById: async (id: string) => {
    try {
      const review = await prisma.review.findUnique({
        where: { id },
        include: { student: { select: { id: true, name: true } } },
      });
      return review;
    } catch (error) {
      console.error("Get Review By ID Service Error:", error);
      throw new Error("Failed to fetch review");
    }
  },

  // Update a review
  updateReview: async (
    reviewId: string,
    studentId: string,
    rating?: number,
    comment?: string
  ) => {
    try {
      const review = await prisma.review.updateMany({
        where: {
          id: reviewId,
          studentId, // ensure student can only update their review
        },
        data: {
          rating,
          comment,
        },
      });

      if (review.count === 0) {
        throw new Error("Review not found or permission denied");
      }

      return await prisma.review.findUnique({ where: { id: reviewId } });
    } catch (error) {
      console.error("Update Review Service Error:", error);
      throw new Error("Failed to update review");
    }
  },

  // Delete a review
  deleteReview: async (reviewId: string, studentId: string) => {
    try {
      const review = await prisma.review.deleteMany({
        where: {
          id: reviewId,
          studentId, // ensure student can only delete their review
        },
      });

      if (review.count === 0) {
        throw new Error("Review not found or permission denied");
      }

      return { id: reviewId };
    } catch (error) {
      console.error("Delete Review Service Error:", error);
      throw new Error("Failed to delete review");
    }
  },
};