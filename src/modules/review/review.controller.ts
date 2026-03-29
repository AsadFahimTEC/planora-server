import { Request, Response } from "express";
import { reviewService } from "./review.service";

// Create a review
 const createReview = async (req: Request, res: Response) => {
  try {
    const { tutorId, rating, comment } = req.body;
    const review = await reviewService.createReview(
      req.user!.id,
      tutorId,
      rating,
      comment
    );

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews for a tutor
 const getReviewsByTutor = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const reviews = await reviewService.getReviewsByTutor(tutorId as string);

    res.status(200).json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single review by ID
 const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id as string);

    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    res.status(200).json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a review
 const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updated = await reviewService.updateReview(
      id as string,
      req.user!.id,
      rating,
      comment
    );

    res
      .status(200)
      .json({ success: true, message: "Review updated", data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a review
 const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await reviewService.deleteReview(id as string, req.user!.id);

    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reviewController = {
  createReview,
  getReviewsByTutor,
  getReviewById,
  updateReview,
  deleteReview,
};