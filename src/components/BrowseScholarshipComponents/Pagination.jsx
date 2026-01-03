import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const Pagination = ({setLimit}) => {
    return (
        <div className="flex items-center justify-center md:justify-between pt-8 border-t border-gray-100">

            <button onClick={()=>setLimit(prev=>prev+6)}
                className="px-10 text-md cursor-pointer py-3 rounded-xl bg-blue-500 text-white font-medium tracking-wide
         transition-all duration-600 ease-out
         hover:bg-blue-700 hover:shadow-lg
         m-auto
         active:scale-95 active:shadow-md
         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
            Browse More
            </button>
        </div>
    );
};