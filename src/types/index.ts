export interface MembershipTier {
  id: string;
  name: string;
  duration: '1 Month' | '3 Months' | '6 Months' | '12 Months';
  priceINR: number;
  originalPriceINR?: number;
  isPopular?: boolean;
  tagline: string;
  perks: string[];
}

export interface GymLead {
  fullName: string;
  mobileNumber: string;
  preferredTiming: 'Morning (6 AM - 10 AM)' | 'Evening (5 PM - 10 PM)';
  targetGoal: 'Weight Loss' | 'Muscle Gain' | 'General Fitness' | 'Crossfit & Strength';
  locality: 'Indirapuram' | 'Raj Nagar Extension' | 'Vaishali' | 'Vasundhara' | 'Ghaziabad Central' | 'Other';
  notes?: string;
}

export interface ScheduleItem {
  id: string;
  timeSlot: string;
  className: string;
  category: 'Strength' | 'CrossFit' | 'Yoga' | 'Zumba' | 'Cardio';
  trainerName: string;
  intensity: 'High' | 'Medium' | 'All Levels';
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
}

export interface TrainerProfile {
  id: string;
  name: string;
  title: string;
  certification: string;
  experienceYears: number;
  specialties: string[];
  image: string;
  quote: string;
}

export interface TransformationStory {
  id: string;
  memberName: string;
  locality: string;
  weightLostKg?: number;
  muscleGainedKg?: number;
  durationMonths: number;
  testimonial: string;
  rating: number;
  achievement: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
