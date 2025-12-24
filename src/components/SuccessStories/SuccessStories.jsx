import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const SuccessStories = () => {
  const testimonials = [
    { name: "Sarah K.", role: "Physics Major", quote: "ScholarStream helped me find a niche grant for women in physics that I never would have found otherwise.", color: "bg-blue-600" },
    { name: "David L.", role: "Art History", quote: "The interface is so clean. I applied to 5 scholarships in one weekend and won two!", color: "bg-indigo-600" },
    { name: "Maria R.", role: "Nursing", quote: "I managed to cover my entire final year tuition. This platform is a lifesaver for student debt.", color: "bg-teal-600" }
  ];

  return (
    <section className="py-16 md:py-28 px-4 bg-background-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-text-main-light mb-16">Community Success</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#f7f7f7]  p-10 rounded-3xl relative shadow-md">
                <FaQuoteRight className="
                    text-blue-200 absolute 
                    top-6 right-6 
                    text-3xl opacity-40
                " />
              <p className="text-text-secondary-light font-medium italic mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-text-main-light">{t.name}</h4>
                  <p className="text-xs text-text-secondary-light">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;