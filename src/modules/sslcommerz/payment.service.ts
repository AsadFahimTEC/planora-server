import { Request, Response } from "express";
import axios from "axios";

// // In-memory storage for demo
// interface Payment {
//   tran_id: string;
//   amount: number;
//   status: string;
// }

// export const payments: Payment[] = [];

export const PaymentService = {
  sslcommerz: async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;
      const { amount } = req.body;

      const total_amount = amount.toFixed(2);

      const STORE_ID = "asadt69ca141a84b32"; // Replace with your store ID
      const STORE_PASSWORD = "asadt69ca141a84b32@ssl"; // Replace with your store password
      const SSL_COMMERZ_URL =
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

      const paymentData = {
        STORE_ID,
        STORE_PASSWORD,
        total_amount,
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
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.data && response.data.GatewayPageURL) {
        return res
          .status(200)
          .json({ GatewayPageURL: response.data.GatewayPageURL });
      } else {
        return res.status(500).json({ message: "SSLCOMMERZ Gateway failed" });
      }
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message || "Payment failed" });
    }
  },
};
