import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import api from '../../api/axios';
import Loader
 from '../Loader/Loader';
const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [scholarships, setScholarships] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch all applications
                const { data: apps } = await api.get('/all-applications');
                setApplications(apps);

                // 2. Fetch scholarship titles in bulk
                const sIds = [...new Set(apps.map(a => a.scholarshipId))].filter(id => id?.length === 24);
                if (sIds.length > 0) {
                    const { data: sData } = await api.get('/scholarships/bulk', { params: { ids: sIds.join(',') } });
                    // Convert to a lookup object { id: title }
                    const lookup = sData.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.scholarshipName || curr.universityName }), {});
                    setScholarships(lookup);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusChip = (status) => {
        const base = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full ";
        switch (status?.toLowerCase()) {
            case 'pending': return base + 'bg-yellow-100 text-yellow-800';
            case 'processing': return base + 'bg-blue-100 text-blue-800';
            case 'approved': return base + 'bg-green-100 text-green-800';
            case 'rejected': return base + 'bg-red-100 text-red-800';
            default: return base + 'bg-gray-100 text-gray-800';
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="bg-gray-50/50 p-4 sm:p-6 lg:p-8 mt-16 lg:mt-32 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Application Review Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage and review incoming scholarship applications efficiently.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Applicant</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Scholarship</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Submission Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center">
                                                    {app.userName?.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900">{app.userName}</div>
                                                    <div className="text-xs text-gray-500">{app.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                            {scholarships[app.scholarshipId] || app.universityName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {app.applicationDate || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getStatusChip(app.applicationStatus)}>
                                                {app.applicationStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <Link to={`/review/${app._id}`} className="text-blue-600 hover:text-blue-900 font-bold">
                                                Review →
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;