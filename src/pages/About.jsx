import React from 'react';
import { FiTarget, FiUsers, FiGlobe, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const About = () => {
    const stats = [
        { label: 'Scholarships Awarded', value: '$12M+', icon: <FiTrendingUp />, color: 'blue' },
        { label: 'Global Students', value: '45k+', icon: <FiUsers />, color: 'emerald' },
        { label: 'Partner Institutions', value: '120+', icon: <FiGlobe />, color: 'purple' },
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen pt-16  lg:pt-34 pb-12">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-10 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-block px-4 py-1.5 bg-blue-50 text-[#137fec] rounded-full text-xs font-black tracking-widest uppercase mb-6">
                            Our Mission
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
                            Bridging the gap between <span className="text-[#137fec]">Ambition</span> and <span className="text-[#137fec]">Education.</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                            ScholarStream was founded on a simple belief: Talent is universal, but opportunity is not. 
                            We work day and night to ensure that every deserving student, regardless of their background, 
                            can access the financial support they need to change the world.
                        </p>
                        <div className="flex flex-col gap-4">
                            {['Verified Global Scholarships', 'Direct Application Tracking', 'Zero Hidden Fees'].map(item => (
                                <div key={item} className="flex items-center gap-3 font-bold text-slate-700">
                                    <FiCheckCircle className="text-emerald-500 text-xl" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-blue-600 rounded-[3rem] overflow-hidden rotate-3 shadow-2xl shadow-blue-200">
                            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" alt="Students" className="w-full h-full object-cover -rotate-3 scale-110" />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-xl hidden md:block">
                            <p className="text-4xl font-black text-slate-900">98%</p>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="bg-white py-20 border-y border-slate-50 mb-24">
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <div className={`w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-2xl mb-6 transition-all duration-500 group-hover:scale-110 
                                    ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
                                <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-16">Why ScholarStream?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: 'Transparency', desc: 'Every application is tracked in real-time. No black boxes.', icon: <FiTarget /> },
                        { title: 'Community', desc: 'Join a network of thousands of global scholars.', icon: <FiUsers /> },
                        { title: 'Innovation', desc: 'We use AI to match you with the best financial aid.', icon: <FiTrendingUp /> },
                    ].map((val, i) => (
                        <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all">
                            <div className="text-2xl text-[#137fec] mb-6 flex justify-center">{val.icon}</div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">{val.title}</h3>
                            <p className="text-slate-500 font-medium text-sm">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;