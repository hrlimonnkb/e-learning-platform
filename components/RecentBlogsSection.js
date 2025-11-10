import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Demo Data ---
// !! Replace imageSrc paths with your actual image paths in /public
const smallBlogs = [
  {
    id: 1,
    imageSrc:  "/assets/Image(4).png", // !! Update this path
    date: "November 16, 2014",
    title: "Three Pillars of User Delight",
    description: "Delight can be experienced viscerally, behaviourally, and reflectively. A great design is ...",
    tags: [
      { label: "Research", color: "pink" },
      { label: "UI UX", color: "blue" },
    ],
  },
  {
    id: 2,
    imageSrc: "/assets/Image(5).png", // !! Update this path
    date: "September 24, 2017",
    title: "UX Mapping Methods",
    description: "Visual-design principles can be applied consistently throughout the process of creating a polished UX map...",
    tags: [
      { label: "Research", color: "pink" },
      { label: "UI Design", color: "blue" },
    ],
  },
];

const largeBlog = {
  id: 3,
  imageSrc: "/assets/Image(6).png", // !! Update this path
  date: "March 13, 2014",
  title: "Agile Development Projects and Usability",
  description: "Agile methods aim to overcome usability barriers in traditional development, but post new threats to user experience quality.",
  tags: [
    { label: "Programming", color: "orange" },
    { label: "Research", color: "indigo" },
    { label: "Developments", color: "pink" }, // Assuming this is the same pink
  ],
};
// --- End Demo Data ---


/**
 * Reusable Tag Component
 * @param {object} props
 * @param {string} props.label - The text for the tag
 * @param {'pink' | 'blue' | 'orange' | 'indigo'} props.color - The color variant
 */
const BlogTag = ({ label, color }) => {
  const colorClasses = {
    pink: "bg-pink-100 text-pink-600",
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <span className={`text-sm font-medium px-3 py-1 rounded-full ${colorClasses[color] || 'bg-gray-100 text-gray-600'}`}>
      {label}
    </span>
  );
};

/**
 * Reusable Small Blog Card (Image on left)
 */
const SmallBlogCard = ({ blog }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center group">
      <Image
        src={blog.imageSrc}
        alt={blog.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-500">{blog.date}</p>
        <Link href={`/blog/${blog.id}`} passHref>
          <span className="text-xl font-bold text-gray-900 mt-2 block transition-colors duration-300 group-hover:text-emerald-600">
            {blog.title}
          </span>
        </Link>
        <p className="text-gray-600 text-base mt-2">
          {blog.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((tag) => (
            <BlogTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable Large Blog Card (Image on top)
 */
const LargeBlogCard = ({ blog }) => {
  return (
    <div className="flex flex-col group">
      <Image
        src={blog.imageSrc}
        alt={blog.title}
        width={600}
        height={400}
        className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
      <div className="mt-6">
        <p className="text-sm text-gray-500">{blog.date}</p>
        <Link href={`/blog/${blog.id}`} passHref>
          <span className="text-2xl font-bold text-gray-900 mt-2 block transition-colors duration-300 group-hover:text-emerald-600">
            {blog.title}
          </span>
        </Link>
        <p className="text-gray-600 text-base mt-3">
          {blog.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((tag) => (
            <BlogTag key={tag.label} label={tag.label} color={tag.color} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * The Main "Our recent blogs" Section
 */
const RecentBlogsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Our recent blogs
        </h2>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          
          {/* Left Column (Small Cards) */}
          <div className="flex flex-col gap-10">
            {smallBlogs.map((blog) => (
              <SmallBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          
          {/* Right Column (Large Card) */}
          <div className="mt-4 lg:mt-0">
            <LargeBlogCard blog={largeBlog} />
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default RecentBlogsSection;