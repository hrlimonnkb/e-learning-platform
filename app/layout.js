import { Inter } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';


const inter = Inter({ subsets: ['latin'] });

// --- এখানে মেটাডেটা যোগ করা হয়েছে ---
export const metadata = {
  // আপনার সাইটের আসল নাম দিন
  title: {
    default: 'Microskills', // ডিফল্ট টাইটেল
    template: '%s | Microskills', // অন্য পেজগুলো এভাবে টাইটেল দেখাবে (e.g., "About Us | Microskills")
  },
  // আপনার সাইটের বর্ণনা দিন
  description: 'Microskills থেকে সেরা কোর্সগুলো করে আপনার দক্ষতা বৃদ্ধি করুন এবং লক্ষ্যে পৌঁছান।',
  // কিছু কীওয়ার্ড
  keywords: ['microskills', 'bangla course', 'online learning', 'skill development', 'IT course'],
  // আপনার সাইটের লেখকের নাম
  authors: [{ name: 'Microskills Team', url: 'https://yourwebsite.com' }], // আপনার ডোমেইন দিন
  
  // --- সোশ্যাল মিডিয়া শেয়ারের জন্য (Open Graph) ---
  openGraph: {
    title: 'Microskills - আপনার দক্ষতার প্রবেশদ্বার',
    description: 'সেরা কোর্সগুলো করে আপনার দক্ষতা বৃদ্ধি করুন।',
    url: 'https://yourwebsite.com', // আপনার ডোমেইন দিন
    siteName: 'Microskills',
    images: [
      {
        url: '/og-image.png', // আপনার সাইটের একটি প্রিভিউ ইমেজ (public ফোল্ডারে রাখবেন)
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  
  // --- অন্যান্য ---
  robots: { // SEO-এর জন্য
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: { // ফেভিকন
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // manifest: '/site.webmanifest', // আপনার PWA manifest (যদি থাকে)
};
// --- মেটাডেটা শেষ ---


export default function RootLayout({ children }) {
  return (
    <html lang="bn"> {/* আপনার ভাষা ঠিকই আছে */}
      <body className={inter.className}>
        {/* ধাপ ২-এর কম্পোনেন্টটি এখানে রেন্ডার হবে */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}