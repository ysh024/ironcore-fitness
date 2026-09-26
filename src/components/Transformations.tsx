'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Trophy, MapPin, Quote, ArrowUpRight } from 'lucide-react';
import { TRANSFORMATIONS } from '../data/gymData';

interface TransformationsProps {
  onOpenBookingModal: () => void;
}

export const Transformations: React.FC<TransformationsProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="transformations" className="py-24 relative overflow-hidden bg-[#080c14]">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#ff3b00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            <Trophy className="w-3.5 h-3.5" /> Proven Ghaziabad Results
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            TRANSFORMATION <span className="text-gradient-fiery">STORIES</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Real stories from working professionals, parents, and athletes in Indirapuram, Raj Nagar Ext & Vaishali.
          </p>
        </div>

        {/* Top Featured Transformation Banner */}
        <div className="glass-card rounded-3xl p-8 border border-white/15 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/images/ironcore_transformation.jpg"
              alt="IronCore Member Transformation"
              fill
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex justify-between items-center text-xs font-bold text-white">
              <span>Average Fat Loss: 12-18 kg</span>
              <span className="text-emerald-400">90-Day Protocol</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-[family-name:var(--font-montserrat)]">
              "I lost 18kg in 5 months while working a 60-hour corporate desk job in Indirapuram."
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed font-light">
              "The personalized nutrition guidelines and high-energy morning CrossFit sessions completely altered my energy levels. The trainers held me accountable every single week!"
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10 text-xs">
              <div>
                <span className="text-gray-400 block">Member Name</span>
                <span className="font-bold text-white text-sm">Rohan Malhotra</span>
              </div>
              <div>
                <span className="text-gray-400 block">Location</span>
                <span className="font-bold text-white text-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ff3b00]" /> Indirapuram, Ghaziabad
                </span>
              </div>
              <div>
                <span className="text-gray-400 block">Achievement</span>
                <span className="font-bold text-emerald-400 text-sm">Down 18 kg & Rebuilt Core</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="glow-button px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-2"
              >
                Start Your Transformation <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRANSFORMATIONS.slice(1).map((item) => (
            <div key={item.id} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-white font-[family-name:var(--font-montserrat)]">
                    {item.memberName}
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#ff3b00]" /> {item.locality}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {item.achievement}
                </span>
              </div>

              <div className="text-xs text-gray-300 italic bg-white/5 p-4 rounded-xl relative">
                <Quote className="w-4 h-4 text-[#ff3b00] mb-1" />
                "{item.testimonial}"
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-white/5">
                <span>Duration: {item.durationMonths} Months</span>
                <div className="flex text-yellow-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
