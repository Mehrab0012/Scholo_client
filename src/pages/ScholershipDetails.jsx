import React, { useEffect, useState } from 'react';
import AboutScholership from '../components/ScholershipDetails/AboutScholership';
import ApplyScholership from '../components/ScholershipDetails/ApplyScholership';
import Overview from '../components/ScholershipDetails/Overview';
import ContactScholership from '../components/ScholershipDetails/ContactScholership';
import ReviewApplication from '../components/ScholershipDetails/ReviewApplication';
import { useParams } from 'react-router';
import api from '../api/axios';
import Loader from '../components/Loader/Loader';

const TabType = Object.freeze({
  OVERVIEW: 'Overview',
  REVIEW: 'Review Application',
  CONTACT: 'Contact Provider'
});

const ScholershipDetails = () => {
  const [scholarShipData, setScholarshipData] = useState(null); 
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const scholarShip = async () => {
    try {
      const { data } = await api.get(`/scholarships/${id}`);
      setScholarshipData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    scholarShip();
  }, [id]);

  const [activeTab, setActiveTab] = useState(TabType.OVERVIEW);

  if (loading || !scholarShipData) return <Loader></Loader>;

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
      case TabType.REVIEW:
        return <ReviewApplication />;
      case TabType.CONTACT:
        return <ContactScholership />;
      default:
        return (
          <Overview
            loading={loading}
            providerDescription={scholarShipData.description}
            eligibility={scholarShipData.eligibility}
            requirements={scholarShipData.requirements}
          />
        );
    }
  };

  const {
    title,
    provider,
    providerLogo,
    category,
    type,
    level
  } = scholarShipData;

  return (
    <div className="flex flex-col px-2 lg:px-30 gap-6 mt-16 mb-16 md:mb-32 md:mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Banner Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#137fec]/5 rounded-bl-full -mr-16 -mt-16"></div>
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="w-24 h-24 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center p-4 shrink-0">
                <img src={providerLogo} alt={provider} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">{title}</h1>
                <div className="mt-2 flex items-center gap-2 text-lg text-slate-500 font-medium">
                  Provided by: <span className="text-[#137fec] font-bold">{provider}</span>
                  <span className="material-symbols-outlined text-green-500 text-sm py-1 bg-blue-100 px-3 rounded-full shadow-xl shadow-blue-200 fill-current">verified</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#137fec]/10 text-[#137fec] text-sm font-semibold rounded-full border border-[#137fec]/20">{category}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-sm font-semibold rounded-full border border-emerald-100">{type}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full border border-slate-200">{level}</span>
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
                  className={`px-8 py-5 text-sm font-bold whitespace-nowrap transition-all relative ${activeTab === tab ? 'text-[#137fec]' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#137fec]"></div>}
                </button>
              ))}
            </div>

            <div className="p-8">
              {renderTabContent()}
            </div>
          </div>

          {/* About Provider Section */}
          <AboutScholership description={scholarShipData.description} provider={scholarShipData.provider} />
        </div>

        {/* Right Sidebar Area */}
        <div className="lg:col-span-4 sticky top-24">
          <ApplyScholership amount={scholarShipData.amount}
           fee={scholarShipData.fee} 
           deadline={scholarShipData.deadline} 
           frequency={scholarShipData.frequency}  />
        </div>
      </div>
    </div>
  );
};

export default ScholershipDetails;
