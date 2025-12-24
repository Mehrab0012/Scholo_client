
import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { FcExpand } from 'react-icons/fc';
import { MdOutlineMail } from 'react-icons/md';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-black/20 border rounded-xl px-4 mt-4 bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors group"
            >
                <span className="text-lg font-bold">{question}</span>

                <FcExpand className={`material-symbols-outlined text-2xl cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />

            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6' : 'max-h-0'}`}>
                <p className="text-text-secondary-light px-2 text-black/70 leading-relaxed font-medium">{answer}</p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        { question: "How does the matching algorithm work?", answer: "We analyze your profile, including major, GPA, and extracurriculars, to cross-reference with our database of 15,000+ active funding opportunities." },
        { question: "Is ScholarStream free to use?", answer: "Our basic discovery tools are completely free for students. We also offer a premium tier for automated application tracking and essay feedback." },
        { question: "Are these scholarships verified?", answer: "Yes, every listing goes through a 3-step verification process to ensure legitimacy and active deadline status." },
        { question: "Can international students apply?", answer: "Absolutely! We have a dedicated filter for international opportunities and DACA-eligible students." }
    ];

    return (
        <section className="py-24 px-4 bg-[#f7f7f7]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-text-main-light mb-12 text-center">Frequently Asked Questions</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className="bg-background-light/30 rounded-3xl p-6 md:p-10">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} {...faq} />
                        ))}
                    </div>

                    <div className='bg-blue-600 rounded-2xl text-white p-8 md:p-10 flex flex-col gap-10'>
                        <h4 className="font-bold text-3xl">
                            Still have questions?
                        </h4>
                        <div className="   text-white 
                    flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

                            <div className="max-w-xl space-y-10">

                                <p className="text-white/90 leading-relaxed">
                                    Our support team is here to help you navigate your scholarship journey.
                                    Don't hesitate to reach out if you need assistance.
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <MdOutlineMail className="text-xl bg-white/20 p-2 rounded-full" />
                                        <span className="text-sm md:text-base">
                                            support@scholarstream.com
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <FaPhoneAlt className="text-sm bg-white/20 p-2 rounded-full" />
                                        <span className="text-sm md:text-base">
                                            +1 (800) 123-4567
                                        </span>
                                    </div>
                                    <button className=" mt-10
                                    bg-white text-blue-700 font-semibold
                                    px-6 py-3 rounded-xl
                                    self-start
                                    transition-all duration-200
                                    hover:bg-blue-50 hover:scale-[1.03]
                                    active:scale-95
                                    ">
                                        Contact Support
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default FAQ;
