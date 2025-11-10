"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Facebook, Github, Dribbble } from 'lucide-react';


const logoSrc = "/logo.png"; // Example: "/weekend-logo.png"

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-slate-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top section: 5-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-10">
          
          {/* Column 1: Logo & Description (Spans 2 columns) */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image 
                src={logoSrc} 
                width={120} 
                height={40} 
                alt="Weekend Logo" 
                className="h-10 w-auto" // Adjust size as needed
              />
            </Link>
            <p className="text-sm">
              Top learning experiences that create more talent in the world.
            </p>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Overview</Link></li>
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Solutions</Link></li>
              <li><Link href="#" className="hover:text-white">Tutorials</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">About us</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-white">
                  Press 
                  <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    New
                  </span>
                </Link>
              </li>
              <li><Link href="#" className="hover:text-white">News</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Social</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white">LinkedIn</Link></li>
              <li><Link href="#" className="hover:text-white">GitHub</Link></li>
              <li><Link href="#" className="hover:text-white">Dribbble</Link></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white">Terms</Link></li>
              <li><Link href="#" className="hover:text-white">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white">Cookies</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section: Copyright & Social Icons */}
        <div className="pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-center sm:text-left">
            © 2022 Ed-Circle. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-white"><Twitter size={20} /></Link>
            <Link href="#" className="hover:text-white"><Linkedin size={20} /></Link>
            <Link href="#" className="hover:text-white"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-white"><Github size={20} /></Link>
            <Link href="#" className="hover:text-white"><Dribbble size={20} /></Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
