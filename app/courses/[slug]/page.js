"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation'; // Corrected import for App Router

import { User, BookOpen, Clock, PlayCircle, Lock, ChevronDown, ChevronUp, FileText, CheckCircle, Info, Users as StudentsIcon, ListChecks } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const API_BASE_URL = 'http://localhost:3001';

// --- Custom Skeleton Component (Replaces external library) ---
const Skeleton = ({ className }) => (
    <div className={`bg-gray-200 rounded-md animate-pulse ${className}`} />
);

const CoursePageSkeleton = () => (
    <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4">
                <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-10 w-2/3" />
            <Skeleton className="h-6 w-full mt-2" />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-2 space-y-8">
                    <Skeleton className="h-[450px] w-full rounded-lg" />
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <Skeleton className="h-7 w-1/4 mb-4" />
                        <Skeleton className="h-4 w-full" count={4} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <Skeleton className="h-7 w-1/3 mb-4" />
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="py-4 border-b border-gray-200">
                                <Skeleton className="h-6 w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white p-6 rounded-lg shadow-sm border">
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-12 mt-4 w-full" />
                        <div className="mt-6 space-y-3">
                            {Array(4).fill(0).map((_, i) => (
                                <Skeleton key={i} className="h-5 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


// --- Reusable Helper Component ---
const FormSection = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-5 flex items-center">{icon}{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);


// --- Main Page Component ---
export default function CoursePage() {
    const params = useParams();
    const slug = params?.slug; // Correct way to get slug in App Router
    const { token } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideoUrl, setActiveVideoUrl] = useState('');
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            return;
        }
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/courses/${slug}`);
                if (!response.ok) {
                    throw new Error('Course not found.');
                }
                const data = await response.json();
                setCourse(data);
                if (data.introVideo) {
                    setActiveVideoUrl(`${API_BASE_URL}/${data.introVideo}`);
                } else if (data.sections?.[0]?.lessons?.[0]?.videoUrl) {
                    handleLessonSelect(data.sections[0].lessons[0]);
                }
                if (data.sections?.[0]) {
                    setOpenSections({ [data.sections[0].id]: true });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    const handleLessonSelect = async (lesson) => {
        if (lesson.videoSource === 'link') {
            setActiveVideoUrl(lesson.videoUrl);
        } else if (lesson.videoUrl) {
            setActiveVideoUrl(`${API_BASE_URL}/${lesson.videoUrl}`);
        }
    };

    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    if (loading) {
        return <CoursePageSkeleton />;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
    }

    if (!course) {
        return <div className="flex justify-center items-center h-screen">Course data could not be loaded.</div>;
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-sm text-slate-500 mb-4">
                    <Link href="/courses" className="hover:text-indigo-600">Courses</Link>
                    <span className="mx-2">/</span>
                    <span>{course.category}</span>
                </div>

                <h1 className="text-4xl font-bold text-slate-900">{course.title}</h1>
                <p className="mt-2 text-lg text-slate-600">{course.description.substring(0, 150)}...</p>
                <div className="flex items-center space-x-6 mt-4 text-sm text-slate-500">
                    <span className="flex items-center"><StudentsIcon size={16} className="mr-1.5" /> 0 enrolled</span>
                    <span className="flex items-center"><BookOpen size={16} className="mr-1.5" /> {course.numberOfLessons} lessons</span>
                    <span className="flex items-center"><Clock size={16} className="mr-1.5" /> {course.duration}</span>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-black rounded-lg overflow-hidden shadow-lg">
                            {activeVideoUrl ? (
                                <video key={activeVideoUrl} controls autoPlay className="w-full h-auto">
                                    <source src={activeVideoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="w-full aspect-video bg-black flex items-center justify-center text-white">
                                    <PlayCircle size={64} />
                                </div>
                            )}
                        </div>

                        <FormSection title="About this Course" icon={<Info className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <p className="text-slate-600 whitespace-pre-wrap">{course.description}</p>
                        </FormSection>

                        <FormSection title="Course Content" icon={<ListChecks className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            {course.sections.map(section => (
                                <div key={section.id} className="border-b border-slate-200 last:border-b-0">
                                    <button onClick={() => toggleSection(section.id)} className="w-full flex justify-between items-center py-4 text-left">
                                        <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                                        {openSections[section.id] ? <ChevronUp /> : <ChevronDown />}
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openSections[section.id] ? 'max-h-screen' : 'max-h-0'}`}>
                                        <ul className="pl-4 pb-4 space-y-2">
                                            {section.lessons.map(lesson => (
                                                <li key={lesson.id}>
                                                    <button onClick={() => handleLessonSelect(lesson)} className="w-full text-left flex items-center p-2 rounded-md hover:bg-slate-100">
                                                        {lesson.videoUrl ? <PlayCircle size={16} className="mr-3 text-slate-500" /> : <FileText size={16} className="mr-3 text-slate-500" />}
                                                        <span className="flex-grow text-slate-700">{lesson.title}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </FormSection>

                        <FormSection title="Instructor" icon={<User className="mr-3 h-6 w-6 text-indigo-600"/>}>
                             <div className="flex items-center gap-4">
                                <img src={course.instructor.profilePhoto ? `${API_BASE_URL}/${course.instructor.profilePhoto}` : `https://ui-avatars.com/api/?name=${course.instructor.fullName}`} alt={course.instructor.fullName} className="h-20 w-20 rounded-full object-cover" />
                                <div>
                                    <h4 className="text-lg font-bold">{course.instructor.fullName}</h4>
                                    <p className="text-sm text-slate-500">{course.instructor.shortBio}</p>
                                </div>
                            </div>
                        </FormSection>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">{course.isFree ? 'Free' : `৳ ${course.price}`}</h3>
                            <button className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors">Enroll Now</button>
                            <div className="mt-6">
                                <h4 className="font-semibold mb-3">This course includes:</h4>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex items-center"><Clock size={16} className="mr-3 text-indigo-500" />{course.duration} of on-demand video</li>
                                    <li className="flex items-center"><BookOpen size={16} className="mr-3 text-indigo-500" />{course.numberOfLessons} lessons</li>
                                    <li className="flex items-center"><User size={16} className="mr-3 text-indigo-500" />Instructor support</li>
                                    <li className="flex items-center"><CheckCircle size={16} className="mr-3 text-indigo-500" />Certificate on completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}