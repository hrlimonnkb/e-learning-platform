"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1. কনটেক্সট তৈরি করুন
const AuthContext = createContext(null);

// 2. কাস্টম প্রোভাইডার কম্পোনেন্ট তৈরি করুন
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // শুরুতে লোডিং স্টেট true থাকবে
    const router = useRouter();

    // 3. localStorage থেকে ডেটা লোড করার জন্য useEffect ব্যবহার করুন
    useEffect(() => {
        // এই কোডটি শুধু ক্লায়েন্ট-সাইডে রান হবে
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false); // ডেটা লোড হওয়ার পর লোডিং স্টেট false করুন
        }
    }, []);

    // 4. লগইন ফাংশন
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        router.push('/dashboard'); // লগইন করার পর ড্যাশবোর্ডে পাঠান
    };

    // 5. লগআউট ফাংশন
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/signin'); // লগআউট করার পর সাইনইন পেজে পাঠান
    };

    // 6. ভ্যালুগুলো প্রোভাইডারের মাধ্যমে পাস করুন
    const value = {
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 7. একটি কাস্টম হুক তৈরি করুন যাতে সহজে কনটেক্সট ব্যবহার করা যায়
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};