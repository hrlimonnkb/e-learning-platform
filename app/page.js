import PopularClassSection from '@/components/CourseSection';
import HeroSection from '@/components/Hero';
import MeetTheHeroesSection from '@/components/MeetTheHeroesSection';
import RecentBlogsSection from '@/components/RecentBlogsSection';
import ServiceSection from '@/components/ServiceSection';
import TestimonialSection from '@/components/TestimonialSection';
import React from 'react';

const Page = () => {
  return (
   <div className="min-h-screen bg-gray-50">
      <HeroSection/>
      <ServiceSection/>
      <PopularClassSection/>
      <MeetTheHeroesSection/>
      <TestimonialSection/>
      <RecentBlogsSection/>
    </div>
  );
};

export default Page;