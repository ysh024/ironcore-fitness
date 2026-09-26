'use client';

import React from 'react';
import Image from 'next/image';
import { Award, ShieldCheck, Quote, Sparkles } from 'lucide-react';
import { TRAINERS } from '../data/gymData';

interface TrainersProps {
  onOpenBookingModal: (trainerName?: string) => void;
}

export const Trainers: React.FC<TrainersProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="trainers" className="py-24 relative bg-[#090d15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-yellow-400">
            <Award className="w-3.5 h-3.5" /> Internationally Certified
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            MEET YOUR <span className="text-gradient">MASTER COACHES</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Train under certified strength specialists, gold medalist powerlifters, and nutritionists who tailor every set to your goals.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group hover:border-[#ff3b00]/50 transition-all flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-80 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d15] via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-yellow-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {trainer.experienceYears}+ Years Exp
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-white font-[family-name:var(--font-montserrat)] group-hover:text-[#ff3b00] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#ff3b00]">
                    {trainer.title}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    📜 {trainer.certification}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {trainer.specialties.map((spec, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="text-xs text-gray-400 italic flex items-start gap-2 bg-white/5 p-3 rounded-xl">
                    <Quote className="w-4 h-4 text-[#ff3b00] shrink-0 mt-0.5" />
                    <span>"{trainer.quote}"</span>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal(`PT Assessment with ${trainer.name}`)}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-[#ff3b00] hover:text-white text-xs font-bold text-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    Book 1-on-1 Consultation
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
