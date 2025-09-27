"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu as MenuIcon, X, UserCircle, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading, logout } = useAuth();
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navLinks = [
        { href: "/courses", text: "কোর্স সমূহ" },
        { href: "/blog", text: "ব্লগ" },
        { href: "/live-course", text: "লাইভ কোর্স" },
        { href: "/career-guideline", text: "ক্যারিয়ার গাইডলাইন" },
        { href: "/contact", text: "যোগাযোগ" },
    ];
    const IMG_URL="http://localhost:3001"

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscapeKey);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []);

    const AuthSection = ({ isMobile = false }) => {
        if (loading) {
            return <div className={`h-10 w-32 rounded-lg bg-gray-200 animate-pulse ${isMobile ? 'w-full' : ''}`}></div>;
        }

        if (user) {
            return (
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(prev => !prev)}
                        className="flex items-center gap-2 rounded-full p-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="sr-only">Open user menu</span>
                        {user.image ? (
                            <img
                                className="h-9 w-9 rounded-full"
                                src={`${IMG_URL}/${user.image}`}
                                alt={user.name || 'User'}
                                width={36}
                                height={36}
                            />
                        ) : (
                            <UserCircle className="h-9 w-9 text-gray-600" />
                        )}
                        <span className="hidden sm:inline">{user.name}</span>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-100 scale-100">
                           <div className="py-1">
                                <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900 hover:bg-indigo-500 hover:text-white">
                                    <LayoutDashboard className="mr-2 h-5 w-5" />
                                    ড্যাশবোর্ড
                                </Link>
                                <Link href="/settings" onClick={() => setIsDropdownOpen(false)} className="group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900 hover:bg-indigo-500 hover:text-white">
                                    <Settings className="mr-2 h-5 w-5" />
                                    সেটিংস
                                </Link>
                                <button onClick={() => { logout(); setIsDropdownOpen(false); }} className="group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-900 hover:bg-red-500 hover:text-white">
                                    <LogOut className="mr-2 h-5 w-5" />
                                    লগআউট
                                </button>
                           </div>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={`flex items-center gap-3 ${isMobile ? 'flex-col w-full' : ''}`}>
                <Link href="/signin" className="px-4 py-2 text-sm text-center font-semibold rounded-lg w-full md:w-auto border border-indigo-600 text-indigo-600 hover:bg-indigo-50" onClick={() => isMobile && setIsMenuOpen(false)}>
                    লগইন
                </Link>
                <Link href="/signup" className="px-4 py-2 text-sm text-center font-semibold text-white rounded-lg transition-colors w-full md:w-auto bg-indigo-600 hover:bg-indigo-700" onClick={() => isMobile && setIsMenuOpen(false)}>
                    সাইন আপ
                </Link>
            </div>
        );
    };

    return (
        <nav className="bg-white sticky top-0 z-50 w-full shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
                            <ShoppingBag className="text-indigo-600" size={32} />
                            <span className="font-bold text-2xl text-gray-800">ই-লার্ণ</span>
                        </Link>

                        {/* Desktop Menu Links */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-base font-medium text-gray-700 relative group">
                                    <span>{link.text}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300 origin-left transform scale-x-0 group-hover:scale-x-100"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            {/* --- এই লাইনে পরিবর্তন আনা হয়েছে --- */}
                            <input 
                                type="text" 
                                placeholder="সার্চ করে দেখুন..." 
                                className="pl-10 pr-4 py-2 w-48 border border-gray-300 rounded-lg focus:ring-1 focus:border-indigo-500 text-gray-900 placeholder:text-gray-600" 
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <AuthSection />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4 absolute w-full shadow-lg">
                    <div className="px-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="block text-base font-medium text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                {link.text}
                            </Link>
                        ))}
                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            {loading ? (
                                <div className="h-10 w-full rounded-lg bg-gray-200 animate-pulse"></div>
                            ) : user ? (
                                <div className='space-y-3'>
                                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-medium w-full rounded-md px-3 py-2 text-gray-900 hover:bg-indigo-500 hover:text-white">
                                        <LayoutDashboard className="mr-2 h-5 w-5" /> ড্যাশবোর্ড
                                    </Link>
                                    <Link href="/settings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-medium w-full rounded-md px-3 py-2 text-gray-900 hover:bg-indigo-500 hover:text-white">
                                        <Settings className="mr-2 h-5 w-5" /> সেটিংস
                                    </Link>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-2 font-medium w-full rounded-md px-3 py-2 text-gray-900 hover:bg-red-500 hover:text-white">
                                        <LogOut className="mr-2 h-5 w-5" /> লগআউট
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/signin" className="block text-center w-full px-4 py-2 text-sm font-semibold rounded-lg border border-indigo-600 text-indigo-600" onClick={() => setIsMenuOpen(false)}>লগইন</Link>
                                    <Link href="/signup" className="block text-center w-full px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600" onClick={() => setIsMenuOpen(false)}>সাইন আপ</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;