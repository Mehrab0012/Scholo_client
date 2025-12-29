
import React from 'react';
import { MdContentPasteSearch } from 'react-icons/md';

export const FilterBar = ({ 
  activeFilter, 
  onFilterChange,
  onSearchChange
}) => {
  const filters = ['All Status', 'Pending', 'Processing', 'Completed'];

  return (
    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
      <div className="relative w-full md:w-80">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          <MdContentPasteSearch className='text-2xl' />


        </div>
        <input 
          type="text" 
          placeholder="Search by scholarship name..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-1 md:pb-0">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
