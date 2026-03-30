import { Request, Response } from "express";
import axios from "axios";

export const sslcommerzPayment = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id; // ✅ correct param
    const { amount } = req.body;

    // ✅ get user from auth middleware
    const userId = (req as any).user?.id;

    // ✅ validation
    if (!eventId || !amount || !userId) {
      return res.status(400).json({
        message: "eventId, amount, userId required",
      });
    }

    // ✅ convert amount safely
    const total_amount = Number(amount).toFixed(2);

    const paymentData = {
      store_id: "asadt69ca141a84b32", // ✅ correct key
      store_passwd: "asadt69ca141a84b32@ssl", // ✅ correct key
      total_amount,
      currency: "BDT",
      tran_id: `tran_${Date.now()}`,

      success_url: `http://localhost:5000/api/payment/success?eventId=${eventId}&userId=${userId}`,
      fail_url: `http://localhost:5000/api/payment/fail`,
      cancel_url: `http://localhost:5000/api/payment/cancel`,

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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ success redirect URL
    if (response.data?.GatewayPageURL) {
      return res.status(200).json({
        GatewayPageURL: response.data.GatewayPageURL,
      });
    }

    return res.status(500).json({
      message: "Payment gateway failed",
    });
  } catch (error: any) {
    console.error("SSL Error:", error.message);
    return res.status(500).json({
      message: "Payment failed",
    });
  }
};