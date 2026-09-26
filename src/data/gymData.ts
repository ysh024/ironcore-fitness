import { MembershipTier, ScheduleItem, TrainerProfile, TransformationStory, FAQItem } from '../types';

export const LOCALITIES = [
  'Indirapuram',
  'Raj Nagar Extension',
  'Vaishali'
] as const;

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'monthly',
    name: '1 Month Starter',
    duration: '1 Month',
    priceINR: 2499,
    originalPriceINR: 3499,
    tagline: 'Best for beginners & short trial workout',
    perks: [
      'Full Gym Floor Access (5:30 AM - 10:30 PM)',
      '1 Free Personal Trainer Session & Guide',
      'Cardio Deck & Heavy Dumbbells Access',
      'Locker & Steam Bath Facility',
      'Free Body Fat & Weight Analysis'
    ]
  },
  {
    id: 'quarterly',
    name: '3 Month Transformation',
    duration: '3 Months',
    priceINR: 5999,
    originalPriceINR: 8499,
    isPopular: true,
    tagline: 'Most popular plan for fat loss & muscle building',
    perks: [
      'Everything in 1 Month Plan',
      'Unlimited Steam Bath & Hot Shower',
      'Personalized Diet & Workout Chart',
      'Free Access to Zumba & CrossFit Classes',
      '2 Free Guest Passes per Month',
      'Free Gym Shaker Bottle'
    ]
  },
  {
    id: 'half-yearly',
    name: '6 Month Pro Fit',
    duration: '6 Months',
    priceINR: 9999,
    originalPriceINR: 14999,
    tagline: 'Great savings for serious fitness lovers',
    perks: [
      'Everything in 3 Month Plan',
      'Dedicated Personal Locker',
      'Weekly Weight & Body Composition Check',
      'Unlimited Group Yoga, HIIT & CrossFit',
      'Freeze Membership for up to 21 Days',
      '10% Discount at Gym Health Bar'
    ]
  },
  {
    id: 'annual',
    name: '1 Year Ultimate Pass',
    duration: '12 Months',
    priceINR: 14999,
    originalPriceINR: 23999,
    tagline: 'Lowest monthly rate with maximum benefits',
    perks: [
      'Everything in 6 Month Plan',
      '4 Free Personal Trainer Sessions every Month',
      'Permanent Executive Locker',
      'Freeze Membership for up to 45 Days',
      'Free Family Discount Pass (20% Off)',
      'Complimentary Gym Kit Bag & Accessories'
    ]
  }
];

export const SCHEDULE_DATA: ScheduleItem[] = [
  // Monday
  { id: 'm1', day: 'Monday', timeSlot: '06:00 AM - 07:00 AM', className: 'Morning Yoga & Stretching', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },
  { id: 'm2', day: 'Monday', timeSlot: '07:30 AM - 08:30 AM', className: 'CrossFit & Turf Workout', category: 'CrossFit', trainerName: 'Vikram Singh', intensity: 'High' },
  { id: 'm3', day: 'Monday', timeSlot: '06:00 PM - 07:00 PM', className: 'Bollywood Zumba Dance', category: 'Zumba', trainerName: 'Neha Verma', intensity: 'Medium' },
  { id: 'm4', day: 'Monday', timeSlot: '07:30 PM - 08:30 PM', className: 'Chest & Triceps Strength', category: 'Strength', trainerName: 'Vikram Singh', intensity: 'High' },

  // Tuesday
  { id: 't1', day: 'Tuesday', timeSlot: '06:30 AM - 07:30 AM', className: 'Fat Burn HIIT Workout', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'High' },
  { id: 't2', day: 'Tuesday', timeSlot: '08:00 AM - 09:00 AM', className: 'Power Lifting & Squats', category: 'Strength', trainerName: 'Kabir Rawat', intensity: 'High' },
  { id: 't3', day: 'Tuesday', timeSlot: '06:30 PM - 07:30 PM', className: 'Back & Biceps Training', category: 'Strength', trainerName: 'Vikram Singh', intensity: 'Medium' },
  { id: 't4', day: 'Tuesday', timeSlot: '08:00 PM - 09:00 PM', className: 'Abs & Core Workout', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'All Levels' },

  // Wednesday
  { id: 'w1', day: 'Wednesday', timeSlot: '06:00 AM - 07:00 AM', className: 'Power Yoga & Flexibility', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },
  { id: 'w2', day: 'Wednesday', timeSlot: '07:30 AM - 08:30 AM', className: 'Functional Conditioning', category: 'CrossFit', trainerName: 'Kabir Rawat', intensity: 'High' },
  { id: 'w3', day: 'Wednesday', timeSlot: '06:00 PM - 07:00 PM', className: 'Energy Zumba Fitness', category: 'Zumba', trainerName: 'Neha Verma', intensity: 'Medium' },
  { id: 'w4', day: 'Wednesday', timeSlot: '07:30 PM - 08:30 PM', className: 'Legs & Lower Body Workout', category: 'Strength', trainerName: 'Vikram Singh', intensity: 'High' },

  // Thursday
  { id: 'th1', day: 'Thursday', timeSlot: '06:30 AM - 07:30 AM', className: 'Bodyweight & Calisthenics', category: 'CrossFit', trainerName: 'Ananya Sharma', intensity: 'Medium' },
  { id: 'th2', day: 'Thursday', timeSlot: '08:00 AM - 09:00 AM', className: 'Shoulders & Arms Blast', category: 'Strength', trainerName: 'Kabir Rawat', intensity: 'High' },
  { id: 'th3', day: 'Thursday', timeSlot: '06:30 PM - 07:30 PM', className: 'Stamina Cardio Circuit', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'High' },
  { id: 'th4', day: 'Thursday', timeSlot: '08:00 PM - 09:00 PM', className: 'Relaxation & Stretch Yoga', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },

  // Friday
  { id: 'f1', day: 'Friday', timeSlot: '06:00 AM - 07:00 AM', className: 'Heavy Duty CrossFit', category: 'CrossFit', trainerName: 'Vikram Singh', intensity: 'High' },
  { id: 'f2', day: 'Friday', timeSlot: '07:30 AM - 08:30 AM', className: 'Treadmill & Cardio Challenge', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'Medium' },
  { id: 'f3', day: 'Friday', timeSlot: '06:00 PM - 07:00 PM', className: 'Friday Zumba Party', category: 'Zumba', trainerName: 'Neha Verma', intensity: 'All Levels' },
  { id: 'f4', day: 'Friday', timeSlot: '07:30 PM - 08:30 PM', className: 'Full Body Weight Training', category: 'Strength', trainerName: 'Kabir Rawat', intensity: 'High' },

  // Saturday
  { id: 's1', day: 'Saturday', timeSlot: '07:00 AM - 08:30 AM', className: 'Weekend Warrior Challenge', category: 'CrossFit', trainerName: 'Vikram Singh', intensity: 'High' },
  { id: 's2', day: 'Saturday', timeSlot: '05:00 PM - 06:30 PM', className: 'Full Body Mobility & Yoga', category: 'Yoga', trainerName: 'Priya Sharma', intensity: 'All Levels' },

  // Sunday
  { id: 'sun1', day: 'Sunday', timeSlot: '08:00 AM - 10:00 AM', className: 'Light Cardio & Active Recovery', category: 'Cardio', trainerName: 'Ananya Sharma', intensity: 'All Levels' }
];

export const TRAINERS: TrainerProfile[] = [
  {
    id: 'vikram-singh',
    name: 'Vikram Singh',
    title: 'Head Gym Coach & Trainer',
    certification: 'Certified K-11 Strength & Fitness Specialist',
    experienceYears: 12,
    specialties: ['Muscle Building', 'Weight Loss', 'Posture & Core'],
    image: '/images/ironcore_trainer.jpg',
    quote: 'Fitness is not a temporary task; build a daily habit and results will naturally follow.'
  },
  {
    id: 'ananya-sharma',
    name: 'Ananya Sharma',
    title: 'Fat Loss & HIIT Trainer',
    certification: 'ACE Certified Trainer & CrossFit Coach',
    experienceYears: 7,
    specialties: ['Fat Loss', 'Zumba & HIIT', 'Female Fitness'],
    image: '/images/ironcore_transformation.jpg',
    quote: 'Small steps every single day lead to big transformations. Show up for yourself!'
  },
  {
    id: 'kabir-rawat',
    name: 'Kabir Rawat',
    title: 'Senior Strength & Bodybuilding Coach',
    certification: 'Gold Medalist Lifter & ACSM Certified',
    experienceYears: 9,
    specialties: ['Strength Training', 'Bodybuilding', 'Diet & Nutrition'],
    image: '/images/ironcore_hero.jpg',
    quote: 'Lift right, eat healthy, and sleep well. Consistency creates genuine strength.'
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
    testimonial: 'IronCore Gym helped me lose 18kg in 5 months! As an IT professional working late hours, Coach Vikram gave me a simple routine that fit my schedule. Feeling active and healthy now.',
    achievement: 'Lost 18kg Fat & Built Muscle'
  },
  {
    id: 't2',
    memberName: 'Sneha Gupta',
    locality: 'Raj Nagar Extension',
    muscleGainedKg: 4.5,
    weightLostKg: 9,
    durationMonths: 4,
    rating: 5,
    testimonial: 'Clean steam bath, friendly gym trainers, and amazing Zumba classes. Working out here after office is the highlight of my day!',
    achievement: 'Lost 9kg & Toned Physique'
  },
  {
    id: 't3',
    memberName: 'Amitabh Saxena',
    locality: 'Vaishali, Ghaziabad',
    weightLostKg: 14,
    durationMonths: 6,
    rating: 5,
    testimonial: 'Best gym equipment in Ghaziabad. Very supportive staff, smooth machine movements, and free parking space.',
    achievement: 'Relieved Back Pain & 14kg Fat Loss'
  }
];

export const AMENITIES = [
  {
    iconName: 'Dumbbell',
    title: 'Heavy Dumbbells & Free Weights',
    description: 'Complete range of dumbbells up to 50kg, Olympic barbells, and squat racks for all lifters.'
  },
  {
    iconName: 'Activity',
    title: 'Imported Biomechanical Machines',
    description: 'Smooth and safe machines designed to target target muscles effectively without joint strain.'
  },
  {
    iconName: 'Flame',
    title: 'Clean Steam Bath & Hot Showers',
    description: 'Hygienic steam bath rooms and fresh hot showers for complete muscle relaxation.'
  },
  {
    iconName: 'ShieldCheck',
    title: 'CrossFit & Functional Turf Zone',
    description: 'Battle ropes, kettlebells, box jumps, and turf area for stamina and fat burn.'
  },
  {
    iconName: 'Coffee',
    title: 'Protein Bar & Healthy Cafe',
    description: 'Fresh protein shakes, pre-workout drinks, and healthy post-workout snacks.'
  },
  {
    iconName: 'Car',
    title: 'Free Guarded Car & Bike Parking',
    description: 'Safe and spacious free parking area for cars and two-wheelers right at the gym premises.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What are the gym timings in Ghaziabad?',
    answer: 'We are open Monday to Saturday from 5:30 AM to 10:30 PM. On Sundays, we are open from 7:00 AM to 12:00 PM for active cardio & recovery.',
    category: 'General'
  },
  {
    question: 'How do I get a Free 3-Day Trial Pass?',
    answer: 'Simply click "Book Free 3-Day Pass" or call us at 9718871979. You get full access to the gym floor, 1 free trainer consultation, and group classes for 3 days.',
    category: 'Membership'
  },
  {
    question: 'Where are your 3 branches located in Ghaziabad?',
    answer: 'We have 3 convenient branches across Ghaziabad: 1) Indirapuram (Main Branch, Plot 12 Expressway), 2) Raj Nagar Extension, and 3) Vaishali.',
    category: 'Location'
  },
  {
    question: 'Do you provide personal trainers for beginners?',
    answer: 'Yes! All our trainers are certified and beginner-friendly. Every new member receives a free 1-on-1 orientation and workout plan.',
    category: 'Training'
  },
  {
    question: 'Is free parking available for members?',
    answer: 'Yes, all our branches offer free dedicated parking space for both cars and motorcycles.',
    category: 'Facility'
  }
];

