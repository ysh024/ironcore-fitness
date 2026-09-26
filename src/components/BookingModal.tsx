'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle2, Flame, MapPin, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { LOCALITIES } from '../data/gymData';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  preferredTiming: z.enum(['Morning (6 AM - 10 AM)', 'Evening (5 PM - 10 PM)']),
  targetGoal: z.enum(['Weight Loss', 'Muscle Gain', 'General Fitness', 'Crossfit & Strength']),
  locality: z.enum(['Indirapuram', 'Raj Nagar Extension', 'Vaishali', 'Other']),
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
        setTimeout(() => {
          const text = encodeURIComponent(
            `Hi IronCore Gym Ghaziabad! I just registered for a Free 3-Day Trial Pass.\nName: ${data.fullName}\nPhone: ${data.mobileNumber}\nBranch: ${data.locality}\nGoal: ${data.targetGoal}\nPreferred Time: ${data.preferredTiming}`
          );
          window.open(`https://wa.me/919718871979?text=${text}`, '_blank');
        }, 1200);
      } else {
        alert('Could not submit form. Please contact us on WhatsApp directly at 9718871979.');
      }
    } catch (err) {
      console.error('Lead error:', err);
      alert('Network issue. Please try again or call 9718871979.');
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
        <div className="bg-gradient-to-r from-[#ff3b00] to-[#b82600] p-6 text-white relative text-left">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-yellow-300 mb-1.5 bg-black/20 px-2.5 py-0.5 rounded-md">
            <Flame className="w-3.5 h-3.5 text-yellow-300 animate-pulse" /> Free Trial Offer
          </div>
          <h3 className="text-2xl font-black font-[family-name:var(--font-montserrat)] tracking-tight leading-tight">
            Get Your Free 3-Day Trial Pass
          </h3>
          <p className="text-xs text-red-100 mt-1 font-medium leading-normal">
            100% Free • Includes Trainer Orientation & Gym Floor Pass
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="text-xl font-extrabold text-white text-center font-[family-name:var(--font-montserrat)]">
                Your Trial Pass is Ready!
              </h4>
              <p className="text-sm text-gray-300 max-w-sm text-center leading-relaxed font-normal">
                Opening WhatsApp to instantly connect you with our Ghaziabad gym front desk team...
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-gray-200 uppercase tracking-wider text-left">
                  Full Name <span className="text-[#ff3b00]">*</span>
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] transition-colors font-medium"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-gray-200 uppercase tracking-wider text-left">
                  Mobile Number (WhatsApp) <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs text-gray-400 font-bold select-none">+91</span>
                  <input
                    {...register('mobileNumber')}
                    type="tel"
                    maxLength={10}
                    placeholder="9718871979"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ff3b00] transition-colors font-medium"
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* Grid: Branch & Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-gray-200 uppercase tracking-wider text-left">
                    Select Branch <span className="text-[#ff3b00]">*</span>
                  </label>
                  <select
                    {...register('locality')}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff3b00] font-bold cursor-pointer"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    <option value="Other">Other Ghaziabad Area</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-gray-200 uppercase tracking-wider text-left">
                    Fitness Goal <span className="text-[#ff3b00]">*</span>
                  </label>
                  <select
                    {...register('targetGoal')}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#111827] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff3b00] font-bold cursor-pointer"
                  >
                    <option value="Weight Loss">Weight Loss & Fat Burn</option>
                    <option value="Muscle Gain">Muscle Building</option>
                    <option value="Crossfit & Strength">CrossFit & Stamina</option>
                    <option value="General Fitness">General Health & Fitness</option>
                  </select>
                </div>
              </div>

              {/* Preferred Slot */}
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-gray-200 uppercase tracking-wider text-left">
                  Preferred Time Slot <span className="text-[#ff3b00]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-200 cursor-pointer hover:border-white/30 transition-all text-center">
                    <input
                      {...register('preferredTiming')}
                      type="radio"
                      value="Morning (6 AM - 10 AM)"
                      className="accent-[#ff3b00] cursor-pointer"
                    />
                    <span>Morning (6 - 10 AM)</span>
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-200 cursor-pointer hover:border-white/30 transition-all text-center">
                    <input
                      {...register('preferredTiming')}
                      type="radio"
                      value="Evening (5 PM - 10 PM)"
                      className="accent-[#ff3b00] cursor-pointer"
                    />
                    <span>Evening (5 - 10 PM)</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glow-button py-3.5 rounded-xl text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Registering Pass...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                      <span>Get Free Pass on WhatsApp</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 font-bold pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#ff3b00] shrink-0" /> Valid at Indirapuram, Raj Nagar Ext & Vaishali branches
              </p>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};


