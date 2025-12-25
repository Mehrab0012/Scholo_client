import React from 'react';
import { Search } from '../components/BrowseScholarshipComponents/Search';
import { FilterBy } from '../components/BrowseScholarshipComponents/FilterBy';
import { PostScholarship } from '../components/BrowseScholarshipComponents/PostScholarship';
import { BrowseHeading } from '../components/BrowseScholarshipComponents/BrowseHeading';
import { MOCK_SCHOLARSHIPS } from '../components/BrowseScholarshipComponents/SiteData';
import { ScholarshipCard } from '../components/BrowseScholarshipComponents/ScholarshipCard';
import { Pagination } from '../components/BrowseScholarshipComponents/Pagination';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { Outlet } from 'react-router';


const BrowseScholarships = () => {
  return (
    
    <div className="max-w-7xl mx-auto mt-16 lg:mt-32 w-full px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
        <Search />
        <FilterBy />
        <PostScholarship />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <BrowseHeading />
        
        {/* Results Counter */}
        <div className="mb-4 flex items-center gap-2">
          <IoCheckmarkDoneOutline className='font-2xl text-green-500' />

          <p className="text-sm font-medium text-[#111418]">
            Showing <span className="font-bold">124</span> scholarships //dynamic part
          </p>
        </div>

        {/* List of Cards */}
        <div className="flex flex-col gap-4 mb-8">
          {MOCK_SCHOLARSHIPS.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>

        <Pagination />
      </main>
    </div>
    
  );
};
export default BrowseScholarships;