'use client';

import React from 'react';
import { Check, Sparkles, Flame, ShieldCheck } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/gymData';
import { MembershipTier } from '../types';
import PaymentButton from './PaymentButton';

interface PricingProps {
  onOpenBookingModal: (planName?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#080c14]">
      {/* Glow background accent */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff3b00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-[#ff3b00] hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5" /> Simple & Affordable Fees
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            CHOOSE YOUR <span className="text-gradient-fiery">MEMBERSHIP PLAN</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            No hidden admission fees or maintenance charges. Pay securely online or book a Free 3-Day Pass first!
          </p>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERSHIP_TIERS.map((tier: MembershipTier) => {
            const isPopular = tier.isPopular;

            return (
              <div
                key={tier.id}
                className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-400 group hover:border-[#ff3b00]/60 ${
                  isPopular
                    ? 'border-2 border-[#ff3b00] shadow-2xl shadow-[#ff3b00]/25 scale-105 bg-[#0f172a]/95 z-20 hover:scale-108'
                    : 'border border-white/10 hover:border-white/30'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ff3b00] to-[#dc2626] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300 animate-pulse" />
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-white font-[family-name:var(--font-montserrat)] mb-1 group-hover:text-[#ff3b00] transition-colors">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 font-normal">{tier.tagline}</p>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-[#ff3b00]">₹</span>
                      <span className="text-4xl font-black text-white font-[family-name:var(--font-montserrat)] tracking-tight">
                        {tier.priceINR.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">/ {tier.duration}</span>
                    </div>

                    {tier.originalPriceINR && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400 line-through">
                          ₹{tier.originalPriceINR.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Save ₹{(tier.originalPriceINR - tier.priceINR).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Perks Checklist */}
                  <ul className="space-y-3 mb-8">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <div className="w-4 h-4 rounded-full bg-[#ff3b00]/20 text-[#ff3b00] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-normal">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA: Razorpay Payment & Free Trial Option */}
                <div className="space-y-2.5">
                  <PaymentButton
                    amount={tier.priceINR}
                    planName={`IronCore ${tier.name} Plan`}
                    buttonText={`Pay ₹${tier.priceINR.toLocaleString('en-IN')} Online`}
                    className="w-full text-xs py-3 rounded-2xl uppercase tracking-wider"
                  />

                  <button
                    onClick={() => onOpenBookingModal(tier.name)}
                    className="w-full py-2 text-[11px] font-bold text-gray-400 hover:text-white transition-colors cursor-pointer text-center underline"
                  >
                    Or Book Free 3-Day Trial Pass
                  </button>

                  <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 font-bold pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Instant Receipt & Confirmation
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Corporate / Custom Package Notice */}
        <div className="mt-12 text-center text-xs text-gray-300">
          Looking for Corporate Memberships or Family Group Discounts in Ghaziabad?{' '}
          <button
            onClick={() => onOpenBookingModal('Corporate Discount')}
            className="text-[#ff3b00] font-bold underline hover:text-white transition-colors cursor-pointer ml-1"
          >
            Contact Desk Hotline
          </button>
        </div>

      </div>
    </section>
  );
};
