import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import api from '../../api/axios';

export const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        // Fetching matches with a limit of 4 for quick view
        const { data } = await api.get(`/scholarships?search=${query}&limit=4`);
        setSuggestions(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    // Debounce: Wait 300ms after user stops typing to call API
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (id) => {
    setShowDropdown(false);
    setQuery("");
    // Redirect to the details page
    navigate(`/scholership-details/${id}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative">
      <label className="flex flex-col w-full text-gray-500 font-semibold tracking-wider mb-2 text-xs">
        QUICK SEARCH
      </label>
      
      <div className='relative'>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setShowDropdown(true)}
          className="flex w-full bg-gray-50 text-[#111418] border border-transparent focus:border-blue-400 rounded-lg px-3 py-3 text-sm placeholder:text-gray-400 outline-none transition-all" 
          placeholder="Type scholarship name..." 
        />
        <FaSearch className="absolute top-3.5 right-3 text-gray-400" />

        {/* --- LIVE SEARCH DROPDOWN --- */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
            {suggestions.map((item) => (
              <div 
                key={item._id}
                onClick={() => handleSelect(item._id)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 transition-colors border-b last:border-none border-gray-50"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0 uppercase">
                  {item.provider ? item.provider[0] : 'S'}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-gray-900 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium truncate">
                    {item.provider} • ${item.amount?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            <div 
              onClick={() => navigate(`/browse-scholarships?search=${query}`)}
              className="px-4 py-2 bg-gray-50 text-[10px] font-bold text-center text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              See all results
            </div>
          </div>
        )}

        {/* Empty State */}
        {showDropdown && query.length >= 2 && suggestions.length === 0 && (
          <div className="absolute top-full left-0 w-full bg-white mt-2 p-4 rounded-xl border border-gray-200 shadow-xl z-50 text-center text-xs text-gray-400">
            No scholarships match your search.
          </div>
        )}
      </div>

      {/* Backdrop to close dropdown when clicking outside */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </div>
  );
};