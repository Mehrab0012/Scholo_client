
import React from 'react';
import { MdContentPasteSearch } from 'react-icons/md';

export const FilterBar = ({ onSearchChange }) => {
 

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
     
    </div>
  );
};
