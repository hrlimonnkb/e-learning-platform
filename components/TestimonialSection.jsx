"use client";

import React from 'react';
import Image from 'next/image';

// Swiper-এর কম্পোনেন্ট এবং মডিউল Import করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper-এর CSS Import করুন
import 'swiper/css';
import 'swiper/css/pagination';

// --- ডেমো ডেটা (বাংলায় অনুবাদিত) ---
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
    quote: "Weekend UX আমার ক্যারিয়ার পরিবর্তন করেছে। প্রশিক্ষকরা অসাধারণ এবং কনটেন্টটি অত্যন্ত প্রাসঙ্গিক।",
    avatarSrc: "/assets/Image(5).png",
    name: "জেন স্মিথ",
    title: "প্রোডাক্ট ডিজাইনার, টেক কর্প",
  },
  {
    id: 3,
    logoSrc: "/logo.png",
    quote: "একটি সত্যিকারের আকর্ষণীয় শেখার পরিবেশ। যারা ডিজাইনে সিরিয়াস, তাদের জন্য Weekend UX অত্যন্ত সুপারিশযোগ্য।",
    avatarSrc: "/assets/Image(6).png",
    name: "এমিলি হোয়াইট",
    title: "UX রিসার্চার, গ্লোবাল ইনোভেশন্স",
  },
];

/**
 * The Main Testimonial Section Component
 */
const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-teal-50">
      <div className="container mx-auto px-4">
        
        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.swiper-pagination-testimonial',
            clickable: true,
          }}
          className="pb-16!"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-lg">
                
                {/* Logo */}
                <Image
                  src={testimonial.logoSrc}
                  alt="Weekend UX Logo"
                  width={100}
                  height={30}
                  className="mx-auto h-8 w-auto mb-8"
                />

                {/* Quote */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight md:leading-snug mt-4">
                  {testimonial.quote}
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
        
        {/* Custom Pagination Dots */}
        <div className="swiper-pagination-testimonial flex justify-center items-center gap-2 mt-8">
          {/* Swiper.js এখানে ডট বসাবে */}
        </div>
        
      </div>
    </section>
  );
};

export default TestimonialSection;
