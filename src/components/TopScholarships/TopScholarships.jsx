import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Updated color helper to include "STEM" and match your specific categories
  const getColor = (category) => {
    const colors = {
      STEM: "text-blue-600 bg-blue-50",
      Engineering: "text-indigo-600 bg-indigo-50",
      Medical: "text-red-600 bg-red-50",
      Arts: "text-purple-600 bg-purple-50",
      Science: "text-green-600 bg-green-50",
      Default: "text-slate-600 bg-slate-50"
    };
    return colors[category] || colors.Default;
  };

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        setLoading(true);
        // Fetch top 4 items for the "Editor's Choice" section
        const { data } = await api.get('/scholarships?limit=4');
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching top scholarships:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopScholarships();
  }, []);

  if (loading) return null; // Or a small spinner

  return (
    <section className="py-20 px-4 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[#111418] mb-2 tracking-tight">Editor's Choice</h2>
            <p className="text-gray-500 font-medium text-sm">Verified opportunities with high success rates.</p>
          </div>
          <button 
            onClick={() => navigate('/browse-scholarships')}
            className="hidden md:block text-[#137fec] cursor-pointer font-bold hover:underline transition-all"
          >
            See all scholarships ({scholarships.length}+)
          </button>
        </div>

        {/* Scholarship Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scholarships.map((item) => (
            <div 
              key={item._id} 
              onClick={() => navigate(`/scholership-details/${item._id}`)}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl cursor-pointer bg-white flex flex-col justify-between"
            >
              <div>
                {/* Provider Avatar / Logo Placeholder */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black mb-6 transition-transform group-hover:scale-110 duration-300 ${getColor(item.category)}`}>
                  {item.providerLogo ? (
                    <img src={item.providerLogo} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    item.provider ? item.provider[0] : 'S'
                  )}
                </div>

                {/* Provider Name */}
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                  {item.provider}
                </span>

                {/* Scholarship Title */}
                <h3 className="text-lg font-bold text-[#111418] mb-4 group-hover:text-[#137fec] transition-colors line-clamp-2 leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Bottom Info Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Award</span>
                    <span className="text-[#137fec] font-black text-lg">
                        ${item.amount.toLocaleString()}
                    </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getColor(item.category)}`}>
                  {item.level?.split(' ')[0] || item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <button 
          onClick={() => navigate('/browse-scholarships')}
          className='flex m-auto mt-12 rounded-full border border-gray-200 bg-white cursor-pointer transition-all duration-300 ease-out transform active:scale-95 shadow-md hover:shadow-lg px-10 py-3 text-[#137fec] font-bold text-sm'
        >
          View All Opportunities
        </button>
      </div>
    </section>
  );
};

export default TopScholarships;