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
          ? 'bg-[#090d14]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3b00] to-[#b82600] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <Dumbbell className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight font-[family-name:var(--font-montserrat)] text-white flex items-center gap-1.5">
                IRON<span className="text-[#ff3b00]">CORE</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block font-semibold -mt-1">
                FITNESS GHAZIABAD
              </span>
            </div>
          </a>

          {/* Desktop Branch Selector & Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-[#ff3b00] transition-colors">
              Amenities
            </a>
            <a href="#schedule" className="text-sm font-medium text-gray-300 hover:text-[#ff3b00] transition-colors">
              Class Schedule
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-300 hover:text-[#ff3b00] transition-colors">
              Pricing Plans
            </a>
            <a href="#trainers" className="text-sm font-medium text-gray-300 hover:text-[#ff3b00] transition-colors">
              Trainers
            </a>
            <a href="#transformations" className="text-sm font-medium text-gray-300 hover:text-[#ff3b00] transition-colors">
              Results
            </a>
            <a href="#location" className="text-sm font-medium text-gray-300 hover:text-[#ff3b00] transition-colors">
              Location & Hours
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Branch Indicator Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#ff3b00]" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-transparent text-gray-200 outline-none cursor-pointer focus:ring-0 font-medium"
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
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff3b00]" />
              +91 98765 43210
            </a>

            {/* Free Trial CTA */}
            <button
              onClick={() => onOpenBookingModal(selectedBranch)}
              className="glow-button px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 group cursor-pointer"
            >
              <Flame className="w-4 h-4 text-yellow-300 group-hover:scale-125 transition-transform" />
              Claim Free Pass
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => onOpenBookingModal(selectedBranch)}
              className="glow-button px-3 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 text-yellow-300" />
              Trial Pass
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090d14]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ff3b00]" /> Preferred Branch
            </span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-[#111827] text-white text-xs px-2 py-1 rounded border border-white/20 outline-none"
            >
              {LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-medium text-base py-1"
            >
              Gym Amenities
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-medium text-base py-1"
            >
              Class Schedule
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-medium text-base py-1"
            >
              Membership Pricing (₹)
            </a>
            <a
              href="#trainers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-medium text-base py-1"
            >
              Certified Trainers
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-medium text-base py-1"
            >
              Member Transformations
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-[#ff3b00] font-medium text-base py-1"
            >
              Location & Hours
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-200 font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-[#ff3b00]" /> Call Gym Hotline (+91 98765 43210)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal(selectedBranch);
              }}
              className="w-full glow-button py-3 rounded-xl text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-yellow-300" /> Book Free 3-Day Trial Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
