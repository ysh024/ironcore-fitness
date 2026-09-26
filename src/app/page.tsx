'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Amenities } from '../components/Amenities';
import { Schedule } from '../components/Schedule';
import { Pricing } from '../components/Pricing';
import { Trainers } from '../components/Trainers';
import { Transformations } from '../components/Transformations';
import { MapFaq } from '../components/MapFaq';
import { BookingModal } from '../components/BookingModal';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Footer } from '../components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState<string>('Indirapuram');

  const handleOpenModal = (locality?: string) => {
    if (locality) {
      setSelectedLocality(locality);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#080c14] text-gray-100 relative">
      
      {/* Navigation Header */}
      <Navbar onOpenBookingModal={handleOpenModal} />

      {/* Main Header / Hero Section */}
      <Hero onOpenBookingModal={() => handleOpenModal()} />

      {/* Facility Highlights & Amenities */}
      <Amenities onOpenBookingModal={() => handleOpenModal()} />

      {/* Class Schedule & Timetable */}
      <Schedule onOpenBookingModal={() => handleOpenModal()} />

      {/* Membership Pricing Tiers */}
      <Pricing onOpenBookingModal={(planName) => handleOpenModal()} />

      {/* Certified Trainers Showcase */}
      <Trainers onOpenBookingModal={(trainerName) => handleOpenModal()} />

      {/* Transformation Stories & Testimonials */}
      <Transformations onOpenBookingModal={() => handleOpenModal()} />

      {/* Ghaziabad Location, Map & FAQs */}
      <MapFaq />

      {/* Footer */}
      <Footer onOpenBookingModal={() => handleOpenModal()} />

      {/* Floating Quick WhatsApp Trigger */}
      <FloatingWhatsApp />

      {/* Interactive Lead Intake Modal Dialog */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultLocality={selectedLocality}
      />

    </main>
  );
}
