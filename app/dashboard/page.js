"use client";
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
    const { user } = useAuth();
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                স্বাগতম, {user ? user.name : 'Guest'}!
            </h1>
            <p className="text-gray-600 mb-8">
                এটি আপনার ড্যাশবোর্ড। এখান থেকে আপনি আপনার কোর্স, অগ্রগতি এবং অন্যান্য বিষয় পরিচালনা করতে পারবেন।
            </p>

            {/* Example Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">মোট কোর্স</h3>
                    <p className="text-3xl font-bold text-[#ea670c] mt-2">১২</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">সম্পন্ন কোর্স</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">৪</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">সার্টিফিকেট</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">২</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">মোট পয়েন্ট</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">১২৫০</p>
                </div>
            </div>
        </div>
    );
}