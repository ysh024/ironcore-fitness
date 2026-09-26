'use client';

import React from 'react';
import { Dumbbell, Activity, Flame, ShieldCheck, Coffee, Car, Sparkles, CheckCircle2 } from 'lucide-react';
import { AMENITIES } from '../data/gymData';

interface AmenitiesProps {
  onOpenBookingModal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="w-7 h-7 text-[#ff3b00]" />,
  Activity: <Activity className="w-7 h-7 text-[#ff3b00]" />,
  Flame: <Flame className="w-7 h-7 text-[#ff3b00]" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-[#ff3b00]" />,
  Coffee: <Coffee className="w-7 h-7 text-[#ff3b00]" />,
  Car: <Car className="w-7 h-7 text-[#ff3b00]" />
};

export const Amenities: React.FC<AmenitiesProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#080c14]">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff3b00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-[#ff3b00]">
            <Sparkles className="w-3.5 h-3.5" /> World-Class Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            ENGINEERED FOR <span className="text-gradient">PEAK PERFORMANCE</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Every square inch of IronCore Fitness Ghaziabad is designed to give you a frictionless, premium training environment with zero queueing for weights.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-white/10 group hover:border-[#ff3b00]/50 transition-all duration-300 relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ff3b00]/10 transition-all">
                {ICON_MAP[item.iconName] || <Dumbbell className="w-7 h-7 text-[#ff3b00]" />}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-[family-name:var(--font-montserrat)] group-hover:text-[#ff3b00] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed font-light">
                {item.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Available at Indirapuram Branch
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-8 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-white font-[family-name:var(--font-montserrat)]">
              Want to see our equipment & steam shower before joining?
            </h4>
            <p className="text-xs text-gray-400">
              Walk in any time between 6:00 AM and 10:00 PM for a guided tour with our floor manager.
            </p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="glow-button px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap cursor-pointer"
          >
            Book Gym Walkthrough
          </button>
        </div>

      </div>
    </section>
  );
};
