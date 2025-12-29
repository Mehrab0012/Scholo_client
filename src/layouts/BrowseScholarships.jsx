import React, { useEffect, useState } from 'react';
import { Search } from '../components/BrowseScholarshipComponents/Search';
import { FilterBy } from '../components/BrowseScholarshipComponents/FilterBy';
import { PostScholarship } from '../components/BrowseScholarshipComponents/PostScholarship';
import { BrowseHeading } from '../components/BrowseScholarshipComponents/BrowseHeading';
import { ScholarshipCard } from '../components/BrowseScholarshipComponents/ScholarshipCard';
import { Pagination } from '../components/BrowseScholarshipComponents/Pagination';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { Outlet } from 'react-router';
import api from '../api/axios';
import { MdDescription } from 'react-icons/md';


const BrowseScholarships = () => {
  const [scholarshipData, setScholarshipData] = useState([]);
  const [limit, setLimit] = useState(6)

  const getScholarships = async () => {
    try {
      const { data } = await api.get(`/scholarships?limit=${limit}`);

      //for getting specific data from database
      const filtered = data.map(({ _id: id, title, provider, providerLogo, description, amount, category, deadline }) => ({
        id,
        amount,
        category,
        deadline,
        title,
        provider,
        providerLogo,
        description,

      }));
      setScholarshipData(filtered);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }
  useEffect(() => {
    getScholarships();
  }, [limit])


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
          {scholarshipData.map((scholarshipData) => (
            <ScholarshipCard key={scholarshipData.id} data={scholarshipData} />
          ))}
        </div>

        <Pagination setLimit={setLimit} />
      </main>
    </div>

  );
};
export default BrowseScholarships;