import { prisma } from "../../lib/prisma"

const createReview = async (
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
};
export const reviewService = {
    createReview,
}