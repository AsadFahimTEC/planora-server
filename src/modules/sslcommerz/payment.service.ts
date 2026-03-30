import axios from "axios";

const STORE_ID = "asadt69ca141a84b32"; // Replace with your store ID
const STORE_PASSWORD = "asadt69ca141a84b32@ssl"; // Replace with your store password
const SSL_COMMERZ_URL = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

// In-memory storage for demo
interface Payment {
  tran_id: string;
  amount: number;
  status: string;
}

export const payments: Payment[] = [];

export class PaymentService {
  static async initiatePayment(eventId: number, amount: number) {
    const tran_id = `tran_${Date.now()}`;

    const post_data = {
      store_id: STORE_ID,
      store_passwd: STORE_PASSWORD,
      total_amount: amount,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `http://localhost:3000/api/payment/success?tran_id=${tran_id}`,
      fail_url: `http://localhost:3000/api/payment/fail?tran_id=${tran_id}`,
      cancel_url: `http://localhost:3000/api/payment/cancel?tran_id=${tran_id}`,
      version: "4.0",
      product_category: "Event",
      product_name: `Event #${eventId}`,
      cus_name: "Customer",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: "017xxxxxxxx",
    };

    const response = await axios.post(SSL_COMMERZ_URL, post_data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data && response.data.GatewayPageURL) {
      payments.push({
        tran_id,
        eventId,
        amount,
        status: "Pending",
      });
      return response.data.GatewayPageURL;
    } else {
      throw new Error("SSLCOMMERZ initiation failed");
    }
  }

  static updatePaymentStatus(tran_id: string, status: string) {
    const payment = payments.find((p) => p.tran_id === tran_id);
    if (payment) {
      payment.status = status;
      return payment;
    }
    return null;
  }
}