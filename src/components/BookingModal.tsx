'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle2, Flame, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { LOCALITIES } from '../data/gymData';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number (e.g. 9876543210)'),
  preferredTiming: z.enum(['Morning (6 AM - 10 AM)', 'Evening (5 PM - 10 PM)']),
  targetGoal: z.enum(['Weight Loss', 'Muscle Gain', 'General Fitness', 'Crossfit & Strength']),
  locality: z.enum(['Indirapuram', 'Raj Nagar Extension', 'Vaishali', 'Vasundhara', 'Ghaziabad Central', 'Other']),
  notes: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocality?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultLocality = 'Indirapuram'
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      preferredTiming: 'Morning (6 AM - 10 AM)',
      targetGoal: 'Weight Loss',
      locality: (LOCALITIES.includes(defaultLocality as any) ? defaultLocality : 'Indirapuram') as any,
      notes: ''
    }
  });

  if (!isOpen) return null;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSuccess(true);
        // Also redirect to WhatsApp with prefilled message after brief delay or directly
        setTimeout(() => {
          const text = encodeURIComponent(
            `Hi IronCore Ghaziabad! I just registered for a Free 3-Day Trial Pass.\nName: ${data.fullName}\nPhone: ${data.mobileNumber}\nLocality: ${data.locality}\nGoal: ${data.targetGoal}\nPreferred Timing: ${data.preferredTiming}`
          );
          window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
        }, 1500);
      } else {
        alert('Could not submit form. Please check details or contact us directly on WhatsApp.');
      }
    } catch (err) {
      console.error('Lead error:', err);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden border border-white/15 bg-[#0d131f] shadow-2xl">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#ff3b00] to-[#b82600] p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-300 mb-1">
            <Flame className="w-4 h-4" /> Limited VIP Slot Offer
          </div>
          <h3 className="text-2xl font-black font-[family-name:var(--font-montserrat)] tracking-tight">
            Claim Your Free 3-Day VIP Trial Pass
          </h3>
          <p className="text-xs text-red-100 mt-1">
            Zero commitment • Includes Personal Trainer Consultation & InBody Analysis
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-xl font-bold text-white">Your Trial Pass is Reserved!</h4>
              <p className="text-sm text-gray-300 max-w-sm mx-auto">
                We have registered your request. Redirecting you to WhatsApp for instant confirmation with our Ghaziabad front desk team...
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
                >
                  Close Dialog
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Full Name <span className="text-[#ff3b00]">*</span>
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] transition-colors"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Mobile Number (WhatsApp) <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-gray-400 font-semibold">+91</span>
                  <input
                    {...register('mobileNumber')}
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] transition-colors"
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-xs text-red-400 mt-1">{errors.mobileNumber.message}</p>
                )}
              </div>

              {/* Grid: Locality & Target Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Your Locality <span className="text-[#ff3b00]">*</span>
                  </label>
                  <select
                    {...register('locality')}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff3b00]"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    <option value="Other">Other Ghaziabad Area</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Primary Goal <span className="text-[#ff3b00]">*</span>
                  </label>
                  <select
                    {...register('targetGoal')}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff3b00]"
                  >
                    <option value="Weight Loss">Weight Loss / Fat Burn</option>
                    <option value="Muscle Gain">Muscle Building</option>
                    <option value="Crossfit & Strength">Crossfit & Endurance</option>
                    <option value="General Fitness">General Fitness & Wellness</option>
                  </select>
                </div>
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Preferred Time Slot <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-200 cursor-pointer hover:border-white/30">
                    <input
                      {...register('preferredTiming')}
                      type="radio"
                      value="Morning (6 AM - 10 AM)"
                      className="accent-[#ff3b00]"
                    />
                    Morning (6 - 10 AM)
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-200 cursor-pointer hover:border-white/30">
                    <input
                      {...register('preferredTiming')}
                      type="radio"
                      value="Evening (5 PM - 10 PM)"
                      className="accent-[#ff3b00]"
                    />
                    Evening (5 - 10 PM)
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glow-button py-3.5 rounded-xl text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering Pass...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      Confirm & Get WhatsApp Pass
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3 text-[#ff3b00]" /> Valid at IronCore Indirapuram / Raj Nagar Ext branches
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
