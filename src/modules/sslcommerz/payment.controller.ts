import { Request, Response } from "express";
import { sslcommerzPayment } from "./payment.service";
import { eventService } from "../events/events.service";

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      await sslcommerzPayment.createPayment(req, res);
    } catch (err: any) {
      res.status(500).json({
        message: err.message || "Payment initiation failed",
      });
    }
  }

  // ✅ FIXED SUCCESS
  static async paymentSuccess(req: Request, res: Response) {
    try {
      const { tran_id, eventId, userId } = req.query as any;

      // ✅ validation
      if (!tran_id || !eventId || !userId) {
        return res.status(400).send("Missing parameters");
      }

      console.log("Payment success:", tran_id);

      // ✅ NO Number()
      await eventService.joinEvent(eventId, userId);

      // ✅ redirect to frontend
      return res.redirect(
        `http://localhost:3000/dashboard?payment=success`
      );
    } catch (err: any) {
      console.error(err);
      return res.redirect(
        `http://localhost:3000/dashboard?payment=error`
      );
    }
  }

  static paymentFail(req: Request, res: Response) {
    const { tran_id } = req.query as any;

    console.log("Payment failed:", tran_id);

    return res.redirect(
      `http://localhost:3000/dashboard?payment=failed`
    );
  }

  static paymentCancel(req: Request, res: Response) {
    const { tran_id } = req.query as any;

    console.log("Payment cancelled:", tran_id);

    return res.redirect(
      `http://localhost:3000/dashboard?payment=cancelled`
    );
  }
}