import React from 'react';

export const BrowseHeading = () => {
    const options = ["Newest Added","Relevance","Deadline: Soonest","Amount: High to Low"];
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
                <h1 className="text-[#111418] text-3xl font-black tracking-tight mb-2">Browse Scholarships</h1>
                <p className="text-gray-500 text-base">Find financial aid opportunities that match your goals.</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                <form className="relative min-w-40">
                    <select
                        defaultValue="newest"
                        className="w-full appearance-none bg-white border border-gray-200
                         text-[#111418] text-sm rounded-lg pl-3 pr-10 py-2.5
                         focus:ring-[#137fec] focus:border-[#137fec] cursor-pointer"
                    >
                        {
                            options.map((item)=>( 
                                 <option value={item}>{item}</option>
                            ))
                        }
                        
                    </select>
                </form>
            </div>
        </div>
    );
};