
import React from 'react';

const AboutScholership = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png"
            alt="Stanford University"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-extrabold text-slate-900">About Stanford University</h3>
          <p className="text-slate-500 font-medium leading-relaxed mt-2 text-sm">
            Stanford University is a private research university in Stanford, California. It is one of the world's
            leading research and teaching institutions, dedicated to finding solutions to big challenges and to
            preparing students for leadership in a complex world.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AboutScholership;
