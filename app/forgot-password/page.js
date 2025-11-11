"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const response = await fetch('/api/auth/request-password-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setMessage(data.message);
        setLoading(false);
        if (response.ok) {
            // কোড পাঠানোর পর রিসেট পেজে রিডাইরেক্ট করুন
            setTimeout(() => {
                router.push(`/reset-password?email=${email}`);
            }, 2000);
        }
    };

    return (
        <div style={{ backgroundColor: '#F9FAFB' }} className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-4">পাসওয়ার্ড রিসেট করুন</h2>
                <p className="text-center text-gray-600 mb-6">আপনার অ্যাকাউন্টের ইমেইল দিন, আমরা আপনাকে একটি রিসেট কোড পাঠাব।</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ইমেইল অ্যাড্রেস"
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    {message && <p className="text-center text-sm text-green-600">{message}</p>}
                    <button type="submit" disabled={loading} className="w-full text-white bg-[#ea670c] hover:bg-[#c2570c] font-semibold py-3 rounded-lg flex justify-center items-center disabled:bg-[#fb8a3c]">
                        {loading ? <Loader2 className="animate-spin" /> : 'রিসেট কোড পাঠান'}
                    </button>
                </form>
            </div>
        </div>
    );
}