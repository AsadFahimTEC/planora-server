import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      amount,
      customer_name,
      customer_email,
      customer_phone,
      event_id,
    } = body;

    // 🔐 Use ENV variables
    const SP_ENDPOINT = process.env.SHURJOPAY_ENDPOINT!;
    const SP_USERNAME = process.env.SHURJOPAY_USERNAME!;
    const SP_PASSWORD = process.env.SHURJOPAY_PASSWORD!;
    const SP_PREFIX = process.env.SHURJOPAY_PREFIX!;

    // Step 1: Get Token
    const tokenRes = await axios.post(`${SP_ENDPOINT}/get_token`, {
      username: SP_USERNAME,
      password: SP_PASSWORD,
    });

    const token = tokenRes.data.token;

    // Step 2: Create Payment
    const paymentRes = await axios.post(
      `${SP_ENDPOINT}/secret-pay`,
      {
        prefix: SP_PREFIX,
        token: token,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
        store_id: SP_USERNAME,
        amount: amount,
        order_id: `EVT-${event_id}-${Date.now()}`,
        currency: "BDT",
        customer_name,
        customer_address: "Dhaka",
        customer_phone,
        customer_city: "Dhaka",
        customer_post_code: "1207",
        customer_country: "Bangladesh",
        customer_email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({
      checkout_url: paymentRes.data.checkout_url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}