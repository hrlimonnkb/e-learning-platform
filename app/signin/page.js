"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { CheckCircle, BookOpenText, Sparkles, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // আমাদের তৈরি করা AuthContext হুক ইম্পোর্ট করুন

// Google Icon Component
const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        <path d="M1 1h22v22H1z" fill="none"/>
    </svg>
);

const SigninPage = () => {
    const router = useRouter();
    const { login } = useAuth(); // AuthContext থেকে login ফাংশনটি নিন

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleGoogleSignIn = async () => {
        // next-auth এর মাধ্যমে গুগল সাইন-ইন
        await signIn('google', { callbackUrl: '/dashboard' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!formData.email || !formData.password) {
            setError('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড দিন।');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // API থেকে আসা এরর মেসেজ দেখান
                throw new Error(data.message || 'Something went wrong during signin.');
            }

            // লগইন সফল হলে, কনটেক্সটের login ফাংশন কল করুন
            // এই ফাংশনটি ইউজার ডেটা localStorage-এ সেভ করবে এবং ড্যাশবোর্ডে রিডাইরেক্ট করবে
            login(data.user);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>সাইন ইন - ই-লার্ণ</title>
                <meta name="description" content="আপনার অ্যাকাউন্টে লগইন করুন" />
            </Head>
            <div style={{ backgroundColor: '#F9FAFB' }} className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Left Column */}
                    <div style={{ backgroundColor: '#4F46E5' }} className="w-full md:w-2/5 text-white p-8 md:p-12 flex-col justify-center hidden md:flex">
                        <h1 className="text-3xl font-bold mb-4">ই-লার্ণ</h1>
                        <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            জ্ঞান অর্জন করুন, সহজে শিখুন, একসাথে এগিয়ে যান।
                        </p>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <CheckCircle className="h-7 w-7 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">আপনার পছন্দের কোর্স খুঁজুন</h3>
                                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>হাজারো কোর্সের মধ্য থেকে আপনার পছন্দের কোর্সটি বেছে নিন।</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <BookOpenText className="h-7 w-7 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">নিজে শিখুন বাস্তবে</h3>
                                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>ভিডিও লেকচার, কুইজ ও অ্যাসাইনমেন্টের মাধ্যমে জ্ঞান অর্জন করুন।</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <Sparkles className="h-7 w-7 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold">আপনার জ্ঞান বৃদ্ধি করুন</h3>
                                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>অন্যান্য ইউজারদের সাথে একত্রে কোর্স করে আপনার জ্ঞানকে এগিয়ে নিন।</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column (Form) */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 bg-white">
                        <h2 style={{ color: '#111827' }} className="text-3xl font-bold mb-2">স্বাগতম! লগইন করুন</h2>
                        <p style={{ color: '#6B7280' }} className="mb-6">আপনার প্রোফাইলে প্রবেশ করে সেরা সেবা নিন।</p>
                        
                        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors" style={{ color: '#111827' }}>
                            <GoogleIcon />
                            গুগল দিয়ে সাইন ইন করুন
                        </button>

                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-t border-gray-300"/>
                            <span style={{ color: '#6B7280' }} className="px-4 text-sm">অথবা</span>
                            <hr className="flex-grow border-t border-gray-300"/>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="email" name="email" placeholder="ইমেইল অ্যাড্রেস" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500" />
                            </div>
                            
                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="পাসওয়ার্ড" value={formData.password} onChange={handleChange} required className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            
                            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center">{error}</p>}

                            <div className="flex items-center justify-end">
                                <a href="/forgot-password" style={{ color: '#4F46E5' }} className="text-sm font-semibold hover:underline">
                                    পাসওয়ার্ড ভুলে গেছেন?
                                </a>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
                                style={{ color: '#FFFFFF' }}
                            >
                               {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'লগইন করুন'}
                            </button>
                        </form>

                        <p style={{ color: '#6B7280' }} className="text-center text-sm mt-6">
                            অ্যাকাউন্ট নেই?{' '}
                            <a href="/signup" style={{ color: '#4F46E5' }} className="font-semibold hover:underline">
                                সাইন আপ করুন
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SigninPage;