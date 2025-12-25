
import React, { useState } from 'react';
import AboutScholership from '../components/ScholershipDetails/AboutScholership';
import ApplyScholership from '../components/ScholershipDetails/ApplyScholership';
import Overview from '../components/ScholershipDetails/Overview';
import ContactScholership from '../components/ScholershipDetails/ContactScholership';
import ReviewApplication from '../components/ScholershipDetails/ReviewApplication';


const TabType = Object.freeze({
  OVERVIEW: 'Overview',
  REVIEW: 'Review Application',
  CONTACT: 'Contact Provider'
});

const ScholershipDetails = () => {
  const [activeTab, setActiveTab] = useState(TabType.OVERVIEW);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.OVERVIEW:
        return <Overview />;
      case TabType.REVIEW:
        return <ReviewApplication />;
      case TabType.CONTACT:
        return <ContactScholership />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex flex-col px-2 lg:px-30 gap-6 mt-16 mb-16 md:mb-32 md:mt-32">


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Content Area */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Banner Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
             {/* Abstract background curve */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#137fec]/5 rounded-bl-full -mr-16 -mt-16"></div>
            
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-24 h-24 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center p-4 shrink-0">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png" 
                  alt="Stanford University"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Global Future Leaders Scholarship
                </h1>
                <div className="mt-2 flex items-center gap-2 text-lg text-slate-500 font-medium">
                  Provided by: <span className="text-[#137fec] font-bold">Stanford University</span>
                  <span className="material-symbols-outlined text-[#137fec] text-xl fill-current">verified</span>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#137fec]/10 text-[#137fec] text-sm font-semibold rounded-full border border-[#137fec]/20">
                    Engineering
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-100">
                    Merit-based
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full border border-slate-200">
                    Undergraduate Only
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tabbed Content Area */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
              {Object.values(TabType).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-5 text-sm font-bold whitespace-nowrap transition-all relative ${
                    activeTab === tab 
                      ? 'text-[#137fec]' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#137fec]"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {renderTabContent()}
            </div>
          </div>

          {/* About Provider Section */}
          <AboutScholership />
        </div>

        {/* Right Sidebar Area */}
        <div className="lg:col-span-4 sticky top-24">
          <ApplyScholership />
        </div>
      </div>
    </div>
  );
};

export default ScholershipDetails;
