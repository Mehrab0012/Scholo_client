
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { FilterBar } from '../components/Dashboard/FilterBar';
import { MdContentPasteSearch, MdOutlinePayments } from 'react-icons/md';
import { Link } from 'react-router';
import { IoMdAddCircleOutline } from 'react-icons/io';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';




const App = () => {

    const [DBUser, setDBUser] = useState();
    const { user } = useContext(AuthContext);

    const APPLICATIONS = [
        {
            id: '1',
            appId: '#APP-2023-892',
            title: 'Future Tech Leaders Grant',
            organization: 'Tech World Foundation',
            dateSubmitted: 'Oct 24, 2023',
            status: 'Processing',
            icon: 'biotech',
            iconColor: 'text-blue-600 bg-blue-50',
        },
        {
            id: '2',
            appId: '#APP-2023-755',
            title: 'Women in STEM Scholarship',
            organization: 'Global Science Initiative',
            dateSubmitted: 'Sep 15, 2023',
            status: 'Pending',
            icon: 'female',
            iconColor: 'text-purple-600 bg-purple-50',
        },
        {
            id: '3',
            appId: '#APP-2023-441',
            title: 'Community Service Award',
            organization: 'Local Heroes Org',
            dateSubmitted: 'Aug 10, 2023',
            status: 'Completed',
            icon: 'volunteer_activism',
            iconColor: 'text-green-600 bg-green-50',
        },
        {
            id: '4',
            appId: '#APP-2023-112',
            title: 'Academic Excellence Fund',
            organization: 'State University',
            dateSubmitted: 'Jul 05, 2023',
            status: 'Rejected',
            icon: 'school',
            iconColor: 'text-orange-600 bg-orange-50',
        },
        {
            id: '5',
            appId: '#APP-2023-091',
            title: 'NextGen Coders',
            organization: 'Silicon Valley Hub',
            dateSubmitted: 'Jun 12, 2023',
            status: 'Completed',
            icon: 'code',
            iconColor: 'text-teal-600 bg-teal-50',
        }
    ];
    const [activeFilter, setActiveFilter] = useState('All Status');

    const stats = {
        total: 12,
        pending: 5,
        awarded: 2
    };



    useEffect(() => {
        if (!user?.email) return;

        const fetchUser = async () => {
            try {
                const res = await api.get("/users", {
                    params: { email: user.email }
                });
                setDBUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [user?.email]);

    const role = DBUser?.role;
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col mt-16 lg:mt-32">


            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
                            Application History
                        </h1>
                        <p className="text-gray-500 mt-1 mb-2">
                            Track the status of your scholarship submissions
                        </p>
                    </div>

                    <div className='flex'>
                        {DBUser?.role === 'student' &&
                            <Link to={'/browse-scholarships'}>
                                <button className="flex items-center justify-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                                    <MdContentPasteSearch className='text-2xl' />Browse Scholerships
                                </button>
                            </Link>}
                        {
                            DBUser?.role === 'organization' &&
                            <Link to={'/add-scholarship'}>
                                <button className="flex items-center justify-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                                    <IoMdAddCircleOutline className='text-2xl' />Add Scholarship
                                </button>
                            </Link>
                        }
                    </div>
                </div>

                <StatsCards stats={stats} />

                <div className="mt-8">
                    <FilterBar
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}

                    />
                </div>

                <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                </div>
            </main>
        </div>
    );
};

export default App;
