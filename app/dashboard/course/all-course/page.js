"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, BookOpen, User, DollarSign, ListChecks, Tag } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const API_BASE_URL = 'http://localhost:3001';

// --- Skeleton Component for Table Loading State ---
const TableSkeleton = () => (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-left"><Skeleton width={100} /></th>
                        <th className="px-6 py-4 text-left"><Skeleton width={80} /></th>
                        <th className="px-6 py-4 text-left"><Skeleton width={70} /></th>
                        <th className="px-6 py-4 text-left"><Skeleton width={50} /></th>
                        <th className="px-6 py-4 text-center"><Skeleton width={60} /></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Array(5).fill(0).map((_, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <Skeleton height={40} width={60} />
                                    <div>
                                        <Skeleton height={15} width={200} />
                                        <Skeleton height={12} width={150} className="mt-1" />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4"><Skeleton height={15} width={120} /></td>
                            <td className="px-6 py-4"><Skeleton height={24} width={100} /></td>
                            <td className="px-6 py-4"><Skeleton height={15} width={50} /></td>
                            <td className="px-6 py-4 text-center">
                                <Skeleton circle height={32} width={32} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </SkeletonTheme>
);

// --- Main Page Component ---
export default function AllCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/courses`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch courses.');
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (error) return <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
                <p className="mt-1 text-gray-600">Browse and manage all available courses in the system.</p>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {loading ? <TableSkeleton /> : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Course</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Instructor</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-16">
                                                    <img 
                                                        className="h-10 w-16 rounded object-cover" 
                                                        src={course.thumbnail ? `${API_BASE_URL}/${course.thumbnail}` : 'https://placehold.co/100x60/e2e8f0/64748b?text=Course'} 
                                                        alt={course.title} 
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{course.title}</div>
                                                    <div className="text-sm text-gray-500">{course.numberOfLessons} Lessons</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {course.instructor?.fullName || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                            {course.isFree ? <span className="text-green-600">Free</span> : `BDT ${course.price}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <Link href={`/courses/${course.slug}`} passHref>
                                                <span className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="View Course Details">
                                                    <Eye size={18} />
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}