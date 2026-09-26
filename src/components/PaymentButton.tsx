'use client';

import React, { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentButtonProps {
  amount?: number; // Amount in INR (e.g. 1499)
  planName?: string;
  buttonText?: string;
  className?: string;
  userDetails?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onError?: (error: any) => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function PaymentButton({
  amount = 1499,
  planName = 'IronCore Membership Plan',
  buttonText,
  className = '',
  userDetails = {},
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1. Dynamically load Razorpay Checkout script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // 2. Call backend route to create Razorpay Order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            planName,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create payment order.');
      }

      const orderData = await res.json();

      // 3. Obtain Razorpay Key ID from env
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not configured in environment variables.');
      }

      // 4. Initialize Razorpay options
      const options = {
        key: razorpayKey,
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'IronCore Fitness',
        description: planName,
        order_id: orderData.id,
        handler: function (response: any) {
          console.log('Razorpay Payment Success Response:', response);
          if (onSuccess) {
            onSuccess(response);
          } else {
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          }
          setLoading(false);
        },
        prefill: {
          name: userDetails.name || '',
          email: userDetails.email || '',
          contact: userDetails.contact || '',
        },
        theme: {
          color: '#ff3b00',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        console.error('Razorpay Payment Failed:', response.error);
        if (onError) {
          onError(response.error);
        } else {
          alert(`Payment Failed: ${response.error.description || 'Transaction failed'}`);
        }
        setLoading(false);
      });

      paymentObject.open();
    } catch (err: any) {
      console.error('Payment Error:', err);
      if (onError) {
        onError(err);
      } else {
        alert(err.message || 'Something went wrong while initializing payment.');
      }
      setLoading(false);
    }
  };

  const defaultButtonLabel = `Pay ₹${amount.toLocaleString('en-IN')} Now`;

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`glow-button group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <CreditCard className="h-5 w-5 transition-transform group-hover:scale-110" />
          <span>{buttonText || defaultButtonLabel}</span>
        </>
      )}
    </button>
  );
}

export default PaymentButton;
