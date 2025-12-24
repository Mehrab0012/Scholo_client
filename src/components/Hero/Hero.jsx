import React from 'react';

const Hero = () => {
    return (
        <section className="pt-32 pb-16 ">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 md:px-12 md:py-32 text-center shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b  to-slate-900" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Fund Your <span className="text-primary">Ambitions</span>
                        </h1>
                        <p className="text-sm md:text-sm text-white/70 font-medium">
                            Join 50,000+ students finding their future through curated scholarship opportunities.
                        </p>

                        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
                            <div className="flex-1 flex items-center px-4 w-full">

                                <input
                                    type="text"
                                    placeholder="Major, University, or Goal..."
                                    className="w-full px-4 py-3 bg-transparent border border-transparent 
                                                focus:outline-none focus:ring-0
                                                text-text-main-light font-medium"                />
                            </div>
                            <button 
                            className="w-full md:w-auto cursor-pointer 
                            bg-primary hover:bg-primary-dark 
                            px-8 py-3 rounded-xl font-bold 
                            transition-all duration-200 ease-out
                            transform active:scale-95 hover:scale-[1.02]
                            shadow-lg hover:shadow-primary/30">                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;