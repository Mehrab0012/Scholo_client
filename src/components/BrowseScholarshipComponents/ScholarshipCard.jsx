import React from 'react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router';

export const ScholarshipCard = ({ scholarship }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row gap-5 items-start">
            {/* Logo */}
            <div className="shrink-0 max-md:flex max-md:justify-between max-md:items-center max-md:w-full">
                <div className="size-16 rounded-lg border border-gray-100 p-2 bg-white flex items-center justify-center overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={scholarship.logo}
                        alt={scholarship.institution}
                    />
                </div>
                <span className="inline-flex md:hidden max-md:flex items-center gap-1 rounded-full bg-green-100 px-8 py-2 text-xs font-semibold text-green-700">
                    <span className=" text-sm font-medium">payments</span>
                    {scholarship.amount}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-[#111418] group-hover:text-[#137fec] transition-colors leading-tight">
                            {scholarship.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">{scholarship.institution}</p>
                    </div>

                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {scholarship.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                        {scholarship.isUrgent ? (
                            <>
                                <span>Deadline: <span className="text-red-500 font-medium">{scholarship.deadline}</span></span>
                            </>
                        ) : (
                            <>
                                <span>Deadline: <span className="text-[#111418] font-medium">{scholarship.deadline}</span></span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center  gap-1.5">
                        <span className="material-symbols-outlined text-md font-bold">Location:</span>
                        <span>{scholarship.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-md font-bold">school:</span>
                        <span>{scholarship.degree}</span>
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="w-full md:w-auto self-stretch md:self-auto flex items-center gap-5">

                <span className="inline-flex max-md:hidden items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <span className="material-symbols-outlined text-sm font-medium">payments</span>
                    {scholarship.amount}
                </span>

                <Link to={'/scholership-details'}>
                    <button className="w-full md:w-auto whitespace-nowrap cursor-pointer bg-[#137fec] hover:bg-[#0b5ed7] text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                        View Details
                        <FaRegArrowAltCircleRight className='text-xl' />

                    </button>
                </Link>
            </div>
        </div>
    );
};