'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Clock, ChevronDown, HelpCircle, Mail, ExternalLink } from 'lucide-react';
import { FAQS } from '../data/gymData';

export const MapFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="location" className="py-24 relative bg-[#090d15] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-[#ff3b00]">
            <MapPin className="w-3.5 h-3.5" /> Ghaziabad Gym Hub
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            LOCATION & <span className="text-gradient">FREQUENT QUESTIONS</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-normal">
            Easily accessible from Indirapuram Habitat Centre, Raj Nagar Extension, and Vaishali Metro.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Contact & Hours Info Card */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                Indirapuram Main Branch
              </h3>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Address</span>
                    <p className="text-white font-medium">Plot 12, Main Expressway Road, Indirapuram, Ghaziabad, UP 201014</p>
                    <span className="text-xs text-gray-400 mt-1 block">Branches: Indirapuram | Raj Nagar Ext | Vaishali</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Phone Hotline</span>
                    <a href="tel:+919718871979" className="text-white font-extrabold text-base hover:text-[#ff3b00] transition-colors">
                      +91 9718871979
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Operational Hours</span>
                    <p className="text-white font-bold">Mon - Sat: 5:30 AM – 10:30 PM</p>
                    <p className="text-xs text-emerald-400 font-bold mt-0.5">Sunday Active Recovery: 7:00 AM – 12:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ff3b00]/10 border border-[#ff3b00]/30 flex items-center justify-center text-[#ff3b00] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Desk Email</span>
                    <a href="mailto:indirapuram@ironcorefitness.in" className="text-white hover:underline font-bold">
                      indirapuram@ironcorefitness.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=28.6415,77.3714"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all"
            >
              Open Google Maps <ExternalLink className="w-4 h-4 text-[#ff3b00]" />
            </a>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/15 min-h-[360px] relative shadow-2xl">
            <iframe
              title="IronCore Gym Ghaziabad Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14004.974950392095!2d77.3614!3d28.6415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf5453676644f%3A0x6b4fb6c123!2sIndirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter invert grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 justify-center text-xs font-extrabold uppercase text-gray-300 tracking-wider mb-6">
            <HelpCircle className="w-4 h-4 text-[#ff3b00]" /> Frequently Asked Questions
          </div>

          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-base font-extrabold text-white font-[family-name:var(--font-montserrat)]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ff3b00] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-200 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

