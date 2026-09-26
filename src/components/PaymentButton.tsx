'use client';

import React, { useState } from 'react';
import { CreditCard, Loader2, Mail, Phone, User, X } from 'lucide-react';

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
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState(userDetails.name || '');
  const [customerEmail, setCustomerEmail] = useState(userDetails.email || '');
  const [customerPhone, setCustomerPhone] = useState(userDetails.contact || '');

  const initiateRazorpayCheckout = async (email: string, name: string, phone: string) => {
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
            customerEmail: email,
            customerName: name,
            customerPhone: phone,
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
        throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is missing in environment variables.');
      }

      // 4. Initialize Razorpay options with explicit prefilled contact phone number
      const options = {
        key: razorpayKey,
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'IronCore Fitness',
        description: planName,
        order_id: orderData.id,
        handler: async function (response: any) {
          console.log('Razorpay Payment Success Response:', response);

          // Call backend to verify signature and send email receipt via Resend/Nodemailer
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                customerEmail: email,
                customerName: name,
                customerPhone: phone,
                planName,
                amount,
              }),
            });
            const verifyData = await verifyRes.json();
            console.log('Payment Verification Result:', verifyData);

            // Also call Nodemailer send-email route
            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                amount,
                planName,
              }),
            });
          } catch (vErr) {
            console.error('Error verifying payment or sending email:', vErr);
          }

          if (onSuccess) {
            onSuccess(response);
          } else {
            alert(`Payment Successful! Receipt sent to ${email || 'your email'}.\nPayment ID: ${response.razorpay_payment_id}`);
          }
          setLoading(false);
        },
        prefill: {
          name: name || '',
          email: email || '',
          contact: phone || '', // Explicit customer phone number ensures correct entry in Razorpay dashboard
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

  const handleButtonClick = () => {
    // Require user to fill details (including phone number) before launching Razorpay
    if (!customerEmail || !customerPhone || customerPhone.length < 10) {
      setShowModal(true);
    } else {
      initiateRazorpayCheckout(customerEmail, customerName, customerPhone);
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Please enter a valid email address to receive your payment receipt.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    setShowModal(false);
    initiateRazorpayCheckout(customerEmail, customerName, cleanPhone);
  };

  const defaultButtonLabel = `Pay ₹${amount.toLocaleString('en-IN')} Now`;

  return (
    <>
      <button
        onClick={handleButtonClick}
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

      {/* Modal to collect Full Name, Email & Phone Number prior to payment */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md glass-card rounded-2xl p-6 bg-[#0f172a] border border-white/15 text-left shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1 font-[family-name:var(--font-montserrat)]">
              Customer Details for Payment
            </h3>
            <p className="text-xs text-gray-300 mb-5">
              Please enter your details for <strong className="text-[#ff3b00]">{planName}</strong> to generate your Razorpay checkout pass & receipt.
            </p>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider">
                  Full Name <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider">
                  Mobile Number <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 h-4 w-4 text-gray-400" />
                  <span className="absolute left-10 text-xs text-gray-400 font-bold select-none">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-20 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">This phone number will be attached to your Razorpay transaction.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1 uppercase tracking-wider">
                  Email Address <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full glow-button py-3.5 rounded-xl text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Razorpay Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentButton;
