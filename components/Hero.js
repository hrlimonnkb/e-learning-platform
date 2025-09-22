"use client";

import Image from 'next/image';
import Link from 'next/link';
import hero from './hero-img.png'; // আপনার hero image-এর পাথ

const HeroSection = () => {
  const brandGreenColor = 'rgb(76 155 156);color: rgb(255, 255, 255)'; // আপনার সবুজ কালার (উদাহরণ, আপনি আপনার নির্দিষ্ট Hex Code ব্যবহার করবেন)
  const brandPurpleColor = '#4F46E5'; // আপনার বেগুনি কালার
  const textColor = '#FFFFFF'; // সাদা টেক্সট

  return (
    <section 
      className="w-full py-16 md:py-24 lg:py-32" 
      style={{ backgroundColor: brandGreenColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content Column */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-sm uppercase tracking-wide mb-3 opacity-90" style={{ color: 'rgba(255,255,255,0.8)' }}>
            শেখা হোক সহজ
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold leading-tight mb-6">
            ডিজিটাল মার্কেটিং শেখার
            <br />পূর্ণাঙ্গ লার্নিং প্ল্যাটফর্ম
          </h1>
          <p className="text-lg md:text-lg mb-8 opacity-90" style={{ color: 'rgba(255,255,255,0.9)' }}>
            অফলাইন কোর্স, লাইভ ট্রেনিং, ওয়ার্কশপ, বুটক্যাম্প এবং ক্যারিয়ার-ফোকাসড সার্টিফিকেশন
           এক-ছাদের আওতায়। নলেজ, স্কিল ও ক্যারিয়ারে এগিয়ে থাকুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="/courses" 
              className="px-8 py-3 bg-white text-base font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
              style={{ color: brandPurpleColor }} 
            >
              কোর্সগুলো দেখুন
            </Link>
            <Link 
              href="/explore" 
              className="px-8 py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#4F46E5', color: textColor }} // কমলা রঙ ব্যবহার করা হয়েছে
            >
              এখনই এক্সপ্লোর করুন
            </Link>
          </div>
        </div>

        {/* Right Image/Illustration Column */}
        <div className="md:w-1/2 flex justify-center md:justify-end relative">
          {/* এখানে আপনার ইমেজটি বসাতে হবে। আমি একটি প্লেসহোল্ডার ইমেজ ব্যবহার করছি। */}
          {/* আপনার দেওয়া ছবির মতো একটি ভিজ্যুয়াল কনসেপ্ট তৈরি করার জন্য। */}
          {/* আপনার ছবিটা যদি SVG বা PNG হয়, তবে সেটি public ফোল্ডারে রেখে এখানে ব্যবহার করতে পারেন। */}
          <div className="relative w-full  h-auto aspect-video"> {/* এস্পেক্ট রেশিও ঠিক রাখতে */}
            <Image
              src={hero} // আপনার hero image-এর পাথ
              alt="Digital Marketing Learning Platform"
              layout="responsive" // image-কে রেসপন্সিভ করার জন্য
              width={800} // আপনার ইমেজ-এর প্রকৃত ওয়াইড (অপ্টিমাইজেশনের জন্য)
              height={500} // আপনার ইমেজ-এর প্রকৃত হাইট (অপ্টিমাইজেশনের জন্য)
              objectFit="contain" // ছবিটি পুরোপুরি ফ্রেমের মধ্যে রাখার জন্য
              priority // এটি লোড হতে দ্রুত সাহায্য করবে, কারণ এটি উপরের দিকের একটি ইমেজ
            />
            {/* আপনার ছবিটা যদি বিভিন্ন ছোট ছোট ভিডিও/কোর্সের মত হয়, তবে এখানে আরো কাস্টমাইজেশন করা যেতে পারে */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;