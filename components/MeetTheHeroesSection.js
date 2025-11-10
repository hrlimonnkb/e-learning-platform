import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';


// !! Replace imageSrc paths with your actual image paths in /public
const tutorsData = [
  {
    id: 1,
    imageSrc: "/assets/Image(4).png",
    name: "Theresa Webb",
    title: "Application Support Analyst\nLead",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: 2,
    imageSrc: "/assets/Image(6).png",
    name: "Courtney Henry",
    title: "Director, Undergraduate\nAnalytics and Planning",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: 3,
    imageSrc: "/assets/Image(5).png",
    name: "Albert Flores",
    title: "Career Educator",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    id: 4,
    imageSrc: "/assets/Image(6).png",
    name: "Marvin McKinney",
    title: "Co-op & Internships Program\n& Operations Manager",
    bio: "Former frontend dev for Linear, Coinbase, and Postscript.",
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
        className="text-emerald-600 font-semibold mt-1" 
        style={{ whiteSpace: 'pre-line' }} // This handles the line breaks in the title
      >
        {tutor.title}
      </p>
      <p className="text-gray-600 text-sm mt-4 flex-grow">
        {tutor.bio}
      </p>
      <div className="flex items-center gap-4 mt-4 pt-2">
        <Link href={tutor.twitterUrl} passHref>
          <span className="text-gray-400 hover:text-emerald-600 transition-colors">
            <Twitter className="w-5 h-5" />
          </span>
        </Link>
        <Link href={tutor.linkedinUrl} passHref>
          <span className="text-gray-400 hover:text-emerald-600 transition-colors">
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
          <p className="text-emerald-600 font-semibold">
            Tutors
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Meet the Heroes
          </h2>
          <p className="text-lg text-gray-600 mt-4 mb-12">
            On Weekend UX, instructors from all over the world instruct millions of students.
            We offer the knowledge and abilities.
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
