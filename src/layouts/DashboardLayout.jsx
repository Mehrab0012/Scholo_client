
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { FilterBar } from '../components/Dashboard/FilterBar';
import { MdContentPasteSearch, MdOutlinePayments } from 'react-icons/md';
import { Link } from 'react-router';
import { IoMdAddCircleOutline } from 'react-icons/io';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import Loader from '../components/Loader/Loader';




const App = () => {

    const [DBUser, setDBUser] = useState();
    const { user } = useContext(AuthContext);
    const {role, isReloading} = useRole();
 

    const [activeFilter, setActiveFilter] = useState('All Status');

    const stats = {
        total: 12,
        pending: 5,
        awarded: 2
    };

console.log(DBUser)

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

    if(isReloading) return <Loader></Loader>
    
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
                        
                    />
                </div>

                <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

                </div>
            </main>
        </div>
    );
};

export default App;
