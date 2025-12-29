import React from 'react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router';

export const ScholarshipCard = ({ data }) => {

    const { id,
        amount,
        category,
        deadline,
        title,
        provider,
        providerLogo,
        description,
    } = data;
  
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-5 items-start">
            {/* Logo */}
            <div className="shrink-0 max-md:flex max-md:justify-between max-md:items-center max-md:w-full">
                <div className="size-16 rounded-lg border border-gray-100 p-2 bg-white flex items-center justify-center overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={providerLogo}
                        alt={provider}
                    />
                </div>
                <span className="inline-flex md:hidden max-md:flex items-center gap-1 rounded-full bg-green-100 px-8 py-2 text-xs font-semibold text-green-700">
                    <span className=" text-sm font-medium">payments</span>
                    {amount}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-[#111418] group-hover:text-[#137fec] transition-colors leading-tight">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">{provider}</p>
                    </div>

                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">


                        <span>Deadline: <span className="text-[#111418] font-medium">{deadline}</span></span>


                    </div>
                   
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-md font-bold">Category:</span>
                        <span>{category}</span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="w-full md:w-auto self-stretch md:self-auto flex items-center gap-5">

                <span className="inline-flex max-md:hidden items-center gap-1 
                 rounded-full bg-green-100 px-3 py-1 text-md font-bold text-blue-800">
                    <span className="material-symbols-outlined text-sm font-medium">payments</span>
                    ${amount}
                </span>

                <Link to={`/scholership-details/${id}`}>
                    <button className="w-full md:w-auto whitespace-nowrap cursor-pointer bg-[#137fec] hover:bg-[#0b5ed7] text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                        View Details
                        <FaRegArrowAltCircleRight className='text-xl' />

                    </button>
                </Link>
            </div>
        </div>
    );
};