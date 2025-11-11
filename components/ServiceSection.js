"use client"; // স্লাইডার ক্লায়েন্ট সাইডে চলে, তাই এটি জরুরি

import React from 'react';
import Link from 'next/link';
import { AppWindow, LayoutTemplate, TrendingUp, Presentation } from 'lucide-react';

// Swiper-এর কম্পোনেন্ট এবং মডিউল Import করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Swiper-এর CSS Import করুন
import 'swiper/css';
import 'swiper/css/pagination';

/**
 * Reusable Card Component
 */
const ServiceCard = ({ icon, title, description, isHighlighted = false }) => {
  const baseClasses = "rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col space-y-4 h-full"; 
  
  const variantClasses = isHighlighted
    ? "bg-[#f97316] text-white"
    : "bg-white text-gray-900";
  
  const linkClasses = isHighlighted
    ? "text-white"
    : "text-[#f97316]";
  
  const descriptionClasses = isHighlighted 
    ? "text-emerald-50" 
    : "text-gray-600";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="w-14 h-14">{icon}</div>
      <h3 className="text-2xl font-bold pt-2">{title}</h3>
      <p className={`text-base ${descriptionClasses} flex-grow`}>
        {description}
      </p>
      <Link href="#" className={`text-base font-semibold ${linkClasses} pt-2`}>
        আরও জানুন &gt;
      </Link>
    </div>
  );
};

// === কার্ডের ডেটা ===
const servicesData = [
  {
    icon: (
      <div className="bg-white p-3 rounded-xl flex items-center justify-center">
        <AppWindow className="w-8 h-8 text-[#f97316]" />
      </div>
    ),
    title: "ইন্টারঅ্যাকশন ডিজাইন",
    description: "সর্বশেষ ডিজাইন ট্রেন্ড ও উন্নয়নের উপর ভিত্তি করে পাঠ।",
    isHighlighted: true,
  },
  {
    icon: (
      <div className="bg-indigo-100 p-3 rounded-xl flex items-center justify-center">
        <LayoutTemplate className="w-8 h-8 text-indigo-600" />
      </div>
    ),
    title: "ইউএক্স ডিজাইন কোর্স",
    description: "ওয়েব ডেভেলপমেন্টের সাম্প্রতিক অগ্রগতির উপর ভিত্তি করে ক্লাস।",
    isHighlighted: false,
  },
  {
    icon: (
      <div className="bg-pink-100 p-3 rounded-xl flex items-center justify-center">
        <TrendingUp className="w-8 h-8 text-pink-600" />
      </div>
    ),
    title: "ইউজার ইন্টারফেস ডিজাইন",
    description: "ইউজার ইন্টারফেস ডিজাইন শেখার সর্বশেষ কোর্সসমূহ।",
    isHighlighted: false,
  },
  {
    icon: (
      <div className="bg-purple-100 p-3 rounded-xl flex items-center justify-center">
        <Presentation className="w-8 h-8 text-purple-600" />
      </div>
    ),
    title: "প্রেজেন্টেশন স্কিল",
    description: "পাবলিক স্পিকিং ও কার্যকর প্রেজেন্টেশনের কলা আয়ত্ত করুন।",
    isHighlighted: false,
  },
];

/**
 * The Main Service Section Component (Swiper সহ)
 */
const ServiceSection = () => {
  return (
    <section className="py-16 md:py-24 ">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Headings */}
        <p className="text-center text-[#f97316] font-semibold">
          আমাদের সেবা
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold mt-2 mb-12 max-w-2xl mx-auto text-black">
          মজাদার ও আকর্ষণীয় শেখার পরিবেশ গড়ে তুলি
        </h2>
        
        {/* === Swiper Slider === */}
        <Swiper
          modules={[Pagination]} 
          spaceBetween={30} 
          slidesPerView={1} 
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-20!" 
        >
          {/* কার্ড ম্যাপ */}
          {servicesData.map((service, index) => (
            <SwiperSlide key={index} style={{ height: 'auto' }}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                isHighlighted={service.isHighlighted}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* কাস্টম Pagination Dots */}
        <div className="swiper-pagination-custom flex justify-center items-center gap-2 mt-8">
          {/* Swiper.js এই div-টিকে কন্ট্রোল করবে */}
        </div>
        
      </div>
    </section>
  );
};

export default ServiceSection;
