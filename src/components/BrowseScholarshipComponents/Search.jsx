import React from 'react';
import { FaSearch } from 'react-icons/fa';

export const Search = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <label className="flex flex-col w-full text-gray-500 font-semibold tracking-wider">SEARCH</label>

         <div className='relative'>
             <input 
            className="flex w-full flex-1 bg-gray-50 text-[#111418] border-none focus:border-none px-3 py-3 text-sm placeholder:text-gray-400 " 
            placeholder="Keyword or ID..." 
          />
        <FaSearch className={`absolute top-2 cursor-pointer right-3 text-2xl font-bold`} />

         </div>
      
    </div>
  );
};