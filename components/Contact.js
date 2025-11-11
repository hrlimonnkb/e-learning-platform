import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    // 1. মূল পেজ র‍্যাপার (হালকা ধূসর ব্যাকগ্রাউন্ড)
    // overflow-hidden দিয়েছি যাতে ব্যাকগ্রাউন্ড এলিমেন্টগুলো পেইজের বাইরে না যায়
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      
      {/* 2. ব্যাকগ্রাউন্ডের ডেকোরেটিভ এলিমেন্ট */}
      {/* (এগুলো absolute পজিশনে থাকবে, z-0) */}
      
      {/* উপরের-ডানের ডট গ্রিড (একটি সরল ডট গ্রিড) */}
      <div className="absolute top-10 right-10 z-0">
        <div className="grid grid-cols-5 gap-2 opacity-30">
          {Array(25).fill(0).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#fdac74] rounded-full"></div>
          ))}
        </div>
      </div>
      
      {/* নিচের-বামের সবুজ বক্স */}
      <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 z-0">
        <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-[#fdac74] rounded-lg opacity-80 rotate-12"></div>
        <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-[#fdac74] rounded-lg opacity-80 ml-10 -mt-12"></div>
      </div>
      
      {/* নিচের-ডানের কমলা বক্স */}
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-0">
        <div className="w-32 h-32 md:w-48 md:h-48 border-4 border-orange-300 rounded-lg opacity-80 -rotate-12"></div>
        <div className="w-24 h-24 md:w-32 md:h-32 border-4 border-orange-300 rounded-lg opacity-80 ml-10 -mt-12"></div>
      </div>

      
      {/* 3. প্রধান কন্টাক্ট কার্ড (সাদা) */}
      {/* (এটি relative এবং z-10 দিয়ে উপরে রাখা হয়েছে) */}
      <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16 max-w-6xl w-full mx-auto z-10">
        
        {/* 4. "CONTACT US" শিরোনাম */}
        <div className="text-center mb-12">
          <h2 className="text-xl font-bold text-[#f97316] uppercase tracking-wider border-b-2 border-[#f97316] inline-block pb-1">
            CONTACT US
          </h2>
        </div>

        {/* 5. প্রধান ২-কলাম গ্রিড */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 6. বাম কলাম (ফর্ম) */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Leave us a message
            </h3>
            <form action="#" method="POST" className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="First_Name Last_Name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f97316] focus:border-[#f97316] text-gray-900 placeholder-gray-400" 
                  required
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f97316] focus:border-[#f97316] text-gray-900 placeholder-gray-400" 
                  required
                />
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  placeholder="Your Message" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f97316] focus:border-[#f97316] text-gray-900 placeholder-gray-400 resize-none" 
                  required
                ></textarea>
              </div>
              
              {/* Button */}
              <button 
                type="submit" 
                className="w-full bg-[#f97316] hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                Send
              </button>
            </form>
          </div>

          {/* 7. ডান কলাম (তথ্য) */}
          <div className="space-y-6">
            
            {/* Address */}
            <div>
              <p className="text-gray-800 font-bold mb-2">Weekend UX</p>
              <p className="text-gray-600 leading-relaxed">
                B 2/13 Ground Floor Double <br />
                Story Ramesh Nagar, Near Raja Garden <br />
                Chowk, Delhi 110015
              </p>
            </div>
            
            {/* Phone */}
            <div>
              <p className="text-gray-800 font-semibold">+91 9599222724</p>
            </div>
            
            {/* Email */}
            <div>
              <p className="text-gray-800 font-semibold">hello@info.com.ng</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                <Linkedin size={24} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-sky-500 transition-colors">
                <Twitter size={24} />
              </Link>
            </div>
            
            {/* Map */}
            <div className="mt-6">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.815277156903!2d77.1492657150827!3d28.63529398241644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03217ac51a7b%3A0xb3b0067a7f7636e7!2sRamesh%20Nagar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1678888888888!5m2!1sen!2sin" 
                width="100%" 
                height="250" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg border border-gray-200 shadow-sm"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}