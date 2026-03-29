import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';
import { reviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.USER), reviewController.createReview);
router.get("/tutor/:tutorId", auth(UserRole.USER), reviewController.getReviewsByTutor);
router.get("/:id", auth(UserRole.USER), reviewController.getReviewById);
router.patch("/:id", auth(UserRole.USER), reviewController.updateReview);
router.delete("/:id", auth(UserRole.USER), reviewController.deleteReview);

export const reviewRouter: Router = router;