import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';


// !! আপনার /public ফোল্ডারে সঠিক imageSrc path দিন
const tutorsData = [
  {
    id: 1,
    imageSrc: "/assets/Image(4).png",
    name: "থেরেসা ওয়েব",
    title: "অ্যাপ্লিকেশন সাপোর্ট অ্যানালিস্ট\nলিড",
    bio: "Opendoor-এর সহ-প্রতিষ্ঠাতা। Spotify এবং Clearbit-এ প্রাক্তন সিনিয়র কর্মী।",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: 2,
    imageSrc: "/assets/Image(6).png",
    name: "কোর্টনি হেনরি",
    title: "পরিচালক, স্নাতক\nঅ্যানালিটিক্স ও পরিকল্পনা বিভাগ",
    bio: "Figma, Pitch এবং Protocol Labs-এর ইঞ্জিনিয়ারিং টিমের নেতৃত্ব দিয়েছেন।",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: 3,
    imageSrc: "/assets/Image(5).png",
    name: "আলবার্ট ফ্লোরেস",
    title: "ক্যারিয়ার এডুকেটর",
    bio: "Linear, Lambda School এবং On Deck-এ প্রাক্তন প্রোডাক্ট ম্যানেজার।",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: 4,
    imageSrc: "/assets/Image(6).png",
    name: "মারভিন ম্যাককিনি",
    title: "কো-অপ ও ইন্টার্নশিপ প্রোগ্রাম\nও অপারেশন ম্যানেজার",
    bio: "Linear, Coinbase এবং Postscript-এর প্রাক্তন ফ্রন্টএন্ড ডেভেলপার।",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
];

/**
 * Reusable Tutor Card Component
 */
const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl">
      <Image
        src={tutor.imageSrc}
        alt={tutor.name}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full object-cover"
      />
      <h3 className="text-xl font-bold text-gray-900 mt-4">
        {tutor.name}
      </h3>
      <p 
        className="text-[#f97316] font-semibold mt-1" 
        style={{ whiteSpace: 'pre-line' }}
      >
        {tutor.title}
      </p>
      <p className="text-gray-600 text-sm mt-4 flex-grow">
        {tutor.bio}
      </p>
      <div className="flex items-center gap-4 mt-4 pt-2">
        <Link href={tutor.twitterUrl} passHref>
          <span className="text-gray-400 hover:text-[#f97316] transition-colors">
            <Twitter className="w-5 h-5" />
          </span>
        </Link>
        <Link href={tutor.linkedinUrl} passHref>
          <span className="text-gray-400 hover:text-[#f97316] transition-colors">
            <Linkedin className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

/**
 * The Main "Meet the Heroes" Section
 */
const MeetTheHeroesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Headings */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#f97316] font-semibold">
            প্রশিক্ষকগণ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            আমাদের নায়কদের সঙ্গে পরিচিত হোন
          </h2>
          <p className="text-lg text-gray-600 mt-4 mb-12">
            Weekend UX-এ বিশ্বের বিভিন্ন স্থান থেকে প্রশিক্ষকরা লক্ষাধিক শিক্ষার্থীকে প্রশিক্ষণ দেন।
            আমরা জ্ঞান ও দক্ষতা ভাগাভাগি করি।
          </p>
        </div>
        
        {/* Tutors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tutorsData.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default MeetTheHeroesSection;
