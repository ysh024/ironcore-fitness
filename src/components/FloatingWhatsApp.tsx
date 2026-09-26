'use client';

import React from 'react';
import { MessageCircle, Flame } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Hi IronCore Fitness Ghaziabad! 👋 I'm interested in booking a Free 3-Day Trial Pass and getting membership details."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Floating Tooltip */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-xl animate-bounce">
        <Flame className="w-3.5 h-3.5 text-yellow-300" />
        Instant WhatsApp Desk
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl pulse-whatsapp cursor-pointer transition-transform hover:scale-110 active:scale-95"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
};
