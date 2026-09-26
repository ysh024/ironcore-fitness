import { MembershipTier, ScheduleItem, TrainerProfile, TransformationStory, FAQItem } from '../types';

export const LOCALITIES = [
  'Indirapuram',
  'Raj Nagar Extension',
  'Vaishali',
  'Vasundhara',
  'Ghaziabad Central'
] as const;

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'monthly',
    name: 'Starter Flex',
    duration: '1 Month',
    priceINR: 2499,
    originalPriceINR: 3499,
    tagline: 'Ideal for trial & short-term fitness goals',
    perks: [
      'Full Gym Floor Access (6 AM - 10:30 PM)',
      '1 Free Personal Training Intro Session',
      'Cardio & Heavy Free-Weights Zone Access',
      'Locker & Steam Bath Access (1x/week)',
      'Basic Body Composition Analysis (InBody)'
    ]
  },
  {
    id: 'quarterly',
    name: 'Transformation 90',
    duration: '3 Months',
    priceINR: 5999,
    originalPriceINR: 8499,
    isPopular: true,
    tagline: 'Most popular for serious weight loss & muscle gain',
    perks: [
      'Everything in Starter Flex',
      'Unlimited Steam Bath & Luxury Shower Access',
      'Customized Diet & Macro Nutrition Plan',
      'Access to Group Zumba & CrossFit Sessions',
      '2 Guest Passes per Month',
      'Free Protein Shaker & Gym Bag'
    ]
  },
  {
    id: 'half-yearly',
    name: 'Pro Athlete',
    duration: '6 Months',
    priceINR: 9999,
    originalPriceINR: 14999,
    tagline: 'Deep transformation with dedicated coaching perks',
    perks: [
      'Everything in Transformation 90',
      'Dedicated Personal Locker',
      'Bi-weekly Body Fat & Muscle Mass Tracking',
      'Unlimited Group Yoga, HIIT & CrossFit',
      'Freeze Membership for up to 21 Days',
      '10% Discount at IronCore Protein Cafe'
    ]
  },
  {
    id: 'annual',
    name: 'Iron Executive',
    duration: '12 Months',
    priceINR: 14999,
    originalPriceINR: 23999,
    tagline: 'Best value year-round fitness & elite community',
    perks: [
      'Everything in Pro Athlete Plan',
      '4 Free Personal Trainer Sessions per Month',
      'Dedicated Permanent Executive Locker',
      'Freeze Membership for up to 45 Days',
      'VIP Access to Competition Prep Seminars',
      'Full Family Discount Voucher (20% off)'
    ]
  }
];

export const SCHEDULE_DATA: ScheduleItem[] = [
  // Monday
  { id: 'm1', day: 'Monday', timeSlot: '06:00 AM - 07:00 AM', className: 'Sunrise Yoga & Mobility', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },
  { id: 'm2', day: 'Monday', timeSlot: '07:30 AM - 08:30 AM', className: 'Heavy Duty CrossFit', category: 'CrossFit', trainerName: 'Vikram Singh', intensity: 'High' },
  { id: 'm3', day: 'Monday', timeSlot: '06:00 PM - 07:00 PM', className: 'High Energy Zumba Dance', category: 'Zumba', trainerName: 'Neha Verma', intensity: 'Medium' },
  { id: 'm4', day: 'Monday', timeSlot: '07:30 PM - 08:30 PM', className: 'Hypertrophy Chest & Triceps', category: 'Strength', trainerName: 'Vikram Singh', intensity: 'High' },

  // Tuesday
  { id: 't1', day: 'Tuesday', timeSlot: '06:30 AM - 07:30 AM', className: 'Fat Burn HIIT Circuit', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'High' },
  { id: 't2', day: 'Tuesday', timeSlot: '08:00 AM - 09:00 AM', className: 'Power Lifting & Squats', category: 'Strength', trainerName: 'Kabir Rawat', intensity: 'High' },
  { id: 't3', day: 'Tuesday', timeSlot: '06:30 PM - 07:30 PM', className: 'Back & Biceps Conditioning', category: 'Strength', trainerName: 'Vikram Singh', intensity: 'Medium' },
  { id: 't4', day: 'Tuesday', timeSlot: '08:00 PM - 09:00 PM', className: 'Core Burn & Abs Sculpt', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'All Levels' },

  // Wednesday
  { id: 'w1', day: 'Wednesday', timeSlot: '06:00 AM - 07:00 AM', className: 'Pranayama & Power Yoga', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },
  { id: 'w2', day: 'Wednesday', timeSlot: '07:30 AM - 08:30 AM', className: 'Functional Turf Endurance', category: 'CrossFit', trainerName: 'Kabir Rawat', intensity: 'High' },
  { id: 'w3', day: 'Wednesday', timeSlot: '06:00 PM - 07:00 PM', className: 'Bollywood Zumba Fitness', category: 'Zumba', trainerName: 'Neha Verma', intensity: 'Medium' },
  { id: 'w4', day: 'Wednesday', timeSlot: '07:30 PM - 08:30 PM', className: 'Legs & Glutes Destroyer', category: 'Strength', trainerName: 'Vikram Singh', intensity: 'High' },

  // Thursday
  { id: 'th1', day: 'Thursday', timeSlot: '06:30 AM - 07:30 AM', className: 'Calisthenics & Bodyweight', category: 'CrossFit', trainerName: 'Ananya Sharma', intensity: 'Medium' },
  { id: 'th2', day: 'Thursday', timeSlot: '08:00 AM - 09:00 AM', className: 'Shoulders & Arms Pump', category: 'Strength', trainerName: 'Kabir Rawat', intensity: 'High' },
  { id: 'th3', day: 'Thursday', timeSlot: '06:30 PM - 07:30 PM', className: 'Metabolic Conditioning', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'High' },
  { id: 'th4', day: 'Thursday', timeSlot: '08:00 PM - 09:00 PM', className: 'Deep Tissue Recovery Yoga', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },

  // Friday
  { id: 'f1', day: 'Friday', timeSlot: '06:00 AM - 07:00 AM', className: 'CrossFit WOD Heavy', category: 'CrossFit', trainerName: 'Vikram Singh', intensity: 'High' },
  { id: 'f2', day: 'Friday', timeSlot: '07:30 AM - 08:30 AM', className: 'Stepper & Treadmill Sprint', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'Medium' },
  { id: 'f3', day: 'Friday', timeSlot: '06:00 PM - 07:00 PM', className: 'Zumba Cardio Party', category: 'Zumba', trainerName: 'Neha Verma', intensity: 'All Levels' },
  { id: 'f4', day: 'Friday', timeSlot: '07:30 PM - 08:30 PM', className: 'Full Body Compound Lift', category: 'Strength', trainerName: 'Kabir Rawat', intensity: 'High' },

  // Saturday
  { id: 's1', day: 'Saturday', timeSlot: '07:00 AM - 08:30 AM', className: 'Saturday Iron Warrior Challenge', category: 'CrossFit', trainerName: 'Vikram Singh', intensity: 'High' },
  { id: 's2', day: 'Saturday', timeSlot: '05:00 PM - 06:30 PM', className: 'Mobility & Foam Rolling', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },

  // Sunday
  { id: 'sun1', day: 'Sunday', timeSlot: '08:00 AM - 10:00 AM', className: 'Active Recovery & Hydration Walk', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'All Levels' }
];

export const TRAINERS: TrainerProfile[] = [
  {
    id: 'vikram-singh',
    name: 'Vikram "Iron" Singh',
    title: 'Head Coach & Founder',
    certification: 'K-11 Certified Strength & Conditioning Specialist',
    experienceYears: 12,
    specialties: ['Bodybuilding', 'Powerlifting', 'Postural Correction'],
    image: '/images/ironcore_trainer.jpg',
    quote: 'Fitness is not a 90-day task; it is an unshakeable lifestyle of discipline.'
  },
  {
    id: 'ananya-sharma',
    name: 'Ananya Sharma',
    title: 'Lead HIIT & Functional Coach',
    certification: 'ACE Certified Personal Trainer & CrossFit L1',
    experienceYears: 7,
    specialties: ['Fat Loss', 'Functional Turf Training', 'Calisthenics'],
    image: '/images/ironcore_transformation.jpg',
    quote: 'Your only limit is your mind. Show up every day and watch your body adapt.'
  },
  {
    id: 'kabir-rawat',
    name: 'Kabir Rawat',
    title: 'Senior Physique & Competition Prep Coach',
    certification: 'Gold Medalist Powerlifter & ACSM Certified',
    experienceYears: 9,
    specialties: ['Hypertrophy', 'Competition Prep', 'Strength Protocols'],
    image: '/images/ironcore_hero.jpg',
    quote: 'Heavy weights build heavy character. Elevate your baseline every session.'
  }
];

export const TRANSFORMATIONS: TransformationStory[] = [
  {
    id: 't1',
    memberName: 'Rohan Malhotra',
    locality: 'Indirapuram, Ghaziabad',
    weightLostKg: 18,
    durationMonths: 5,
    rating: 5,
    testimonial: 'IronCore transformed my stamina and body confidence! Working late IT hours, Coach Vikram created a custom morning routine that kept me consistent. Down 18kg and feeling stronger than ever.',
    achievement: 'Lost 18kg & Rebuilt Muscle Mass'
  },
  {
    id: 't2',
    memberName: 'Sneha Gupta',
    locality: 'Raj Nagar Extension',
    muscleGainedKg: 4.5,
    weightLostKg: 9,
    durationMonths: 4,
    rating: 5,
    testimonial: 'The steam bath, turf area, and friendly coaches made me look forward to working out every evening. The Zumba and CrossFit sessions are pure energy!',
    achievement: 'Toned Core & 9kg Weight Reduction'
  },
  {
    id: 't3',
    memberName: 'Amitabh Saxena',
    locality: 'Vaishali, Sector 4',
    weightLostKg: 14,
    durationMonths: 6,
    rating: 5,
    testimonial: 'Best gym equipment in Ghaziabad by far. Biomechanical movement feels smooth on joints, and free parking is a huge relief after work.',
    achievement: 'Fixed Lower Back Pain & 14kg Fat Loss'
  }
];

export const AMENITIES = [
  {
    iconName: 'Dumbbell',
    title: 'Heavy Free-Weights & Racks',
    description: 'Bumper plates, Olympic barbells, squat racks, and dumbells up to 50kg for serious lifters.'
  },
  {
    iconName: 'Activity',
    title: 'Bio-Mechanic Equipment',
    description: 'Hammer Strength & ISO-Lateral machines designed for optimal biomechanics and peak hypertrophy.'
  },
  {
    iconName: 'Flame',
    title: 'Luxury Steam & Shower Rooms',
    description: 'Hygienic steam bath suites and hot shower facilities for post-workout muscle recovery.'
  },
  {
    iconName: 'ShieldCheck',
    title: 'Functional Turf & CrossFit Arena',
    description: 'Prowler sleds, battle ropes, kettlebells, and plyo boxes on sprint turf.'
  },
  {
    iconName: 'Coffee',
    title: 'IronCore Nutrition Cafe',
    description: 'Fresh protein shakes, pre-workout shots, zero-sugar energy brews, and macro-counted meal bowls.'
  },
  {
    iconName: 'Car',
    title: 'Spacious Valet & Free Parking',
    description: 'Dedicated 24/7 guarded parking zone for cars and two-wheelers with zero hassle.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What are the operating hours of IronCore Fitness Ghaziabad?',
    answer: 'We are open Monday through Saturday from 5:30 AM to 10:30 PM. On Sundays, we operate from 7:00 AM to 12:00 PM for active recovery and cardio sessions.',
    category: 'General'
  },
  {
    question: 'Do you offer a free trial pass for new members in Ghaziabad?',
    answer: 'Yes! We offer a complimentary 3-Day VIP Trial Pass that includes full gym floor access, 1 personal training assessment, and group class entry (Zumba/CrossFit).',
    category: 'Membership'
  },
  {
    question: 'Where is IronCore Fitness located in Ghaziabad?',
    answer: 'Our main facility is located at Plot 12, Main Expressway Road, Indirapuram, Ghaziabad (Uttar Pradesh) - easily accessible from Raj Nagar Extension, Vaishali, and Vasundhara.',
    category: 'Location'
  },
  {
    question: 'Are personal trainers certified and available for beginners?',
    answer: 'Absolutely. All our coaches hold internationally recognized certifications (K-11, ACE, ACSM). Beginners receive a 1-on-1 orientation and customized starter workout plan.',
    category: 'Training'
  },
  {
    question: 'Is parking available at the gym venue?',
    answer: 'Yes, we provide free dedicated covered parking for both cars and bikes with security personnel on site.',
    category: 'Facility'
  }
];
