'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Flame, Star, ShieldCheck, MapPin, Play, Trophy, Users, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBookingModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingModal }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ironcore_hero.jpg"
          alt="IronCore Fitness Gym Floor Ghaziabad"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/80 to-black/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080c14]/40 to-[#080c14]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Copy & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-extrabold uppercase tracking-wider text-yellow-400 shadow-xl">
              <Flame className="w-4 h-4 text-[#ff3b00] animate-pulse" />
              <span>#1 Gym in Ghaziabad • Indirapuram | Raj Nagar Ext | Vaishali</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white leading-[1.15]">
              GET FIT, SHRED FAT & <br className="hidden sm:inline" />
              BUILD <span className="text-gradient-fiery">REAL MUSCLE.</span>
            </h1>

            {/* Body Copy in easy Indian English */}
            <p className="text-base sm:text-xl text-gray-200 max-w-2xl font-normal leading-relaxed">
              Ghaziabad’s top 10,000 sq.ft gym facility. Equipped with imported biomechanic machines, certified personal trainers, clean steam bath, and fun group Zumba & CrossFit classes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBookingModal}
                className="glow-button px-8 py-4 rounded-2xl text-base font-extrabold uppercase tracking-wider text-white flex items-center justify-center gap-3 group cursor-pointer"
              >
                <Flame className="w-5 h-5 text-yellow-300 group-hover:scale-125 transition-transform" />
                Book Free 3-Day Trial Pass
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="px-6 py-4 rounded-2xl glass-card text-sm font-bold text-gray-200 hover:text-white flex items-center justify-center gap-3 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#ff3b00]/20 flex items-center justify-center text-[#ff3b00] border border-[#ff3b00]/30">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                Take Virtual Gym Tour
              </button>
            </div>

            {/* Micro Stats & Social Proof */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-montserrat)] text-white flex items-center gap-1">
                  <span>500</span><span className="text-[#ff3b00]">+</span>
                </div>
                <div className="text-xs text-gray-400 font-bold mt-0.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gray-400" /> Active Members
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-montserrat)] text-white flex items-center gap-1">
                  <span>4.9</span>
                  <div className="flex text-yellow-400 text-xs">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-bold mt-0.5">
                  180+ Google Reviews
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-[family-name:var(--font-montserrat)] text-white flex items-center gap-1">
                  <span>100</span><span className="text-[#ff3b00]">%</span>
                </div>
                <div className="text-xs text-gray-400 font-bold mt-0.5 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" /> Certified Trainers
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Card Widget */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="glass-card p-6 rounded-3xl border border-white/15 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3b00]/10 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff3b00] to-[#b82600] flex items-center justify-center text-white text-xl font-black shadow-lg">
                  ₹
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">Indirapuram Main Branch</h4>
                  <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff3b00]" /> Plot 12, Main Expressway Rd
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Operational Hours:</span>
                  <span className="text-emerald-400 font-bold">Open Today</span>
                </div>
                <p className="text-sm font-bold text-white">Mon - Sat: 5:30 AM - 10:30 PM</p>
                <p className="text-xs text-gray-400">Sunday Active Recovery: 7 AM - 12 PM</p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                  Our 3 Ghaziabad Branches:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Indirapuram', 'Raj Nagar Extension', 'Vaishali'].map((loc) => (
                    <span key={loc} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200 font-bold">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenBookingModal}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Claim Free Trial Pass Now
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl glass-card rounded-2xl overflow-hidden border border-white/20">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 text-white text-xs font-bold"
            >
              Close Video ✕
            </button>
            <div className="aspect-video w-full bg-black flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#ff3b00]/20 text-[#ff3b00] flex items-center justify-center border border-[#ff3b00]/40 animate-pulse">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                IronCore Gym Tour (Ghaziabad)
              </h3>
              <p className="text-sm text-gray-300 max-w-md">
                Take a look inside our 10,000 sq.ft gym floor, steam bath rooms, heavy weight area, and cardio deck!
              </p>
              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  onOpenBookingModal();
                }}
                className="glow-button px-6 py-3 rounded-xl text-white font-bold text-xs uppercase"
              >
                Book Gym Walkthrough Pass
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

