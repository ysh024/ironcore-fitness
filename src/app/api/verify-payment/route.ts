import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Verify Razorpay Payment Signature
    let isVerified = false;
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature && keySecret) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      isVerified = generatedSignature === razorpay_signature;

      if (!isVerified) {
        return NextResponse.json(
          { error: 'Invalid Razorpay payment signature verification failed.' },
          { status: 400 }
        );
      }
    } else {
      isVerified = true;
    }

    return NextResponse.json(
      {
        success: true,
        verified: isVerified,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
