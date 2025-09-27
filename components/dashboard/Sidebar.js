"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Home, BookOpen, BarChart2, Settings, X, Users, ChevronDown, User2 } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState({});

    // Updated navigation links with nested children
    const navLinks = [
        { href: "/dashboard", icon: Home, text: "ড্যাশবোর্ড" },
        {
            id: 'courses', // Unique ID for state management
            icon: BookOpen,
            text: "কোর্স",
            children: [
                { href: "/dashboard/course/add-course", text: "কোর্স যোগ করুন" },
                { href: "/dashboard/course/all-course", text: "সকল কোর্স" },
            ]
        },
        {
            id: 'teachers', // Unique ID for state management
            icon: Users,
            text: "শিক্ষক",
            children: [
                { href: "/dashboard/teacher/add-teacher", text: "শিক্ষক যোগ করুন" },
                { href: "/dashboard/teacher/teachers", text: "সকল শিক্ষক" },
            ]
        },
        { href: "/dashboard/users/all-user", icon: User2, text: "ইউজার" },
        { href: "/dashboard/analytics", icon: BarChart2, text: "অ্যানালিটিক্স" },
        { href: "/dashboard/settings", icon: Settings, text: "সেটিংস" },
    ];

    // Effect to open the parent menu if a child link is active on page load
    useEffect(() => {
        const activeMenu = navLinks.find(link => 
            link.children?.some(child => pathname.startsWith(child.href))
        );
        if (activeMenu) {
            setOpenMenus(prev => ({ ...prev, [activeMenu.id]: true }));
        }
    }, [pathname]);

    const handleMenuToggle = (id) => {
        setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const NavItem = ({ link }) => {
        // A parent is active if the pathname starts with the parent's base path
        const isParentActive = link.children?.some(child => pathname.startsWith(child.href));

        // A child link is active if the pathname exactly matches its href
        const isChildActive = (href) => pathname === href;

        if (!link.children) {
            const isActive = pathname === link.href;
            return (
                <Link
                    href={link.href}
                    className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
                        isActive
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-indigo-900 hover:text-white'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <link.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="font-medium">{link.text}</span>
                </Link>
            );
        }

        // If it's a dropdown menu
        const isOpen = openMenus[link.id];
        return (
            <div>
                <button
                    onClick={() => handleMenuToggle(link.id)}
                    className={`w-full flex items-center justify-between p-3 my-1 rounded-lg transition-colors ${
                        isParentActive
                            ? 'bg-indigo-800 text-white'
                            : 'text-gray-300 hover:bg-indigo-900 hover:text-white'
                    }`}
                >
                    <div className="flex items-center">
                        <link.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="font-medium">{link.text}</span>
                    </div>
                    <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-40' : 'max-h-0'
                    }`}
                >
                    <div className="pl-8 pt-1 border-l-2 border-gray-700 ml-5">
                        {link.children.map(child => (
                            <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-center p-2 my-1 rounded-md text-sm transition-colors ${
                                    isChildActive(child.href)
                                        ? 'text-white font-semibold'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                {child.text}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-40 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Logo and Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700 h-20">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShoppingBag className="text-indigo-400" size={32} />
                        <span className="font-bold text-2xl text-white">ই-লার্ণ</span>
                    </Link>
                    <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-3 py-4">
                    {navLinks.map(link => (
                        <NavItem key={link.id || link.href} link={link} />
                    ))}
                </nav>

                {/* Footer Section */}
                <div className="p-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} ই-লার্ণ। সর্বস্বত্ব সংরক্ষিত।</p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;