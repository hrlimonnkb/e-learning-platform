"use client";

import Link from 'next/link';
import { ShoppingBag, Facebook, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const primaryColor = '#4F46E5';
  const textColorPrimary = '#111827';
  const textColorSecondary = '#6B7280';

  return (
    <footer className="w-full py-12 bg-gray-100"> {/* পরিবর্তন এখানে */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* ... (বাকি সব কোড আগের মতোই থাকবে) ... */}
          
          {/* Column 1: Logo & Description */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <ShoppingBag style={{ color: primaryColor }} size={32} />
              <span className="font-bold text-2xl" style={{ color: textColorPrimary }}>
                ই-লার্ণ
              </span>
            </Link>
            <p className="text-sm mb-4" style={{ color: textColorSecondary }}>
              একবার রেজিস্ট্রেশন করে ছোট থেকে ডিজিটাল স্কিল শেখার সহজ ও নির্ভরযোগ্য প্ল্যাটফর্ম।
            </p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1877F2' }}>
                <Facebook size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF0000' }}>
                <Youtube size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white p-2 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0A66C2' }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: লিংক সমূহ (Links) */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: textColorPrimary }}>লিংক সমূহ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>ব্লগ</Link></li>
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>সকল প্রশিক্ষণস্থল</Link></li>
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>শেখানো ট্রাই</Link></li>
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>কোর্স যোগাযোগ</Link></li>
            </ul>
          </div>

          {/* Column 3: কোম্পানি (Company) */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: textColorPrimary }}>কোম্পানি</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>আমাদের সম্পর্কে</Link></li>
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>যোগাযোগ</Link></li>
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>গোপনীয়তা নীতি</Link></li>
              <li><Link href="#" className="hover:underline" style={{ color: textColorSecondary }}>ব্যবহারকারীর শর্তাবলি</Link></li>
            </ul>
          </div>

          {/* Column 4: যোগাযোগ করুন (Contact) */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: textColorPrimary }}>যোগাযোগ করুন</h3>
            <p className="text-sm mb-2" style={{ color: textColorSecondary }}>
              ইমেইল: <a href="mailto:contact@prayojgik.com" className="hover:underline" style={{ color: textColorSecondary }}>contact@prayojgik.com</a>
            </p>
            <p className="text-sm" style={{ color: textColorSecondary }}>
              ঠিকানা: নিউ জুবিলি, ঘর নং ৭০০/৪, সিটি রোড। দেবগ্রামহাট, চট্টগ্রাম-৪৫০০
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200"> {/* পরিবর্তন এখানে */}
          <p className="text-center text-sm" style={{ color: textColorSecondary }}>
            কপিরাইট © ২০২৫, ই-লার্ণ কর্তৃক সর্বস্বত্ত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;