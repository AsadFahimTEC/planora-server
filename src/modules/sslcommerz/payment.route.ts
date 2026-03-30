import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';
import { PaymentController } from "./payment.controller";

const router = express.Router();

// Initiate a new payment (user must be logged in)
router.post(
  "/sslcommerz",
  auth(UserRole.USER),
  PaymentController.createPayment
);

// SSLCOMMERZ callbacks
router.get("/success", auth(UserRole.USER), PaymentController.paymentSuccess);
router.get("/fail", auth(UserRole.USER), PaymentController.paymentFail);
router.get("/cancel", auth(UserRole.USER), PaymentController.paymentCancel);

export const paymentRouter: Router = router;