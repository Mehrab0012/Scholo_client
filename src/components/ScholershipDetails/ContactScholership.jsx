
import React from 'react';

const ContactScholership = () => {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Have questions?</h3>
        <p className="text-slate-500 font-medium">Send a message directly to the scholarship administration at Stanford University.</p>
      </div>
      
      <form className="space-y-4 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
            <input 
              type="text" 
              placeholder="Full name" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none" 
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
          <textarea 
            rows={5} 
            placeholder="How can we help you?" 
            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#137fec] outline-none resize-none"
          ></textarea>
        </div>
        <button className="px-8 py-4 bg-[#137fec] text-white font-bold rounded-xl hover:bg-[#137fec]/90 transition-all shadow-lg shadow-[#137fec]/20">
          Send Message
        </button>
      </form>

      <div className="pt-8 border-t border-slate-100">
        <h4 className="font-bold text-slate-900 mb-4">Official Contact Channels</h4>
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#137fec]">mail</span>
            <span className="text-slate-600 font-medium">scholarships@stanford.edu</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#137fec]">call</span>
            <span className="text-slate-600 font-medium">+1 (650) 723-2300</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScholership;
