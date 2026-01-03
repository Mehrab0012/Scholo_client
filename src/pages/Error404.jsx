import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen mt-16 lg:mt-32 bg-[#f8fafc] flex items-center justify-center p-6">
            <div className="max-w-lg w-full text-center">
                {/* Visual Icon Section */}
                <div className="relative mb-8 flex justify-center">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center animate-bounce">
                        <FiSearch className="text-blue-600 text-6xl" />
                    </div>
                    {/* Floating "404" Bubbles */}
                    <div className="absolute top-0 right-1/4 bg-red-100 text-red-600 text-xs font-black px-3 py-1 rounded-full shadow-sm">404</div>
                    <div className="absolute bottom-4 left-1/4 bg-indigo-100 text-indigo-600 text-xs font-black px-3 py-1 rounded-full shadow-sm">LOST</div>
                </div>

                {/* Text Content */}
                <h1 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter">
                    Oops!
                </h1>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    The page you are looking for might have been removed, 
                    had its name changed, or is temporarily unavailable. 
                    Let's get you back on track!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <FiArrowLeft /> Go Back
                    </button>
                    
                    <Link to="/">
                        <button className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                            <FiHome /> Return Home
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Error404;