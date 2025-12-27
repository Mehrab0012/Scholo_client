import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaQuoteRight } from "react-icons/fa";

import "swiper/css";

const SuccessStories = () => {
  const testimonials = [
    {
      name: "Sarah K.",
      role: "Physics Major",
      quote: "ScholarStream helped me find a niche grant for women in physics that I never would have found otherwise.",
      color: "bg-blue-600",
    },
    {
      name: "David L.",
      role: "Art History",
      quote: "The interface is so clean. I applied to 5 scholarships in one weekend and won two!",
      color: "bg-indigo-600",
    },
    {
      name: "Maria R.",
      role: "Nursing",
      quote: "I managed to cover my entire final year tuition. This platform is a lifesaver for student debt.",
      color: "bg-teal-600",
    },
    {
      name: "James P.",
      role: "Computer Science",
      quote: "I found funding for my capstone project within minutes. Incredible experience.",
      color: "bg-purple-600",
    },
    {
      name: "Aisha N.",
      role: "Biomedical Engineering",
      quote: "This platform matched me with scholarships perfectly aligned to my research interests.",
      color: "bg-pink-600",
    },
    {
      name: "Lucas M.",
      role: "Business Administration",
      quote: "Applying was effortless and transparent. Highly recommended for busy students.",
      color: "bg-orange-600",
    },
    {
      name: "Emily S.",
      role: "Psychology",
      quote: "I never realized how many scholarships I was eligible for until I used this.",
      color: "bg-rose-600",
    },
    {
      name: "Omar H.",
      role: "Architecture",
      quote: "The clean UI and smart filters saved me weeks of research time.",
      color: "bg-cyan-600",
    },
    {
      name: "Chen W.",
      role: "Mechanical Engineering",
      quote: "ScholarStream simplified my search and helped me secure international funding.",
      color: "bg-emerald-600",
    },
  ];

  return (
    <section className="py-16 md:py-28 px-4 bg-background-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-text-main-light mb-16">
          Community Success
        </h2>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={24}
          loop
          autoplay={{
            delay:30,
            disableOnInteraction: false,
          }}
          speed={4000}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="select-none"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="h-auto">
              <div className="h-full mb-3">
                <div className="bg-[#f7f7f7] py-12 px-5 rounded-3xl relative shadow-lg shadow-blue-100 
                      h-full flex flex-col">

                  <FaQuoteRight className="text-blue-200 absolute top-6 right-6 text-3xl opacity-40" />

                  {/* Quote */}
                  <p className="text-text-secondary-light line-clamp-2 font-medium italic leading-relaxed mb-8">
                    “{t.quote}”
                  </p>

                  {/* Author — pushed to bottom */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold`}
                    >
                      {t.name[0]}
                    </div>

                    <div>
                      <h4 className="font-bold text-text-main-light">
                        {t.name}
                      </h4>
                      <p className="text-xs text-text-secondary-light">
                        {t.role}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
