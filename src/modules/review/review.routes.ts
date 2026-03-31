import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';
import { reviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.USER, UserRole.ADMIN), reviewController.createReview);
router.get("/tutor/:tutorId", auth(UserRole.USER, UserRole.ADMIN), reviewController.getReviewsByTutor);
router.get("/:id", auth(UserRole.USER, UserRole.ADMIN), reviewController.getReviewById);
router.patch("/:id", auth(UserRole.USER, UserRole.ADMIN), reviewController.updateReview);
router.delete("/:id", auth(UserRole.USER, UserRole.ADMIN), reviewController.deleteReview);

export const reviewRouter: Router = router;