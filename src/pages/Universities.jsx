import React, { useState } from 'react';

import { FiSearch, FiMapPin, FiAward, FiExternalLink, FiBookOpen } from 'react-icons/fi';

const Universities = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Mock Data for Universities
    const universityList = [
        { id: 1, name: "Stanford University", location: "California, USA", ranking: "#1 Global", students: "17k+", image: "https://cdn.britannica.com/25/121725-050-8BF363EC/Hoover-Tower-Stanford-University-California.jpg" },
        { id: 2, name: "Oxford University", location: "Oxford, UK", ranking: "#2 Global", students: "24k+", image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "MIT", location: "Massachusetts, USA", ranking: "#1 Tech", students: "11k+", image: "https://edunirvana.in/wp-content/uploads/2025/07/mit_16x9_0.jpg" },
        { id: 4, name: "Eth Zurich", location: "Zurich, Switzerland", ranking: "#7 Global", students: "22k+", image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=400" },
        { id: 5, name: "University of Toronto", location: "Toronto, Canada", ranking: "#18 Global", students: "60k+", image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=400" },
        { id: 6, name: "National University of Singapore", location: "Singapore", ranking: "#11 Global", students: "38k+", image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=400" },
    ];

    const filteredUniversities = universityList.filter(uni => 
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        uni.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#f8fafc] mt-16 lg:mt-32 min-h-screen pt-24 pb-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        Partner <span className="text-[#137fec]">Universities</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                        Explore world-class institutions offering scholarships through our platform. 
                        Find your future home among the best universities globally.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                    <input 
                        type="text" 
                        placeholder="Search by name or location..."
                        className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 outline-none focus:ring-2 focus:ring-[#137fec] transition-all"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredUniversities.map((uni) => (
                        <div key={uni.id} className="bg-white rounded-[2.5rem] border border-slate-50 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                            <div className="h-56 relative overflow-hidden">
                                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-[#137fec] shadow-sm">
                                    {uni.ranking}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-2">{uni.name}</h3>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                    <FiMapPin /> {uni.location}
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#137fec]">
                                            <FiBookOpen />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Students</p>
                                            <p className="text-sm font-bold text-slate-700">{uni.students}</p>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-slate-50 text-slate-400 hover:bg-[#137fec] hover:text-white rounded-2xl transition-all">
                                        <FiExternalLink />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Universities;