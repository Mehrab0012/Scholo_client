import React, { useState, useMemo, useEffect, useContext } from 'react';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { MdContentPasteSearch } from 'react-icons/md';
import { Link } from 'react-router';
import { IoMdAddCircleOutline } from 'react-icons/io';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import Loader from '../components/Loader/Loader';
import ModeratorDashboard from '../components/Dashboard/ModeratorDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const { role, isReloading } = useRole([]);
    const [DBUser, setDBUser] = useState([]);
    const [applications, setApplications] = useState([]); // Renamed to plural
    const [scholarships, setScholarships] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (!user?.email) return;
        api.get("/users", { params: { email: user.email } })
            .then(res => setDBUser(res.data))
            .catch(err => console.error("User fetch error:", err));
    }, [user?.email]);

    // 2. Fetch User Applications
    useEffect(() => {
        if (!user?.email || role === 'admin') {
            setIsLoadingData(false);
            return;
        };

        const fetchApplications = async () => {
            try {
                const res = await api.get('/applications', {
                    params: { email: user.email }
                });
                
                // Ensure data is always an array
                const data = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
                setApplications(data);
            } catch (err) {
                console.error("Applications fetch error:", err);
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchApplications();
    }, [user?.email, role]);

    // 3. Fetch Scholarship Details in Bulk
    useEffect(() => {
        // Only run if we have applications
        if (applications.length === 0) return;

        // Extract valid, unique 24-char MongoDB IDs
        const ids = [...new Set(applications
            .map(app => app.scholarshipId)
            .filter(id => id && id.length === 24) 
        )];

        if (ids.length === 0) return;

        api.get('/scholarships/bulk', {
            params: { ids: ids.join(',') }
        })
            .then(res => setScholarships(res.data))
            .catch(err => {
               
                console.error("Bulk fetch error:", err);
            });

    }, [applications]);

    // 4. Calculate Stats (Memoized for performance)
    const stats = useMemo(() => {
        const total = applications.length;
        const pending = applications.filter(app => app.applicationStatus === "pending").length;
        // Check for both string "true" or boolean true
        const awarded = applications.filter(app => app.awarded === "true" || app.awarded === true).length;

        return { total, pending, awarded };
    }, [applications]);


    // Loading state handling
    if (isReloading || isLoadingData) return <Loader />;

    if(role === "admin"){
        return <AdminDashboard />
    }
    if(role === "moderator"){
        return <ModeratorDashboard/>
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col mt-16 lg:mt-32">
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
                            Application History
                        </h1>
                        <p className="text-gray-500 mt-1 mb-2">
                            Track the status of your scholarship submissions
                        </p>
                    </div>

                    <div className='flex gap-3'>
                        {(DBUser?.role === 'student' || role === 'student') && (
                            <Link to='/browse-scholarships'>
                                <button className="flex items-center justify-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
                                    <MdContentPasteSearch className='text-2xl' />
                                    Browse Scholarships
                                </button>
                            </Link>
                        )}
                       
                    </div>
                </div>

                {/* Statistics Section */}
                <StatsCards stats={stats} />

                {/* Applications List Section */}
                <div className="mt-10 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">Recent Applications</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {applications.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Title</th>
                                        <th className="px-6 py-4 font-bold">Category</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold text-right">Fee</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.map((app) => {
                                        // Find corresponding scholarship details from the bulk fetch
                                        const details = scholarships.find(s => s._id === app.scholarshipId);
                                        return (
                                            <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4  font-semibold text-gray-900">
                                                    {details?.title || app.universityName || "Loading..."}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {details?.scholarshipCategory || app.scholarshipCategory}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                        app.applicationStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                                        app.applicationStatus === 'rejected' ? 'bg-red-100 text-red-700' : 
                                                        'bg-green-100 text-green-700'
                                                    }`}>
                                                        {app.applicationStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono font-bold text-blue-600">
                                                    ${app.applicationFees || 0}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-10 text-center text-gray-400">
                                No applications found. Start by browsing scholarships!
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default DashboardLayout;