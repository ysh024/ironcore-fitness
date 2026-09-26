'use client';

import React from 'react';
import { Dumbbell, Activity, Flame, ShieldCheck, Coffee, Car, Sparkles, CheckCircle2 } from 'lucide-react';
import { AMENITIES } from '../data/gymData';

interface AmenitiesProps {
  onOpenBookingModal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Dumbbell: <Dumbbell className="w-7 h-7 text-[#ff3b00] group-hover:rotate-12 transition-transform duration-300" />,
  Activity: <Activity className="w-7 h-7 text-[#ff3b00] group-hover:scale-125 transition-transform duration-300" />,
  Flame: <Flame className="w-7 h-7 text-[#ff3b00] group-hover:scale-125 group-hover:text-yellow-400 transition-all duration-300" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-[#ff3b00] group-hover:rotate-12 transition-transform duration-300" />,
  Coffee: <Coffee className="w-7 h-7 text-[#ff3b00] group-hover:-rotate-12 transition-transform duration-300" />,
  Car: <Car className="w-7 h-7 text-[#ff3b00] group-hover:translate-x-1 transition-transform duration-300" />
};

export const Amenities: React.FC<AmenitiesProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#080c14]">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff3b00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-[#ff3b00] hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> World-Class Facilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            WORLD-CLASS <span className="text-gradient">GYM AMENITIES</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
            Every square inch of IronCore Gym Ghaziabad is designed for a smooth, premium workout environment with zero queueing for weights.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-white/10 group hover:border-[#ff3b00]/60 transition-all duration-300 relative cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ff3b00]/15 group-hover:border-[#ff3b00]/30 transition-all duration-300 shadow-md">
                {ICON_MAP[item.iconName] || <Dumbbell className="w-7 h-7 text-[#ff3b00]" />}
              </div>

              <h3 className="text-xl font-extrabold text-white mb-3 font-[family-name:var(--font-montserrat)] group-hover:text-[#ff3b00] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed font-normal">
                {item.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Available at Indirapuram Branch
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-8 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-white/30 transition-all">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-extrabold text-white font-[family-name:var(--font-montserrat)]">
              Want to see our machines & steam bath before joining?
            </h4>
            <p className="text-xs text-gray-300 font-normal">
              Walk in any time between 5:30 AM and 10:30 PM for a guided tour with our floor manager.
            </p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="glow-button px-6 py-3 rounded.xl text-xs font-extrabold uppercase tracking-wider text-white whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
          >
            Book Gym Walkthrough Pass
          </button>
        </div>

      </div>
    </section>
  );
};

