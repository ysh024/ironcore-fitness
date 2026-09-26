import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ironcorefitness.in'),
  title: 'IronCore Fitness Ghaziabad | Premier Gym, CrossFit & Personal Training',
  description: 'Join IronCore Fitness in Ghaziabad (Indirapuram, Raj Nagar Ext, Vaishali). World-class biomechanic equipment, certified personal trainers, steam bath & free trial passes.',
  keywords: [
    'gym in Ghaziabad',
    'best gym in Indirapuram',
    'personal trainer Ghaziabad',
    'CrossFit Raj Nagar Extension',
    'gym with steam bath Vaishali',
    'fitness trial class Indirapuram',
    'IronCore Fitness'
  ],
  authors: [{ name: 'IronCore Fitness Team' }],
  openGraph: {
    title: 'IronCore Fitness Ghaziabad | Elite Strength & Conditioning',
    description: 'Transform your body with certified coaches, luxury amenities, heavy free weights & group fitness in Ghaziabad.',
    url: 'https://ironcorefitness.in',
    siteName: 'IronCore Fitness Ghaziabad',
    images: [
      {
        url: '/images/ironcore_hero.jpg',
        width: 1200,
        height: 630,
        alt: 'IronCore Fitness Gym Floor Ghaziabad',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Structured Data Schema (JSON-LD) for Ghaziabad Local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    'name': 'IronCore Fitness Gym Ghaziabad',
    'image': 'https://ironcorefitness.in/images/ironcore_hero.jpg',
    'telephone': '+91-9718871979',
    'priceRange': '₹₹',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Plot 12, Main Expressway Road, Indirapuram',
      'addressLocality': 'Ghaziabad',
      'addressRegion': 'Uttar Pradesh',
      'postalCode': '201014',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 28.6415,
      'longitude': 77.3714
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '05:30',
        'closes': '22:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '07:00',
        'closes': '12:00'
      }
    ],
    'sameAs': [
      'https://www.instagram.com/ironcore_ghaziabad',
      'https://www.facebook.com/ironcorefitnessghaziabad'
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#080c14] text-gray-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}
