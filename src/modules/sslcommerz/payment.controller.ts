import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { eventService } from "../events/events.service";

export class PaymentController {
  // POST /api/payments/sslcommerz
  static async createPayment(req: Request, res: Response) {
    try {
      // Call the PaymentService to initiate payment
      await PaymentService.sslcommerz(req, res);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message || "Payment initiation failed" });
    }
  }

  // GET /api/payments/success
  static async paymentSuccess(req: Request, res: Response) {
    const { tran_id, eventId, userId } = req.query as any;

    if (!tran_id || !eventId || !userId) {
      return res.status(400).send("Missing required parameters");
    }

    try {
      // Update payment status
      console.log(`Payment success: ${tran_id}`);
      // Mark user as joined/requested
      await eventService.joinEvent(Number(eventId), Number(userId));

      res.send(`<h2>Payment Successful!</h2><p>Transaction ID: ${tran_id}</p>`);
    } catch (err: any) {
      console.error(err);
      res.status(500).send("Error processing payment success");
    }
  }

  // GET /api/payments/fail
  static paymentFail(req: Request, res: Response) {
    const { tran_id } = req.query as any;

    console.log(`Payment failed: ${tran_id}`);
    res.send(`<h2>Payment Failed!</h2><p>Transaction ID: ${tran_id}</p>`);
  }

  // GET /api/payments/cancel
  static paymentCancel(req: Request, res: Response) {
    const { tran_id } = req.query as any;

    console.log(`Payment canceled: ${tran_id}`);
    res.send(`<h2>Payment Canceled!</h2><p>Transaction ID: ${tran_id}</p>`);
  }
}