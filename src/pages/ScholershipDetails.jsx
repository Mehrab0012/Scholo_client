import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../api/axios';

// Component Imports
import AboutScholership from '../components/ScholershipDetails/AboutScholership';
import ApplyScholership from '../components/ScholershipDetails/ApplyScholership';
import Overview from '../components/ScholershipDetails/Overview';
import ContactScholership from '../components/ScholershipDetails/ContactScholership';
import ReviewSection from '../components/ReviewSection/ReviewSection';
import Loader from '../components/Loader/Loader';

// Updated Tab Types to include Reviews
const TabType = Object.freeze({
  OVERVIEW: 'Overview',
  REVIEWS: 'Student Reviews', // Added this
});

const ScholershipDetails = () => {
  const [scholarShipData, setScholarshipData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(TabType.OVERVIEW);

  // Fetch Scholarship Details
  const fetchScholarship = async () => {
    try {
      const { data } = await api.get(`/scholarships/${id}`);
      setScholarshipData(data);
    } catch (error) {
      console.error("Error fetching scholarship:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchScholarship();
  }, [id]);

  if (loading || !scholarShipData) return <Loader />;

  // Logic to switch between tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.OVERVIEW:
        return (
          <Overview
            loading={loading}
            providerDescription={scholarShipData.description}
            eligibility={scholarShipData.eligibility}
            requirements={scholarShipData.requirements}
          />
        );
      case TabType.REVIEWS:
        // Pass the scholarship ID to fetch reviews for this specific scholarship
        return <ReviewSection scholarshipId={id} />;
      case TabType.CONTACT:
        return <ContactScholership scholarshipData={scholarShipData} />;
      default:
        return null;
    }
  };

  const {
    provider:universityName, 
    scholarshipName,
    providerLogo,
    category,
    level:degree,
    type:scholarshipType,
    description,
    amount,
    fee,
    deadline,
    frequency
  } = scholarShipData;
  return (
    <div className="flex flex-col px-4 lg:px-30 gap-6 mt-16 mb-16 md:mb-32 md:mt-32 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Banner Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#137fec]/5 rounded-bl-full -mr-16 -mt-16"></div>
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-24 h-24 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center p-4 shrink-0">
                <img 
                  src={providerLogo || 'https://via.placeholder.com/150'} 
                  alt={universityName} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="flex-1 ">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {scholarshipName || universityName}
                </h1>
                <div className="mt-5 flex items-center gap-2 text-lg text-slate-500 font-medium">
                  Provided by: <span className="text-[#137fec] font-bold">{universityName}</span>
                  <span className="material-symbols-outlined text-green-500 text-sm py-1 bg-blue-100 px-3 rounded-full shadow-xl shadow-blue-200 fill-current">
                    verified
                  </span>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#137fec]/10 text-[#137fec] text-sm font-semibold rounded-full border border-[#137fec]/20">
                    {category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-100">
                    {scholarshipType || 'Full-time'}
                  </span>
                  {
                    degree && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full border border-slate-200">
                    {degree}
                  </span>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Main Tabbed Content Area */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
            <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
              {Object.values(TabType).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-5 text-sm font-bold whitespace-nowrap transition-all relative outline-none ${
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

            <div className="p-8">
              {renderTabContent()}
            </div>
          </div>

          {/* About Provider Section */}
          <AboutScholership 
            description={description} 
            provider={universityName} 
          />
        </div>

        {/* Right Sidebar Area (4 Columns) */}
        <div className="lg:col-span-4 sticky top-24">
          <ApplyScholership 
            id={id}
            amount={amount}
            fee={fee}
            deadline={deadline}
            frequency={frequency} 
          />
        </div>

      </div>
    </div>
  );
};

export default ScholershipDetails;