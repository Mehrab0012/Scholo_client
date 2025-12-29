
import React from 'react';
import { FaRegFolderOpen } from 'react-icons/fa';
import { IoHourglassOutline } from 'react-icons/io5';
import { MdOutlineVerified } from 'react-icons/md';

export const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <StatCard 
        label="Total Applications" 
        value={stats.total} 
        icon={<FaRegFolderOpen />}
        colorClass="text-blue-600 bg-blue-50" 
      />
      <StatCard 
        label="Pending Review" 
        value={stats.pending} 
        icon={<IoHourglassOutline />}
        colorClass="text-yellow-600 bg-yellow-50" 
      />
      <StatCard 
        label="Awarded" 
        value={stats.awarded} 
        icon={<MdOutlineVerified />}
        colorClass="text-green-600 bg-green-50" 
      />
    </div>
  );
};

const StatCard = ({ label, value, icon, colorClass }) => {
  return (
    <div className="bg-white px-6 py-8 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <span className=" block">{icon}</span>
        </div>
        <span className="text-gray-600  text-xl font-bold ">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900 ml-1 mt-1">
        {value}
      </div>
    </div>
  );
};
