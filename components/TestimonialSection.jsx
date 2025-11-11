"use client";

import React from 'react';
import Image from 'next/image';

// Swiper-এর কম্পোনেন্ট এবং মডিউল Import করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 

// Swiper-এর CSS Import করুন
import 'swiper/css';

// --- ডেমো ডেটা (অপরিবর্তিত) ---
const testimonialsData = [
  {
    id: 1,
    logoSrc: "/logo.png",
    quote: "এই কোর্সটি অসাধারণ! যারা নতুন ক্যারিয়ার শুরু করতে চান বা পুরনো জ্ঞান ঝালিয়ে নিতে চান তাদের জন্য এটি একটি দারুণ প্ল্যাটফর্ম।",
    avatarSrc: "/assets/Image(4).png",
    name: "জ্যাকব জোন্স",
    title: "শিক্ষার্থী, ন্যাশনাল ইউনিভার্সিটি",
  },
  {
    id: 2,
    logoSrc: "/logo.png",
    quote: "Micro Skill আমার ক্যারিয়ার পরিবর্তন করেছে। প্রশিক্ষকরা অসাধারণ এবং কনটেন্টটি অত্যন্ত প্রাসঙ্গিক।",
    avatarSrc: "/assets/Image(5).png",
    name: "জেন স্মিথ",
    title: "প্রোডাক্ট ডিজাইনার, টেক কর্প",
  },
  {
    id: 3,
    logoSrc: "/logo.png",
    quote: "একটি সত্যিকারের আকর্ষণীয় শেখার পরিবেশ। যারা ডিজাইনে সিরিয়াস, তাদের জন্য Micro Skill অত্যন্ত সুপারিশযোগ্য।",
    avatarSrc: "/assets/Image(6).png",
    name: "এমিলি হোয়াইট",
    title: "UX রিসার্চার, গ্লোবাল ইনোভেশন্স",
  },
  {
    id: 4,
    logoSrc: "/logo.png",
    quote: "প্রশিক্ষকরা অসাধারণ এবং কনটেন্টটি অত্যন্ত প্রাসঙ্গিক।",
    avatarSrc: "/assets/Image(4).png",
    name: "আরিফ হোসেন",
    title: "ফ্রিল্যান্স ডিজাইনার",
  },
   {
    id: 5,
    logoSrc: "/logo.png",
    quote: "এই কোর্সটি অসাধারণ! যারা নতুন ক্যারিয়ার শুরু করতে চান বা পুরনো জ্ঞান ঝালিয়ে নিতে চান তাদের জন্য এটি একটি দারুণ প্ল্যাটফর্ম।",
    avatarSrc: "/assets/Image(4).png",
    name: "জ্যাকব জোন্স",
    title: "শিক্ষার্থী, ন্যাশনাল ইউনিভার্সিটি",
  },
  {
    id: 6,
    logoSrc: "/logo.png",
    quote: "Micro Skill আমার ক্যারিয়ার পরিবর্তন করেছে। প্রশিক্ষকরা অসাধারণ এবং কনটেন্টটি অত্যন্ত প্রাসঙ্গিক।",
    avatarSrc: "/assets/Image(5).png",
    name: "জেন স্মিথ",
    title: "প্রোডাক্ট ডিজাইনার, টেক কর্প",
  },
  {
    id: 7,
    logoSrc: "/logo.png",
    quote: "একটি সত্যিকারের আকর্ষণীয় শেখার পরিবেশ। যারা ডিজাইনে সিরিয়াস, তাদের জন্য Micro Skill অত্যন্ত সুপারিশযোগ্য।",
    avatarSrc: "/assets/Image(6).png",
    name: "এমিলি হোয়াইট",
    title: "UX রিসার্চার, গ্লোবাল ইনোভেশন্স",
  },
  {
    id: 8,
    logoSrc: "/logo.png",
    quote: "প্রশিক্ষকরা অসাধারণ এবং কনটেন্টটি অত্যন্ত প্রাসঙ্গিক।",
    avatarSrc: "/assets/Image(4).png",
    name: "আরিফ হোসেন",
    title: "ফ্রিল্যান্স ডিজাইনার",
  },
];

/**
 * The Main Testimonial Section Component
 */
const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-100 to-orange-200 overflow-hidden">
      
      {/* --- কাস্টম CSS --- */}
      <style jsx global>{`
        .testimonial-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
      {/* --- কাস্টম CSS শেষ --- */}

      <div> 
        
        {/* Swiper Slider (আপডেটেড) */}
        <Swiper
          modules={[Autoplay]} 
          className="testimonial-swiper" 
          loop={true}
          spaceBetween={30}
          slidesPerView={'auto'} 
          speed={8000} // <-- স্পিড ঠিক রাখুন
          autoplay={{
            delay: 0, // <-- 0ms delay
            disableOnInteraction: false,
            // --- পরিবর্তন ---
            // pauseOnMouseEnter: true, <-- এই লাইনটি মুছে ফেলা হয়েছে
            // --- পরিবর্তন শেষ ---
          }}
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide 
              key={testimonial.id} 
              className="!w-[380px] h-auto p-4" 
            >
              <div className="bg-white rounded-3xl p-8 text-center shadow-lg h-full flex flex-col">
                
                {/* Logo */}
                <Image
                  src={testimonial.logoSrc}
                  alt="Micro Skill Logo"
                  width={100}
                  height={30}
                  className="mx-auto h-8 w-auto mb-8"
                />

                {/* Quote */}
                <h2 className="text-2xl font-bold text-gray-900 leading-tight mt-4 flex-grow">
                  "{testimonial.quote}"
                </h2>

                {/* Avatar */}
                <Image
                  src={testimonial.avatarSrc}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover mx-auto mt-10 shadow-md"
                />

                {/* Name and Title */}
                <p className="text-xl font-bold text-gray-900 mt-4">
                  {testimonial.name}
                </p>
                <p className="text-base text-gray-600 mt-1">
                  {testimonial.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
};

export default TestimonialSection;