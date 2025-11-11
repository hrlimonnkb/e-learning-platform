"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// --- সেকশন ৩: Benefits সেকশনের ডেটা (বাংলায়) ---
const benefitsData = [
  {
    number: "01",
    title: "মানকরণ",
    description: "একটি বৈশ্বিক কর্মক্ষেত্রে কাজ করার সময়, শিক্ষার্থীদের প্রশিক্ষণের প্রয়োজনীয়তা পরিমাপ করা প্রায়শই কঠিন, যা..."
  },
  {
    number: "02",
    title: "খরচ হ্রাস",
    description: "Micro Skill-এর সাথে, মোবাইল লার্নিং এবং মাইক্রো লার্নিং-এর সুবাদে উপকরণ পুনরুত্পাদনের জন্য কোনও খরচ নেই..."
  },
  {
    number: "03",
    title: "অধিক কাস্টমাইজেশন",
    description: "শিক্ষার্থীরা যেমন এক-আকার-ফিট-সব নয়, শেখার অভিজ্ঞতাও এক-আকার-ফিট-সব নয়। এটি সহজেই..."
  },
  {
    number: "04",
    title: "সাশ্রয়ী মূল্য",
    description: "Micro Skill-এর সাথে, মোবাইল লার্নিং এবং মাইক্রো লার্নিং-এর সুবাদে উপকরণ পুনরুত্পাদনের জন্য কোনও খরচ নেই..."
  },
  {
    number: "05",
    title: "শিক্ষার্থীর সন্তুষ্টি",
    description: "শিক্ষার্থীরা যা শেখে তার সাথে যদি তারা সম্পর্ক স্থাপন করতে না পারে, তবে তারা উচ্চ সন্তুষ্টির হারের লক্ষ্য রাখে। কিন্তু..."
  },
  {
    number: "06",
    title: "মাল্টিমিডিয়া উপকরণ",
    description: "ই-লার্নিং কার্যকর হওয়ার অন্যতম প্রধান কারণ হলো এটি... এর জন্য নিখুঁত ডেলিভারি পদ্ধতি।"
  },
];

// --- Benefits কার্ডের জন্য একটি ছোট কম্পোনেন্ট (বাংলায়) ---
const BenefitCard = ({ number, title, description }) => {
  return (
    <div>
      <p className="text-7xl lg:text-8xl font-bold text-[#f97316]">
        {number}
      </p>
      <h3 className="text-2xl font-bold text-gray-900 mt-4">
        {title}
      </h3>
      <p className="text-base text-gray-600 mt-3">
        {description}
        <Link href="#" className="text-[#f97316] font-semibold hover:underline ml-1">
          আরও পড়ুন
        </Link>
      </p>
    </div>
  );
};


// --- মূল About Us পেজ কম্পোনেন্ট (বাংলায়) ---
const AboutUsPage = () => {
  return (
    <main>
      
      {/* ========== সেকশন ১: About Us (বাংলায়) ========== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* বাম কলাম: টেক্সট */}
          <div>
            <p className="text-4xl font-bold text-[#c2570c]">
              আমাদের সম্পর্কে
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              <span className="text-orange-500">Micro Skill</span> বিশ্বজুড়ে শিক্ষার্থীদের সেরা সুযোগ প্রদান করছে।
            </h1>
            <p className="text-lg text-gray-600 mt-6">
              Micro Skill বাংলাদেশের  একটি অনলাইন প্রশিক্ষণ একাডেমি, যা ব্যবহারকারীর অভিজ্ঞতা এবং ব্যবহারকারী ইন্টারফেস প্রশিক্ষণ ও গবেষণার সাথে জড়িত। এটি ২০২৫   সালে শুরু হয়েছিল এবং ইউজার ইন্টারফেস ডিজাইন, ইউজার এক্সপেরিয়েন্স ডিজাইন, হিউম্যান কম্পিউটার ইন্টারঅ্যাকশন ডিজাইনের প্রতি আগ্রহী। UI/UX ডিজাইনের ক্ষেত্রে সেরা কোর্স এবং লাইভ প্রজেক্টের মাধ্যমে শিক্ষার্থীদের দক্ষতা শক্তিশালী করে তাদের উজ্জ্বল ভবিষ্যতের জন্য প্রস্তুত করাই আমাদের লক্ষ্য।
            </p>
            <Link 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f97316] text-white font-semibold mt-8 transition-all duration-300 hover:bg-[#c2570c]"
            >
              যোগ দিন
              <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* ডান কলাম: ছবি */}
          <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <div className="ml-auto w-11/12">
              <Image
                src="/assets/Rectangle13.png" 
                alt="অফিসের ভেতরের ছবি"
                width={500}
                height={300}
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </div>
            <div className="mr-auto w-11/12">
              <Image
                src="/assets/Rectangle14.png" 
                alt="ডেস্কের উপর ল্যাপটপ"
                width={500}
                height={300}
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== সেকশন ২: Features (বাংলায়) ========== */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* বাম কলাম: ছবি (md অর্ডারে প্রথমে) */}
          <div className="md:order-1">
            <Image
              src="/assets/SectionImg.png" 
              alt="রঙিন লাইটবাল্ব"
              width={500}
              height={700}
              className="rounded-xl shadow-lg object-cover w-full h-full"
            />
          </div>

          {/* ডান কলাম: টেক্সট (md অর্ডারে শেষে) */}
          <div className="md:order-2">
            <p className="text-cyan-600 font-semibold uppercase">
              বৈশিষ্ট্য
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              আমরা আপনাকে সব দিক থেকে সেরা বৈশিষ্ট্যগুলি সরবরাহ করতে সর্বদা কাজ করে যাচ্ছি।
            </h2>
            <div className="text-lg text-gray-600 mt-6 space-y-5">
              <p>
                Micro Skill-এ আমাদের প্রধান সংকল্প হলো শিক্ষার্থীদের তাদের লক্ষ্য সম্পর্কে স্পষ্ট ধারণা দেওয়া, তাদের উচ্চাকাঙ্ক্ষার প্রতি আত্মবিশ্বাসী করে তোলা এবং সময়ের সাথে তাদের যাত্রায় অবিচল থাকতে উৎসাহিত করা।
              </p>
              <p>
                আপনি ইন্টারনেটে প্রতিটি ছোট জিনিস একটি ক্লিকের মাধ্যমে খুঁজে পাবেন, কিন্তু আমরা এখানে জ্ঞান এবং অনুশীলনের প্রশংসা করি, যা ছাড়া ইন্টারনেটও আপনার জীবনে ব্যর্থ হতে পারে।
              </p>
            </div>
            <Link 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f97316] text-white font-semibold mt-8 transition-all duration-300 hover:bg-[#c2570c]"
            >
              আরও জানুন
              <ArrowRight size={18} />
            </Link>
          </div>
          
        </div>
      </section>

      {/* ========== সেকশন ৩: Benefits (বাংলায়) ========== */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* উপরের টেক্সট (Centered) */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-cyan-600 font-semibold uppercase">
              আমাদের সুবিধাসমূহ
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              Micro Skill প্ল্যাটফর্মে যোগদানের মাধ্যমে, আপনি অনেক সুবিধা পেতে পারেন।
            </h2>
            <p className="text-lg text-gray-600 mt-6">
              আপনার ই-কমার্স সাইটে আমাদের শীর্ষ-রেটেড ড্রপশিপিং অ্যাপটি ইনস্টল করুন এবং ইউএস সরবরাহকারী, AliExpress ভ্যারিয়েশন এবং সেরা সুবিধাগুলো পান।
            </p>
          </div>
          
          {/* Benefits গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {benefitsData.map((benefit) => (
              <BenefitCard
                key={benefit.number}
                number={benefit.number}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
          
        </div>
      </section>

    </main>
  );
};

export default AboutUsPage;