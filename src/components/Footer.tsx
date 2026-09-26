'use client';

import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { LOCALITIES } from '../data/gymData';

interface FooterProps {
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBookingModal }) => {
  return (
    <footer className="bg-[#05080e] text-gray-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3b00] to-[#b82600] flex items-center justify-center text-white shadow-lg">
                <Dumbbell className="w-6 h-6 transform -rotate-45" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight font-[family-name:var(--font-montserrat)] text-white">
                IRON<span className="text-[#ff3b00]">CORE</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
              Premier 10,000 sq.ft fitness facility located in Indirapuram, Ghaziabad. Offering biomechanic strength equipment, certified personal training, steam baths, and group HIIT classes.
            </p>

            {/* Social SVGs */}
            <div className="flex items-center gap-3 pt-2 text-white">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ff3b00] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ff3b00] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ff3b00] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Localities Served */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-[family-name:var(--font-montserrat)]">
              Ghaziabad Localities
            </h4>
            <ul className="space-y-2 text-xs">
              {LOCALITIES.map((loc) => (
                <li key={loc} className="flex items-center gap-1.5 hover:text-[#ff3b00] transition-colors">
                  <MapPin className="w-3 h-3 text-[#ff3b00]" /> {loc} Branch Area
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-[family-name:var(--font-montserrat)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-[#ff3b00] transition-colors">Amenities & Equipment</a></li>
              <li><a href="#schedule" className="hover:text-[#ff3b00] transition-colors">Class Timetable</a></li>
              <li><a href="#pricing" className="hover:text-[#ff3b00] transition-colors">Membership Pricing (₹)</a></li>
              <li><a href="#trainers" className="hover:text-[#ff3b00] transition-colors">Certified Trainers</a></li>
              <li><a href="#transformations" className="hover:text-[#ff3b00] transition-colors">Member Success Stories</a></li>
            </ul>
          </div>

          {/* Col 5: Direct Hotline */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-[family-name:var(--font-montserrat)]">
              Desk Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-white font-bold hover:text-[#ff3b00]">
                <Phone className="w-4 h-4 text-[#ff3b00]" /> +91 98765 43210
              </a>
              <a href="mailto:indirapuram@ironcorefitness.in" className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4 text-gray-400" /> indirapuram@ironcorefitness.in
              </a>
            </div>
            <button
              onClick={onOpenBookingModal}
              className="w-full glow-button py-2.5 rounded-xl text-white font-extrabold text-xs uppercase tracking-wider"
            >
              Get Free 3-Day Pass
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} IronCore Fitness Gym Ghaziabad. All rights reserved.</p>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> WCAG 2.1 AA Compliant & SSL Secured
          </div>
        </div>

      </div>
    </footer>
  );
};
