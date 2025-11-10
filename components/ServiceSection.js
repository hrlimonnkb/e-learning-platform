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
 * (এই কম্পোনেন্টটি অপরিবর্তিত আছে)
 * @param {object} props
 * ... (বাকি props)
 */
const ServiceCard = ({ icon, title, description, isHighlighted = false }) => {
  const baseClasses = "rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col space-y-4 h-full"; // h-full যোগ করা হয়েছে
  
  const variantClasses = isHighlighted
    ? "bg-emerald-600 text-white"
    : "bg-white text-gray-900";
  
  const linkClasses = isHighlighted
    ? "text-white"
    : "text-emerald-600";
  
  const descriptionClasses = isHighlighted 
    ? "text-emerald-50" 
    : "text-gray-600";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <div className="w-14 h-14">{icon}</div>
      <h3 className="text-2xl font-bold pt-2">{title}</h3>
      <p className={`text-base ${descriptionClasses} flex-grow`}> {/* flex-grow যোগ করা হয়েছে */}
        {description}
      </p>
      <Link href="#" className={`text-base font-semibold ${linkClasses} pt-2`}>
        Learn More &gt;
      </Link>
    </div>
  );
};

// === কার্ডের ডেটা ===
// আমরা ডেটা একটি অ্যারেতে রাখব যাতে স্লাইডার সহজে ম্যাপ করতে পারে
const servicesData = [
  {
    icon: (
      <div className="bg-white p-3 rounded-xl flex items-center justify-center">
        <AppWindow className="w-8 h-8 text-emerald-600" />
      </div>
    ),
    title: "Interaction Design",
    description: "Lessons on design that cover the most recent developments.",
    isHighlighted: true,
  },
  {
    icon: (
      <div className="bg-indigo-100 p-3 rounded-xl flex items-center justify-center">
        <LayoutTemplate className="w-8 h-8 text-indigo-600" />
      </div>
    ),
    title: "UX Design Course",
    description: "Classes in development that cover the most recent advancements in web.",
    isHighlighted: false,
  },
  {
    icon: (
      <div className="bg-pink-100 p-3 rounded-xl flex items-center justify-center">
        <TrendingUp className="w-8 h-8 text-pink-600" />
      </div>
    ),
    title: "User Interface Design",
    description: "User Interface Design courses that cover the most recent trends.",
    isHighlighted: false,
  },
  {
    icon: (
      <div className="bg-purple-100 p-3 rounded-xl flex items-center justify-center">
        <Presentation className="w-8 h-8 text-purple-600" />
      </div>
    ),
    title: "Presentation Skills",
    description: "Master the art of public speaking and effective presentation.",
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
        <p className="text-center text-emerald-600 font-semibold">
          Our Services
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold mt-2 mb-12 max-w-2xl mx-auto text-black">
          Fostering a playful & engaging learning environment
        </h2>
        
        {/* === আপডেটেড: Swiper Slider === */}
        <Swiper
          modules={[Pagination]} // Pagination মডিউলটি যোগ করুন
          spaceBetween={30} // কার্ডগুলোর মধ্যে স্পেস
          slidesPerView={1} // মোবাইলে ডিফল্টভাবে ১টি দেখাবে
          pagination={{
            clickable: true, // ডট-এ ক্লিক করা যাবে
            el: '.swiper-pagination-custom', // কাস্টম ডট ব্যবহারের জন্য
          }}
          breakpoints={{
            // 768px (md) থেকে বড় হলে ২টি দেখাবে
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // 1024px (lg) থেকে বড় হলে ৩টি দেখাবে
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="pb-20!" 
        
        >
          {/* কার্ডের ডেটা ম্যাপ করে SwiperSlide তৈরি করুন */}
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

        {/* কাস্টম Pagination Dots (আপনার ছবির মতো) */}
        <div className="swiper-pagination-custom flex justify-center items-center gap-2 mt-8">
          {/* Swiper.js এই div-টিকে কন্ট্রোল করবে */}
        </div>
        
      </div>
    </section>
  );
};

export default ServiceSection;