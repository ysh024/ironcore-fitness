'use client';

import React, { useState, useEffect } from 'react';
import { Dumbbell, Phone, MapPin, Menu, X, Flame } from 'lucide-react';
import { LOCALITIES } from '../data/gymData';

interface NavbarProps {
  onOpenBookingModal: (selectedLocality?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('Indirapuram');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d14]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#ff3b00] to-[#b82600] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 transform -rotate-45" />
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black tracking-tight font-[family-name:var(--font-montserrat)] text-white flex items-center gap-1">
                IRON<span className="text-[#ff3b00]">CORE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 block font-bold -mt-1">
                FITNESS GHAZIABAD
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <a href="#features" className="text-xs font-bold text-gray-300 hover:text-[#ff3b00] transition-colors whitespace-nowrap">
              Amenities
            </a>
            <a href="#schedule" className="text-xs font-bold text-gray-300 hover:text-[#ff3b00] transition-colors whitespace-nowrap">
              Timetable
            </a>
            <a href="#pricing" className="text-xs font-bold text-gray-300 hover:text-[#ff3b00] transition-colors whitespace-nowrap">
              Pricing Plans
            </a>
            <a href="#trainers" className="text-xs font-bold text-gray-300 hover:text-[#ff3b00] transition-colors whitespace-nowrap">
              Trainers
            </a>
            <a href="#transformations" className="text-xs font-bold text-gray-300 hover:text-[#ff3b00] transition-colors whitespace-nowrap">
              Results
            </a>
            <a href="#location" className="text-xs font-bold text-gray-300 hover:text-[#ff3b00] transition-colors whitespace-nowrap">
              Location & Hours
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Branch Indicator Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#ff3b00] shrink-0" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent text-gray-200 outline-none cursor-pointer focus:ring-0 font-bold"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc} className="bg-[#111827] text-white">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Direct Phone Dialer */}
            <a
              href="tel:+919718871979"
              className="flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff3b00] shrink-0" />
              +91 9718871979
            </a>

            {/* Free Trial CTA */}
            <button
              onClick={() => onOpenBookingModal(selectedBranch)}
              className="glow-button px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5 group cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Flame className="w-4 h-4 text-yellow-300 group-hover:scale-125 transition-transform" />
              Free Trial Pass
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <a
              href="tel:+919718871979"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff3b00]" />
              <span className="hidden sm:inline">9718871979</span>
            </a>
            <button
              onClick={() => onOpenBookingModal(selectedBranch)}
              className="glow-button px-3 py-1.5 rounded-lg text-xs font-extrabold text-white flex items-center gap-1 whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 text-yellow-300" />
              Free Pass
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d14]/95 backdrop-blur-xl border-b border-white/10 px-5 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ff3b00]" /> Select Branch
            </span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-[#111827] text-white text-xs px-2 py-1 rounded border border-white/20 outline-none font-bold"
            >
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2 pt-1">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-semibold text-sm py-1.5"
            >
              Gym Amenities
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-semibold text-sm py-1.5"
            >
              Daily Timetable
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-semibold text-sm py-1.5"
            >
              Membership Plans (₹)
            </a>
            <a
              href="#trainers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-semibold text-sm py-1.5"
            >
              Gym Trainers
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-semibold text-sm py-1.5"
            >
              Member Transformations
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-semibold text-sm py-1.5"
            >
              Location & Hours
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <a
              href="tel:+919718871979"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-[#ff3b00]" /> Call Gym Desk (+91 9718871979)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal(selectedBranch);
              }}
              className="w-full glow-button py-3 rounded-xl text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-yellow-300" /> Book Free 3-Day Trial Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

