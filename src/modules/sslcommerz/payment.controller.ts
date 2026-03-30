import { PaymentService } from "./payment.service";
import { Request, Response } from "express";

export class PaymentController {
  // POST /api/payment/sslcommerz
  static async createPayment(req: Request, res: Response) {
    const { eventId, amount } = req.body;

    if (!eventId || !amount) {
      return res.status(400).json({ message: "Event ID and amount are required" });
    }

    try {
      const GatewayPageURL = await PaymentService.initiatePayment(eventId, amount);
      res.json({ GatewayPageURL });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ message: err.message || "Payment initiation failed" });
    }
  }

  // GET /api/payment/success
  static paymentSuccess(req: Request, res: Response) {
    const { tran_id } = req.query;
    const payment = PaymentService.updatePaymentStatus(tran_id as string, "Success");
    if (payment) {
      res.send(`<h2>Payment Successful!</h2><p>Transaction ID: ${tran_id}</p>`);
    } else {
      res.status(404).send("Transaction not found");
    }
  }

  // GET /api/payment/fail
  static paymentFail(req: Request, res: Response) {
    const { tran_id } = req.query;
    const payment = PaymentService.updatePaymentStatus(tran_id as string, "Failed");
    if (payment) {
      res.send(`<h2>Payment Failed!</h2><p>Transaction ID: ${tran_id}</p>`);
    } else {
      res.status(404).send("Transaction not found");
    }
  }

  // GET /api/payment/cancel
  static paymentCancel(req: Request, res: Response) {
    const { tran_id } = req.query;
    const payment = PaymentService.updatePaymentStatus(tran_id as string, "Canceled");
    if (payment) {
      res.send(`<h2>Payment Canceled!</h2><p>Transaction ID: ${tran_id}</p>`);
    } else {
      res.status(404).send("Transaction not found");
    }
  }
}