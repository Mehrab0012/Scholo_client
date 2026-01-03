import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaSearch } from 'react-icons/fa';
import api from '../../api/axios';

const Hero = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // 1. Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 2. Fetch results from backend as user types
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (query.trim().length > 1) {
                try {
                    const { data } = await api.get(`/scholarships?search=${query}&limit=5`);
                    setResults(data);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Search failed", error);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelect = (id) => {
        setIsOpen(false);
        setQuery("");
        navigate(`/scholership-details/${id}`);
    };

    return (
        <section className="pt-22 md:pt-32 pb-3  md:pb-16">
            <div className="max-w-6xl mx-auto" ref={searchRef}>
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 md:px-12 md:py-32 text-center shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b to-slate-900" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Fund Your <span className="text-blue-500">Ambitions</span>
                        </h1>
                        <p className="text-sm md:text-sm text-white/70 font-medium">
                            Join 50,000+ students finding their future through curated scholarship opportunities.
                        </p>

                        {/* --- SEARCH BAR CONTAINER --- */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl p-2 shadow-2xl">
                                <div className="flex-1 flex items-center px-4 w-full">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onFocus={() => query.length > 1 && setIsOpen(true)}
                                        placeholder="Major, University, or Goal..."
                                        className="w-full px-4 py-3 bg-transparent border-none focus:outline-none text-slate-900 font-medium"
                                    />
                                </div>
                                <button 
                                    onClick={() => navigate(`/browse-scholarships?search=${query}`)}
                                    className="w-full md:w-auto cursor-pointer bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition-all text-white shadow-lg"
                                >
                                    Search
                                </button>
                            </div>

                            {/* --- LIVE DROPDOWN RESULTS --- */}
                            {isOpen && results.length > 0 && (
                                <div className="absolute top-full left-0 w-full  bg-white mt-3 rounded-2xl border border-slate-100 shadow-2xl z-100000 overflow-hidden text-left">
                                    <div className="py-2">
                                        {results.map((item) => (
                                            <div 
                                                key={item._id}
                                                onClick={() => handleSelect(item._id)}
                                                className="px-6 py-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition-all"
                                            >
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 truncate">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                                        {item.provider}
                                                    </span>
                                                </div>
                                                <div className="text-right ml-4 shrink-0">
                                                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
                                                        ${item.amount?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div 
                                        onClick={() => navigate(`/browse-scholarships?search=${query}`)}
                                        className="bg-slate-50 p-3 text-center border-t border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors"
                                    >
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                            View all results for "{query}"
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* No Results found logic */}
                            {isOpen && query.length > 1 && results.length === 0 && (
                                <div className="absolute top-full left-0 w-full bg-white mt-3 p-8 rounded-2xl border border-slate-100 shadow-2xl z-[999] text-center">
                                    <p className="text-sm font-bold text-slate-400">No scholarships matching "{query}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;