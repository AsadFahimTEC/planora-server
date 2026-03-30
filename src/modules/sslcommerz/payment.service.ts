// payment.controller.ts

import { Request, Response } from "express";
import axios from "axios";

export const sslcommerzPayment = {
  createPayment: async (req: Request, res: Response) => {
    try {
      const { eventId, amount } = req.body;
      const userId = (req as any).user?.id;

      // ✅ validation
      if (!eventId || !amount || !userId) {
        return res.status(400).json({
          message: "eventId, amount, userId required",
        });
      }

      const paymentData = {
        store_id: "asadt69ca141a84b32",
        store_passwd: "asadt69ca141a84b32@ssl",
        total_amount: Number(amount).toFixed(2),
        currency: "BDT",
        tran_id: `tran_${Date.now()}`,

        success_url: `http://localhost:3000/payment/success?eventId=${eventId}&userId=${userId}`,
        fail_url: `http://localhost:3000/payment/fail`,
        cancel_url: `http://localhost:3000/payment/cancel`,

        cus_name: "Test User",
        cus_email: "test@example.com",
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",

        shipping_method: "NO",
        product_name: `Event-${eventId}`,
        product_category: "Event",
        product_profile: "general",
      };

      const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data?.GatewayPageURL) {
        return res.status(200).json({
          GatewayPageURL: response.data.GatewayPageURL,
        });
      }

      return res.status(500).json({
        message: "Payment gateway failed",
      });
    } catch (err: any) {
      return res.status(500).json({
        message: err.message || "Payment failed",
      });
    }
  },
};