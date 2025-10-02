import ReactPlayer from 'react-player';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, videoUrl, onClose }) {
    // যদি Modal খোলা না থাকে, তাহলে কিছুই দেখাবে না
    if (!isOpen) return null;

    return (
        // Modal Overlay (কালো ব্যাকগ্রাউন্ড)
        <div 
            onClick={onClose} 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
            {/* Modal Content (সাদা বক্স) */}
            <div 
                onClick={(e) => e.stopPropagation()} // এই অংশে ক্লিক করলে Modal বন্ধ হবে না
                className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl aspect-video overflow-hidden"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1.5 z-10 hover:bg-opacity-75 transition"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                {/* React Player */}
                <ReactPlayer
                    src={videoUrl}
                    width="100%"
                    height="100%"
                    playing={true} // Modal খোলার সাথে সাথে ভিডিও প্লে হবে
                    controls={true}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                onContextMenu: e => e.preventDefault(),
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}