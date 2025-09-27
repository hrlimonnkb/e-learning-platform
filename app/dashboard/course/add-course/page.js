"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Film, Image as ImageIcon, BookOpen, DollarSign, Target, ListChecks, CheckCircle, GripVertical, User, Tag, Languages, Link2, Upload, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const API_BASE_URL = 'http://localhost:3001';

// ---------- Reusable Components ----------
const FormSection = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-5 flex items-center">
            {icon}
            {title}
        </h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder, required = true, helpText, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
        {helpText && <p className="mt-1.5 text-xs text-slate-500">{helpText}</p>}
    </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder, rows = 4, helpText, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
        {helpText && <p className="mt-1.5 text-xs text-slate-500">{helpText}</p>}
    </div>
);

const SelectField = ({ label, name, value, onChange, children, helpText }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-slate-900"
        >
            {children}
        </select>
        {helpText && <p className="mt-1.5 text-xs text-slate-500">{helpText}</p>}
    </div>
);

const FileUploadField = ({ onFileSelect, preview, Icon, acceptedFiles, helpText, fileInfo }) => (
    <div className="space-y-2">
        <label className="relative cursor-pointer group block w-full text-center">
            <div className={`px-6 py-8 border-2 border-slate-300 border-dashed rounded-lg transition-colors ${!preview && 'hover:border-indigo-500 hover:bg-indigo-50'}`}>
                {preview ? (
                    <img src={preview} alt="Thumbnail Preview" className="mx-auto h-28 w-auto rounded-md shadow-md" />
                ) : (
                    <div className="space-y-1">
                        <Icon className="mx-auto h-12 w-12 text-slate-400" />
                        <span className="mt-2 block text-sm font-semibold text-indigo-600">
                            {fileInfo ? 'Change file' : 'Upload file'}
                        </span>
                        <span className="block text-xs text-slate-500">or drag and drop</span>
                    </div>
                )}
            </div>
            <input type="file" className="sr-only" onChange={onFileSelect} accept={acceptedFiles} />
        </label>
        {fileInfo && (
            <div className="bg-slate-100 p-2 rounded-md text-xs text-slate-700 text-center">
                <p className="font-medium truncate">{fileInfo.name}</p>
                <p className="text-slate-500">{(fileInfo.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
        )}
        {helpText && <p className="mt-1.5 text-xs text-slate-500">{helpText}</p>}
    </div>
);

const FormSkeleton = () => (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f8fafc">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Skeleton height={36} width={300} />
                <Skeleton height={20} width={400} className="mt-2" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    {Array(3).fill(0).map((_, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                            <Skeleton height={28} width={250} className="mb-5" />
                            <div className="space-y-4">
                                <Skeleton height={40} />
                                <Skeleton height={60} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        {Array(2).fill(0).map((_, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                <Skeleton height={28} width={150} className="mb-5" />
                                <div className="space-y-4">
                                    <Skeleton height={40} />
                                    <Skeleton height={40} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </SkeletonTheme>
);

// ---------- Main Page Component ----------
export default function AddCoursePage() {
    const { user, loading: authLoading, token } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        title: '', slug: '', description: '', category: '', language: 'বাংলা',
        instructorName: '', instructorBio: '', duration: '', numberOfLessons: '',
        outcomes: [''], requirements: [''], price: '', isFree: false
    });
    const [syllabus, setSyllabus] = useState([{ id: Date.now(), title: 'Section 1: Introduction', lessons: [{ id: Date.now(), title: 'Welcome to the Course', videoSource: 'upload', videoFile: null, videoUrl: '' }] }]);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [introVideo, setIntroVideo] = useState(null);
    
    useEffect(() => {
        const generateSlug = (text) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setFormData(prev => ({...prev, slug: generateSlug(prev.title)}));
    }, [formData.title]);
    
    useEffect(() => {
        const fetchInstructorProfile = async () => {
            if (!authLoading && user && token) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/teachers/my-profile`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const profile = await response.json();
                        setFormData(prev => ({ ...prev, instructorName: profile.fullName || user.name || '', instructorBio: profile.shortBio || '' }));
                    } else {
                        setFormData(prev => ({ ...prev, instructorName: user.name || '' }));
                    }
                } catch (error) {
                    console.error("Failed to fetch teacher profile", error);
                    setFormData(prev => ({ ...prev, instructorName: user.name || '' }));
                }
            }
        };
        fetchInstructorProfile();
    }, [authLoading, user, token]);

    const handleListChange = (key, index, value) => setFormData(prev => ({ ...prev, [key]: prev[key].map((item, i) => i === index ? value : item) }));
    const addListItem = (key) => setFormData(prev => ({ ...prev, [key]: [...prev[key], ''] }));
    const removeListItem = (key, index) => setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
    
    const handleSectionTitleChange = (sectionId, value) => setSyllabus(prev => prev.map(s => s.id === sectionId ? { ...s, title: value } : s));
    const addSection = () => setSyllabus(prev => [...prev, { id: Date.now(), title: '', lessons: [{ id: Date.now(), title: '', videoSource: 'upload', videoFile: null, videoUrl: '' }] }]);
    const removeSection = (sectionId) => setSyllabus(prev => prev.filter(s => s.id !== sectionId));
    
    const handleLessonChange = (sectionId, lessonId, field, value) => {
        setSyllabus(prev => prev.map(s => {
            if (s.id === sectionId) {
                return { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l) };
            }
            return s;
        }));
    };
    
    const addLesson = (sectionId) => setSyllabus(prev => prev.map(s => s.id === sectionId ? { ...s, lessons: [...s.lessons, { id: Date.now(), title: '', videoSource: 'upload', videoFile: null, videoUrl: '' }] } : s));
    const removeLesson = (sectionId, lessonId) => setSyllabus(prev => prev.map(s => s.id === sectionId ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) } : s));
    
    const handleThumbnailChange = (e) => { const file = e.target.files[0]; if (file) { setThumbnail(file); setThumbnailPreview(URL.createObjectURL(file)); } };
    const handleIntroVideoChange = (e) => setIntroVideo(e.target.files[0]);
    const handleFreeCourseToggle = (e) => setFormData(prev => ({...prev, isFree: e.target.checked, price: e.target.checked ? '' : prev.price}));
    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const syllabusForSubmission = syllabus.map(section => ({
            ...section,
            lessons: section.lessons.map(lesson => ({
                ...lesson,
                videoFileName: lesson.videoSource === 'upload' && lesson.videoFile ? lesson.videoFile.name : null,
                videoFile: undefined // Remove file object before stringifying
            }))
        }));

        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submissionData.append(key, Array.isArray(value) ? value.join(',') : value);
        });
        
        submissionData.append('syllabus', JSON.stringify(syllabusForSubmission));
        if (thumbnail) submissionData.append('thumbnail', thumbnail);
        if (introVideo) submissionData.append('introVideo', introVideo);

        syllabus.forEach(section => {
            section.lessons.forEach(lesson => {
                if (lesson.videoSource === 'upload' && lesson.videoFile) {
                    submissionData.append('lessonVideos', lesson.videoFile, lesson.videoFile.name);
                }
            });
        });

        try {
            const response = await fetch(`${API_BASE_URL}/api/courses/create`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: submissionData
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'An error occurred.');
            }
            setSuccess(result.message);
            setTimeout(() => router.push('/dashboard/courses/all'), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (authLoading) {
        return <div className="bg-slate-50"><FormSkeleton /></div>;
    }

    return (
        <div className="bg-slate-50">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8"><h1 className="text-3xl font-bold tracking-tight text-slate-900">নতুন কোর্স যোগ করুন</h1><p className="mt-1 text-slate-500">এই ফর্মটি পূরণ করে আপনার নতুন কোর্সটি পাবলিশ করুন।</p></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <FormSection title="বেসিক তথ্য" icon={<BookOpen className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <InputField name="title" value={formData.title} onChange={handleChange} label="কোর্সের শিরোনাম" />
                            <InputField name="slug" value={formData.slug} onChange={handleChange} label="স্লাগ (URL)" />
                            <TextareaField name="description" value={formData.description} onChange={handleChange} label="কোর্সের বর্ণনা" />
                        </FormSection>

                        <FormSection title="ইন্সট্রাক্টর তথ্য" icon={<User className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <InputField name="instructorName" value={formData.instructorName} onChange={handleChange} label="ইন্সট্রাক্টরের নাম" />
                            <TextareaField name="instructorBio" value={formData.instructorBio} onChange={handleChange} label="ইন্সট্রাক্টরের পরিচিতি" />
                        </FormSection>

                        <FormSection title="আউটকাম ও রিকোয়ারমেন্ট" icon={<Target className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">এই কোর্স থেকে কি শিখবেন?</label>
                                {formData.outcomes.map((o, i) => <div key={i} className="flex gap-2 mb-2"><input type="text" value={o} onChange={(e) => handleListChange('outcomes', i, e.target.value)} className="w-full p-2 border rounded" /><button type="button" onClick={() => removeListItem('outcomes', i)} className="p-2 text-red-500"><Trash2 size={16}/></button></div>)}
                                <button type="button" onClick={() => addListItem('outcomes')} className="text-sm text-indigo-600"><Plus size={16} className="inline mr-1"/> আউটকাম যোগ করুন</button>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">কোর্সের প্রয়োজনীয়তা</label>
                                {formData.requirements.map((r, i) => <div key={i} className="flex gap-2 mb-2"><input type="text" value={r} onChange={(e) => handleListChange('requirements', i, e.target.value)} className="w-full p-2 border rounded" /><button type="button" onClick={() => removeListItem('requirements', i)} className="p-2 text-red-500"><Trash2 size={16}/></button></div>)}
                                <button type="button" onClick={() => addListItem('requirements')} className="text-sm text-indigo-600"><Plus size={16} className="inline mr-1"/> রিকোয়ারমেন্ট যোগ করুন</button>
                            </div>
                        </FormSection>

                        <FormSection title="কোর্স সিলেবাস" icon={<ListChecks className="mr-3 h-6 w-6 text-indigo-600"/>}>
                           <div className="space-y-6">
                                {syllabus.map((s, si) => <div key={s.id} className="border bg-slate-50 p-4 rounded-lg"><div className="flex justify-between mb-4"><input type="text" value={s.title} onChange={(e) => handleSectionTitleChange(s.id, e.target.value)} placeholder={`Section ${si + 1} Title`} className="text-lg font-semibold w-full bg-transparent" /><button type="button" onClick={() => removeSection(s.id)} className="p-2 text-red-500"><Trash2 size={18}/></button></div><div className="space-y-4 pl-2">{s.lessons.map((l, li) => <div key={l.id} className="bg-white p-3 rounded border"><div className="flex items-center gap-3"><GripVertical className="h-5 w-5 text-slate-400" /><span className="text-sm">{li + 1}.</span><input type="text" value={l.title} onChange={(e) => handleLessonChange(s.id, l.id, 'title', e.target.value)} placeholder="Lesson Title" className="flex-1 p-1 border rounded" /><button type="button" onClick={() => removeLesson(s.id, l.id)} className="p-2 text-red-500"><Trash2 size={16}/></button></div><div className="mt-3 pl-10"><div className="flex items-center gap-2 mb-2"><span className="text-xs">Video Source:</span><button type="button" onClick={() => handleLessonChange(s.id, l.id, 'videoSource', 'upload')} className={`px-2 py-1 text-xs rounded ${l.videoSource === 'upload' ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>Upload</button><button type="button" onClick={() => handleLessonChange(s.id, l.id, 'videoSource', 'link')} className={`px-2 py-1 text-xs rounded ${l.videoSource === 'link' ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>Link</button></div>{l.videoSource === 'upload' ? <input type="file" accept="video/*" onChange={(e) => handleLessonChange(s.id, l.id, 'videoFile', e.target.files[0])} /> : <input type="url" value={l.videoUrl} onChange={(e) => handleLessonChange(s.id, l.id, 'videoUrl', e.target.value)} placeholder="Video URL" className="w-full p-2 border rounded" />}</div></div>)}<button type="button" onClick={() => addLesson(s.id)} className="text-sm text-indigo-600"><Plus size={16} className="inline mr-1"/> Add Lesson</button></div></div>)}<button type="button" onClick={addSection} className="w-full text-center py-2 border-2 border-dashed rounded-lg text-indigo-600 hover:bg-indigo-50">Add Section</button>
                            </div>
                        </FormSection>
                    </div>

                    <div className="lg:col-span-1"><div className="sticky top-24 space-y-8">
                        <FormSection title="কোর্স মেটাডেটা" icon={<Tag className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <SelectField label="ক্যাটাগরি" name="category" value={formData.category} onChange={handleChange}><option value="">Select Category</option><option value="web-development">Web Development</option></SelectField>
                            <SelectField label="ভাষা" name="language" value={formData.language} onChange={handleChange}><option value="বাংলা">বাংলা</option><option value="English">English</option></SelectField>
                            <InputField label="কোর্সের সময়কাল" name="duration" value={formData.duration} onChange={handleChange} />
                            <InputField label="মোট লেসন সংখ্যা" name="numberOfLessons" type="number" value={formData.numberOfLessons} onChange={handleChange} />
                        </FormSection>
                        <FormSection title="মূল্য নির্ধারণ" icon={<DollarSign className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <div className="flex items-center space-x-2 p-3 bg-slate-100 rounded-md"><input type="checkbox" id="isFree" checked={formData.isFree} onChange={handleFreeCourseToggle} className="h-4 w-4 rounded"/><label htmlFor="isFree">This course is free</label></div>
                            {!formData.isFree && <InputField label="মূল্য (BDT)" name="price" type="number" value={formData.price} onChange={handleChange} />}
                        </FormSection>
                        <FormSection title="কোর্স মিডিয়া" icon={<ImageIcon className="mr-3 h-6 w-6 text-indigo-600"/>}>
                            <FileUploadField onFileSelect={handleThumbnailChange} preview={thumbnailPreview} Icon={ImageIcon} acceptedFiles="image/*" fileInfo={thumbnail} />
                            <hr className="my-4"/>
                            <FileUploadField onFileSelect={handleIntroVideoChange} fileInfo={introVideo} Icon={Film} acceptedFiles="video/*" />
                        </FormSection>
                        <FormSection title="পাবলিশ" icon={<CheckCircle className="mr-3 h-6 w-6 text-green-600"/>}>
                             <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center">
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'কোর্স পাবলিশ করুন'}
                            </button>
                            <button type="button" className="w-full mt-2 bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-md">Save as Draft</button>
                        </FormSection>
                    </div></div>
                </div>
                {/* Status Messages */}
                {error && <div className="mt-6 p-3 bg-red-100 text-red-800 rounded-md text-center">{error}</div>}
                {success && <div className="mt-6 p-3 bg-green-100 text-green-800 rounded-md text-center">{success}</div>}
            </form>
        </div>
    );
}

