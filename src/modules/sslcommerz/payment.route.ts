// payment.route.ts
import express, { Router } from "express";
import { PaymentController } from "./payment.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

// POST to initiate SSLCOMMERZ payment
router.post("/sslcommerz", PaymentController.createPayment);

// Payment result callbacks
router.get("/success", auth(UserRole.USER), PaymentController.paymentSuccess);
router.get("/fail", auth(UserRole.USER), PaymentController.paymentFail);
router.get("/cancel", auth(UserRole.USER), PaymentController.paymentCancel);

export const paymentRouter: Router = router;