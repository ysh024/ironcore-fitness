'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Flame, Filter, Zap } from 'lucide-react';
import { SCHEDULE_DATA } from '../data/gymData';
import { ScheduleItem } from '../types';

interface ScheduleProps {
  onOpenBookingModal: (classTitle?: string) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const CATEGORIES = ['All', 'Strength', 'CrossFit', 'Yoga', 'Zumba', 'Cardio'] as const;

export const Schedule: React.FC<ScheduleProps> = ({ onOpenBookingModal }) => {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSchedule = SCHEDULE_DATA.filter((item) => {
    const matchesDay = item.day === selectedDay;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  return (
    <section id="schedule" className="py-24 relative bg-[#090d15] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-extrabold uppercase tracking-widest text-yellow-400">
            <Zap className="w-3.5 h-3.5 fill-current" /> Daily Group Timetable
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-[family-name:var(--font-montserrat)] tracking-tight text-white">
            EXPLORE THE <span className="text-gradient-fiery">CLASS SCHEDULE</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Included in your IronCore membership. Filter by day and workout type to plan your weekly routine in Ghaziabad.
          </p>
        </div>

        {/* Days Tab Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-[#ff3b00] to-[#d92d00] text-white shadow-lg shadow-[#ff3b00]/30 scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-[#ff3b00]" /> Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timetable Grid Cards */}
        {filteredSchedule.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
            <p className="text-gray-400 text-sm">No group classes scheduled for this category filter on {selectedDay}.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs text-[#ff3b00] font-bold underline"
            >
              Show all {selectedDay} classes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#ff3b00]/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#ff3b00]/15 text-[#ff3b00] text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#ff3b00]/25">
                      {item.category}
                    </span>
                    <h4 className="text-xl font-bold text-white font-[family-name:var(--font-montserrat)]">
                      {item.className}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-yellow-300 border border-white/10">
                    {item.intensity} Intensity
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-gray-300 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#ff3b00]" />
                    <span>{item.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Coach {item.trainerName}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#ff3b00]" /> Free Pass Eligible
                  </span>
                  <button
                    onClick={() => onOpenBookingModal(item.className)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#ff3b00] hover:text-white text-xs font-bold text-gray-200 transition-all cursor-pointer"
                  >
                    Reserve Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
