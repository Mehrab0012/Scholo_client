import React, { useEffect, useState } from 'react';
import { Search } from '../components/BrowseScholarshipComponents/Search';
import { FilterBy } from '../components/BrowseScholarshipComponents/FilterBy';
import { BrowseHeading } from '../components/BrowseScholarshipComponents/BrowseHeading';
import { ScholarshipCard } from '../components/BrowseScholarshipComponents/ScholarshipCard';
import { Pagination } from '../components/BrowseScholarshipComponents/Pagination';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import api from '../api/axios';

const BrowseScholarships = () => {
  const [scholarshipData, setScholarshipData] = useState([]);
  const [limit, setLimit] = useState(6);
  
  // --- NEW STATES FOR FILTERING ---
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: [],
    degree: [],
    deadline: "Anytime"
  });
  const [sortBy, setSortBy] = useState("Newest Added");

  const getScholarships = async () => {
    try {
      // Build query params
      const params = {
        limit,
        search,
        category: filters.category.join(','),
        degree: filters.degree.join(','),
        deadline: filters.deadline,
        sort: sortBy
      };

      const { data } = await api.get(`/scholarships`, { params });

      const filtered = data.map(({ _id: id, title, provider, providerLogo, description, amount, category, deadline }) => ({
        id, amount, category, deadline, title, provider, providerLogo, description,
      }));
      setScholarshipData(filtered);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  // Refetch whenever any filter/search/sort changes
  useEffect(() => {
    getScholarships();
  }, [limit, search, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto mt-16 lg:mt-32 w-full px-4 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
        <Search setSearch={setSearch} />
        <FilterBy filters={filters} setFilters={setFilters} />
      </aside>

      <main className="flex-1 flex flex-col">
        <BrowseHeading setSortBy={setSortBy} />

        <div className="mb-4 flex items-center gap-2">
          <IoCheckmarkDoneOutline className='font-2xl text-green-500' />
          <p className="text-sm font-medium text-[#111418]">
            Showing: <span className="font-bold"> {scholarshipData.length} Scholarships</span> 
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {scholarshipData.map((data) => (
            <ScholarshipCard key={data.id} data={data} />
          ))}
        </div>

        <Pagination setLimit={setLimit} />
      </main>
    </div>
  );
};
export default BrowseScholarships;