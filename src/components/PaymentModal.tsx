'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Loader2, Mail, Phone, User, X, CheckCircle2 } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/gymData';
import { MembershipTier } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: MembershipTier | null;
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

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  initialPlan,
}) => {
  const [selectedTier, setSelectedTier] = useState<MembershipTier>(
    initialPlan || MEMBERSHIP_TIERS[1] // Default to 3 Month plan if none specified
  );

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Sync selected tier when initialPlan prop changes or modal opens
  useEffect(() => {
    if (initialPlan) {
      setSelectedTier(initialPlan);
    }
  }, [initialPlan]);

  if (!isOpen) return null;

  const handleClose = () => {
    setLoading(false);
    setPaymentSuccess(false);
    onClose();
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setLoading(true);

      // 1. Load Razorpay Script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay Checkout SDK. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // 2. Create order on server
      const planTitle = `IronCore ${selectedTier.name}`;
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedTier.priceINR,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            planName: planTitle,
            customerEmail,
            customerName,
            customerPhone: cleanPhone,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create payment order.');
      }

      const orderData = await res.json();

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is missing in environment variables.');
      }

      // 3. Initialize Razorpay Modal with explicit phone number prefill
      const options = {
        key: razorpayKey,
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'IronCore Fitness',
        description: planTitle,
        order_id: orderData.id,
        handler: async function (response: any) {
          console.log('Razorpay Payment Success:', response);
          setPaymentSuccess(true);
          setLoading(false);

          // Verify payment signature on backend & dispatch EmailJS receipt
          try {
            await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            // Trigger EmailJS email notification
            const { sendEmailJS } = await import('@/lib/emailjs');
            await sendEmailJS({
              subject: `💪 Order Confirmed - ${planTitle} Receipt`,
              customer_name: customerName,
              customer_email: customerEmail,
              customer_phone: cleanPhone,
              plan_name: planTitle,
              amount: selectedTier.priceINR,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            });
          } catch (vErr) {
            console.error('Error post-processing payment:', vErr);
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: cleanPhone, // Ensures correct customer phone in Razorpay dashboard
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

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        alert(`Payment Failed: ${resp.error?.description || 'Transaction cancelled'}`);
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      console.error('Payment Error:', err);
      alert(err.message || 'Something went wrong while initiating payment.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 bg-[#0f172a] border border-white/15 text-left shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-lg mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white font-[family-name:var(--font-montserrat)]">
              Payment Successful!
            </h3>
            <p className="text-sm text-gray-300 max-w-sm mx-auto">
              Your digital gym pass and receipt for <strong className="text-[#ff3b00]">{selectedTier.name}</strong> has been sent to <strong>{customerEmail}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-xl glow-button text-white text-xs font-bold uppercase tracking-wider"
              >
                Close & Return to Gym Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ff3b00] bg-[#ff3b00]/10 px-3 py-1 rounded-full border border-[#ff3b00]/20">
                Secure Online Checkout
              </span>
              <h3 className="text-2xl font-black text-white font-[family-name:var(--font-montserrat)] tracking-tight mt-2">
                Buy Gym Membership Plan
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Fill details below to activate your instant gym pass.
              </p>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              
              {/* Select Plan Dropdown */}
              <div>
                <label className="block text-xs font-extrabold text-gray-200 uppercase tracking-wider mb-1">
                  Selected Membership Plan <span className="text-[#ff3b00]">*</span>
                </label>
                <select
                  value={selectedTier.id}
                  onChange={(e) => {
                    const tier = MEMBERSHIP_TIERS.find((t) => t.id === e.target.value);
                    if (tier) setSelectedTier(tier);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#1e293b] border border-white/15 text-white text-sm font-bold focus:outline-none focus:border-[#ff3b00] cursor-pointer"
                >
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} — ₹{tier.priceINR.toLocaleString('en-IN')} / {tier.duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Summary Banner */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-300 font-medium">Total Amount Payable:</span>
                <span className="text-xl font-black text-[#ff3b00] font-[family-name:var(--font-montserrat)]">
                  ₹{selectedTier.priceINR.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Full Name */}
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] font-medium"
                  />
                </div>
              </div>

              {/* Mobile Number */}
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
                    className="w-full pl-20 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] font-medium"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Required to register your phone on Razorpay dashboard.</p>
              </div>

              {/* Email Address */}
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
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] font-medium"
                  />
                </div>
              </div>

              {/* Submit Checkout */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full glow-button py-3.5 rounded-xl text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Opening Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Pay ₹{selectedTier.priceINR.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
