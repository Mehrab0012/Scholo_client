import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FiShieldOff, FiArrowLeft, FiHome, FiLock } from 'react-icons/fi';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8fafc] mt-16 lg:mt-32 flex items-center justify-center p-6">
            <div className="max-w-lg w-full text-center">
                {/* Visual Icon Section */}
                <div className="relative mb-8 flex justify-center">
                    <div className="w-32 h-32 bg-red-50 rounded-[2.5rem] flex items-center justify-center rotate-12 transition-transform hover:rotate-0 duration-500">
                        <FiShieldOff className="text-red-500 text-6xl" />
                    </div>
                    {/* Floating Lock Icon */}
                    <div className="absolute -top-2 right-1/3 bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50">
                        <FiLock className="text-orange-500 text-xl" />
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    Access Denied
                </h1>
                <p className="text-slate-500 mb-10 leading-relaxed">
                    Oops! It looks like you don't have the required permissions 
                    to view this page. If you believe this is an error, please 
                    contact your administrator or try switching accounts.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <FiArrowLeft /> Go Back
                        </button>
                        
                        <Link to="/">
                            <button className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                                <FiHome /> Home
                            </button>
                        </Link>
                    </div>

                    {/* Secondary Action */}
                    <Link to="/authentication/logIn" className="mt-4 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                        Switch to a different account?
                    </Link>
                </div>

            
            </div>
        </div>
    );
};

export default Unauthorized;