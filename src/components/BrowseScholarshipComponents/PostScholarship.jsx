import React from 'react';

export const PostScholarship = () => {
  return (
    <div className="bg-[#137fec]/5 rounded-xl border border-[#137fec]/20 px-5 py-10 flex flex-col items-center text-center gap-3">
      <div className="bg-[#137fec]/10 py-3 px-5 rounded-lg">
        <span className="material-symbols-outlined text-[#137fec] font-bold  text-3xl">school</span>
      </div>
      <p className="text-[#1114188e] font-medium text-sm">Want to post a scholarship?</p>
      <button className="w-full bg-[#137fec] cursor-pointer hover:bg-[#0b5ed7] text-white font-medium py-2 rounded-lg text-sm transition-colors">
        Partner with Us
      </button>
    </div>
  );
};