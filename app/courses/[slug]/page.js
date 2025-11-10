"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { User, BookOpen, Clock, PlayCircle, Lock, ChevronDown, ChevronUp, CheckCircle, Info, ListChecks } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useAuth } from '@/context/AuthContext';
import VideoModal from '@/components/VideoModal'; // Make sure this path is correct

const API_BASE_URL = 'https://api.microskill.com.bd';

// --- Skeleton & FormSection components (assuming they are defined as before) ---
const Skeleton = ({ className }) => <div className={`bg-gray-200 rounded-md animate-pulse ${className}`} />;
const CoursePageSkeleton = () => { /* ... Full skeleton code ... */ return <div>Loading...</div> };
const FormSection = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-800 mb-5 flex items-center">{icon}{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);


// --- Main Page Component ---
export default function CoursePage() {
    const params = useParams();
    const slug = params?.slug;

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideoUrl, setActiveVideoUrl] = useState(''); // For the top main player
    const [openSections, setOpenSections] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVideoUrl, setModalVideoUrl] = useState('');

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            return;
        }
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/courses/${slug}`);
                if (!response.ok) throw new Error('Course not found.');
                
                const data = await response.json();
                setCourse(data);

                if (data.introVideo) {
                    setActiveVideoUrl(`${API_BASE_URL}/${data.introVideo}`);
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

    const handleLessonSelect = (lesson) => {
        if (lesson.isLocked) {
             alert("এই লেসনটি দেখার জন্য আপনাকে কোর্সটিতে এনরোল করতে হবে।");
             return;
        }
        let videoUrl = '';
        if (lesson.videoSource === 'link') {
            videoUrl = lesson.videoUrl;
        } else if (lesson.videoUrl) {
            videoUrl = `${API_BASE_URL}/${lesson.videoUrl}`;
        }
        if (videoUrl) {
            setModalVideoUrl(videoUrl);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalVideoUrl('');
    };

    const toggleSection = (sectionId) => {
        setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
    };

    if (loading) return <CoursePageSkeleton />;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
    if (!course) return <div className="flex justify-center items-center h-screen">Course data could not be loaded.</div>;

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-sm text-slate-500 mb-4">
                    <Link href="/courses" className="hover:text-indigo-600">কোর্সের বিবরণ</Link>
                    <span className="mx-2">/</span>
                    <span>{course.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- MAIN CONTENT (LEFT) --- */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Top Main Player (for intro video/thumbnail) */}
                        <div className="bg-black rounded-lg overflow-hidden shadow-lg aspect-video flex items-center justify-center text-slate-400">
                            {activeVideoUrl ? (
                                <ReactPlayer
                                    url={activeVideoUrl}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    light={course.thumbnail ? `${API_BASE_URL}/${course.thumbnail}` : false}
                                    playIcon={<PlayCircle size={80} className="text-white opacity-90" />}
                                />
                            ) : (
                                <div>
                                    {course.thumbnail ? 
                                     <img src={`${API_BASE_URL}/${course.thumbnail}`} alt={course.title} className="w-full h-full object-cover" /> 
                                     : <p>No preview available</p>
                                    }
                                </div>
                            )}
                        </div>

                        {/* ... Other sections like About, Learning Objectives etc. ... */}
                        
                        <FormSection title="কোর্স সিলেবাস" icon={<ListChecks className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            {course.sections.map((section, sectionIndex) => (
                                <div key={section.id} className="border-b border-slate-200 last:border-b-0">
                                    <button onClick={() => toggleSection(section.id)} className="w-full flex justify-between items-center py-4 text-left">
                                        <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                                        {openSections[section.id] ? <ChevronUp /> : <ChevronDown />}
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openSections[section.id] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                                        <ul className="pl-2 pb-4 space-y-1">
                                            {section.lessons.map((lesson, lessonIndex) => {
                                                // --- নতুন এবং সহজ লজিক: শুধুমাত্র প্রথম লেসনটি আনলক থাকবে ---
                                                const isLocked = !(sectionIndex === 0 && lessonIndex === 0);

                                                return (
                                                    <li key={lesson.id}>
                                                        <button 
                                                            onClick={() => handleLessonSelect({ ...lesson, isLocked })} 
                                                            className="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed" 
                                                            disabled={isLocked}
                                                        >
                                                            <div className="flex items-center">
                                                                {isLocked ? (
                                                                    <Lock size={16} className="mr-3 text-slate-400" />
                                                                ) : (
                                                                    <PlayCircle size={16} className="mr-3 text-slate-500" />
                                                                )}
                                                                <span className="text-slate-700">{lesson.title}</span>
                                                            </div>
                                                            {lesson.duration && <span className="text-sm text-slate-500">{lesson.duration}</span>}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </FormSection>

                        {/* ... Instructor Section ... */}
                    </div>

                    {/* ... Sidebar ... */}
                </div>
            </div>

            <VideoModal 
                isOpen={isModalOpen} 
                videoUrl={modalVideoUrl} 
                onClose={closeModal} 
            />
        </div>
    );
}