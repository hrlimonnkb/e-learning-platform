"use client";

import React from 'react';
import Image from 'next/image';

// Swiper-এর কম্পোনেন্ট এবং মডিউল Import করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // Autoplay যোগ করা হয়েছে

// Swiper-এর CSS Import করুন
import 'swiper/css';
import 'swiper/css/pagination';

// --- Demo Data ---
// !! Replace logoSrc and avatar paths with your actual image paths in /public
const testimonialsData = [
  {
    id: 1,
    logoSrc: "/logo.png", // !! আপনার লোগোর পাথ দিন
    quote: "Courses was fantastic! It is Master platform for those looking to start a new career, or need a refresher.",
    avatarSrc: "/assets/Image(4).png", // !! আপনার অ্যাভার্টারের পাথ দিন
    name: "Jacob Jones",
    title: "Student, National University",
  },
  {
    id: 2,
    logoSrc: "/logo.png", // !! আপনার লোগোর পাথ দিন
    quote: "Weekend UX transformed my career path. The instructors are top-notch and the content is incredibly relevant.",
    avatarSrc: "/assets/Image(5).png", // !! আপনার অ্যাভার্টারের পাথ দিন
    name: "Jane Smith",
    title: "Product Designer, Tech Corp",
  },
  {
    id: 3,
    logoSrc: "/logo.png", // !! আপনার লোগোর পাথ দিন
    quote: "A truly engaging learning environment. I highly recommend Weekend UX to anyone serious about design.",
    avatarSrc: "/assets/Image(6).png", // !! আপনার অ্যাভার্টারের পাথ দিন
    name: "Emily White",
    title: "UX Researcher, Global Innovations",
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
          modules={[Pagination, Autoplay]} // Pagination এবং Autoplay মডিউল যোগ করুন
          spaceBetween={30} // স্লাইডগুলোর মধ্যে স্পেস
          slidesPerView={1} // সবসময় 1টি স্লাইড দেখাবে
          loop={true} // লুপ মোড চালু করুন
          autoplay={{
            delay: 5000, // 5 সেকেন্ড পর পর স্লাইড পরিবর্তন হবে
            disableOnInteraction: false, // ইউজার ক্লিক করলেও অটোপ্লে বন্ধ হবে না
          }}
          pagination={{
            el: '.swiper-pagination-testimonial', // কাস্টম ডট ব্যবহারের জন্য
            clickable: true, // ডট-এ ক্লিক করা যাবে
          }}
          className="pb-16!" // ডট-এর জন্য নিচে প্যাডিং
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-lg">
                
                {/* Logo */}
                <Image
                  src={testimonial.logoSrc}
                  alt="Weekend UX Logo"
                  width={100} // লোগোর সাইজ আপনার ছবির সাথে মিলিয়ে দিন
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
          {/* Swiper.js will populate this */}
        </div>
        
      </div>
    </section>
  );
};

export default TestimonialSection;