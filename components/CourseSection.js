"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Star, MoveRight } from 'lucide-react';

// Swiper-এর কম্পোনেন্ট এবং মডিউল Import করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Swiper-এর CSS Import করুন
import 'swiper/css';
import 'swiper/css/pagination';

// --- এই ডেমো ডেটা আপনার আসল ডেটা দিয়ে পরিবর্তন করুন ---
const coursesData = [
  {
    id: 1,
    imgSrc: "/assets/Image(4).png", // !! আপনার ছবির পাথ দিন
    time: "08 hr 12 mins",
    category: "Design",
    title: "Figma UI UX Design..",
    description: "Use Figma to get a job in UI Design, User Interface, User Experience design.",
    rating: 4.3,
    reviews: 16325,
    instructor: {
      avatar: "/assets/Avatar.png", // !! আপনার ছবির পাথ দিন
      name: "Jane Cooper",
      enrolled: 2001,
    },
    price: 17.84,
  },
  {
    id: 2,
    imgSrc: "/assets/Image(5).png", // !! আপনার ছবির পাথ দিন
    time: "06 hr 3 mins",
    category: "Design",
    title: "Learn With Shoaib",
    description: "Design Web Sites and Mobile Apps that Your Users Love and Return to Again.",
    rating: 3.9,
    reviews: 832,
    instructor: {
      avatar: "/assets/Avatar(1).png", // !! আপনার ছবির পাথ দিন
      name: "Jenny Wilson",
      enrolled: 2001,
    },
    price: 8.99,
  },
  {
    id: 3,
    imgSrc: "/assets/Image(6).png", // !! আপনার ছবির পাথ দিন
    time: "01 hr 2 mins",
    category: "Design",
    title: "Building User Interface..",
    description: "Learn how to apply User Experience (UX) principles to your website designs.",
    rating: 4.2,
    reviews: 125,
    instructor: {
      avatar: "/assets/Avatar.png", // !! আপনার ছবির পাথ দিন
      name: "Esther Howard",
      enrolled: 2001,
    },
    price: 11.70,
  },
  // আপনি এখানে আরও স্লাইড যোগ করতে পারেন
  {
    id: 4,
     imgSrc: "/assets/Image(5).png", // !! আপনার ছবির পাথ দিন
    time: "05 hr 15 mins",
    category: "Development",
    title: "React Full Course",
    description: "Learn React from scratch and build powerful web applications.",
    rating: 4.8,
    reviews: 20450,
    instructor: {
    avatar: "/assets/Avatar(1).png", // !! আপনার ছবির পাথ দিন
      name: "Jane Cooper",
      enrolled: 5012,
    },
    price: 19.99,
  },
];
// --- ডেটা শেষ ---


/**
 * Reusable Course Card Component
 */
const PopularClassCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full flex flex-col group">
      {/* 1. Image and Time */}
      <div className="relative">
        <Image
          src={course.imgSrc}
          alt={course.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          <span>{course.time}</span>
        </div>
      </div>
      
      {/* 2. Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-emerald-600 font-medium text-sm">{course.category}</p>
        
        <Link href={`/course/${course.id}`} className="block mt-1">
          <h3 className="text-xl font-bold text-gray-900 flex justify-between items-center transition-colors duration-300 group-hover:text-emerald-600">
            {course.title}
            <MoveRight className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-emerald-600" />
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-2 flex-grow">
          {course.description}
        </p>
        
        {/* 3. Rating */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="font-bold text-gray-800 text-sm">{course.rating}</span>
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-500 text-sm">({course.reviews.toLocaleString()})</span>
        </div>
        
        <hr className="my-4 border-gray-100" />
        
        {/* 4. Instructor and Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{course.instructor.name}</p>
              <p className="text-xs text-gray-500">{course.instructor.enrolled.toLocaleString()} Enrolled</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${course.price}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * The Main Popular Class Section Component
 */
const PopularClassSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto  px-4">
        
        {/* Section Headings */}
        <p className="text-center text-emerald-600 font-semibold">
          Explore Programs
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          Our Most Popular Class
        </h2>
        <p className="text-center text-base text-gray-600 mt-4 mb-12 max-w-lg mx-auto">
          Let's join our famous class, the knowledge provided will definitely be useful for you.
        </p>
        
        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            el: '.swiper-pagination-popular-class',
            clickable: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-20!" // ডট-এর জন্য নিচে প্যাডিং
        >
          {coursesData.map((course) => (
            <SwiperSlide key={course.id} style={{ height: 'auto' }}>
              <PopularClassCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Pagination Dots */}
        <div className="swiper-pagination-popular-class flex justify-center items-center gap-2">
          {/* Swiper.js will populate this */}
        </div>
        
        {/* "Explore All" Button */}
        <div className="text-center mt-12">
          <Link 
            href="/all-programs" 
            className="inline-block px-7 py-3 border border-gray-300 rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Explore All Programs
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PopularClassSection;