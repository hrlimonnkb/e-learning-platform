"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2 } from 'lucide-react';

const ResetPasswordContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userEmail = searchParams.get('email');
        if (userEmail) {
            setEmail(userEmail);
        } else {
            router.push('/forgot-password');
        }
    }, [searchParams, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('পাসওয়ার্ড দুটি মিলছে না।');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');

        const response = await fetch('http://localhost:3001/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code, password }),
        });
        const data = await response.json();
        
        if (!response.ok) {
            setError(data.message);
        } else {
            setSuccess(data.message + ' আপনাকে লগইন পেজে নিয়ে যাওয়া হচ্ছে...');
            setTimeout(() => router.push('/signin'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-4">নতুন পাসওয়ার্ড সেট করুন</h2>
                <p className="text-center text-gray-600 mb-6">আপনার ইমেইলে পাঠানো ৪-ডিজিটের কোড এবং নতুন পাসওয়ার্ড দিন।</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="৪-ডিজিটের কোড"
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="নতুন পাসওয়ার্ড"
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                            required
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    {error && <p className="text-center text-sm text-red-600">{error}</p>}
                    {success && <p className="text-center text-sm text-green-600">{success}</p>}
                    <button type="submit" disabled={loading} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-semibold py-3 rounded-lg flex justify-center items-center disabled:bg-indigo-400">
                        {loading ? <Loader2 className="animate-spin" /> : 'পাসওয়ার্ড রিসেট করুন'}
                    </button>
                </form>
            </div>
        </div>
    );
}


const ResetPasswordPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
    </Suspense>
);

export default ResetPasswordPage;