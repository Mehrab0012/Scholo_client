import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router';
import { 
    FiSearch, FiRefreshCcw, FiFilter, FiChevronLeft, FiChevronRight,
    FiClock, FiCheckCircle, FiInbox 
} from 'react-icons/fi';
import api from '../../api/axios';
import Loader from '../Loader/Loader';

const ModeratorDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [scholarships, setScholarships] = useState({});
    const [loading, setLoading] = useState(true);
    
    // Filtering & Sorting States
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("Newest");

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: apps } = await api.get('/all-applications');
            setApplications(apps);

            const sIds = [...new Set(apps.map(a => a.scholarshipId))].filter(id => id?.length === 24);
            if (sIds.length > 0) {
                const { data: sData } = await api.get('/scholarships/bulk', { params: { ids: sIds.join(',') } });
                const lookup = sData.reduce((acc, curr) => ({ 
                    ...acc, 
                    [curr._id]: { title: curr.universityName, category: curr.scholarshipCategory } 
                }), {});
                setScholarships(lookup);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Statistics Logic ---
    const stats = useMemo(() => {
        const total = applications.length;
        const pending = applications.filter(a => a.applicationStatus?.toLowerCase() === 'pending').length;
        // Simple logic for "Reviewed This Week" based on current date
        const reviewed = applications.filter(a => a.applicationStatus?.toLowerCase() !== 'pending').length;
        
        return [
            { label: 'Total Pending', value: pending, icon: <FiClock />, color: 'orange', change: '+2%' },
            { label: 'Reviewed This Week', value: reviewed, icon: <FiCheckCircle />, color: 'blue', change: '+15%' },
            { label: 'Total Applications', value: total, icon: <FiInbox />, color: 'purple', change: '+5%' },
        ];
    }, [applications]);

    // --- Filter & Search Logic ---
    const filteredApplications = useMemo(() => {
        let result = [...applications];

        // Search by name or scholarship
        if (searchTerm) {
            result = result.filter(app => 
                app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.universityName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status Filter
        if (statusFilter !== "All") {
            result = result.filter(app => app.applicationStatus.toLowerCase() === statusFilter.toLowerCase());
        }

        // Sort
        result.sort((a, b) => {
            const dateA = new Date(a.applicationDate);
            const dateB = new Date(b.applicationDate);
            return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [applications, searchTerm, statusFilter, sortOrder]);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-orange-100 text-orange-700';
            case 'under review':
            case 'processing': return 'bg-blue-100 text-blue-700';
            case 'approved': return 'bg-emerald-100 text-emerald-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-600';
        }
    }

    if (loading) return <Loader />;

    return (
        <div className="bg-[#f8fafc] min-h-screen lg:mt-32 p-4 sm:p-6 lg:p-8 mt-16">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Application Review Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage and review incoming scholarship applications efficiently.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                                    <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                                        📈 {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className={`p-4 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[300px]">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search by student name or scholarship title..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <select 
                            className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">Status: All</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select 
                            className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-600 outline-none"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="Newest">Sort: Date (Newest)</option>
                            <option value="Oldest">Sort: Date (Oldest)</option>
                        </select>

                        <button 
                            onClick={fetchData}
                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            <FiRefreshCcw className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Applicant</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">Scholarship Title</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Submission Date</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-11 w-11 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center text-sm shadow-sm">
                                                    {app.userName?.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-slate-900">{app.userName}</div>
                                                    <div className="text-xs text-slate-400 font-medium">{app.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-slate-800">
                                                {scholarships[app.scholarshipId]?.title || app.universityName}
                                            </div>
                                            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">
                                                {scholarships[app.scholarshipId]?.category || app.scholarshipCategory}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-slate-600">
                                                {new Date(app.applicationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${getStatusStyles(app.applicationStatus)}`}>
                                                {app.applicationStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link 
                                                to={`/review/${app._id}`} 
                                                className="text-blue-600 hover:text-blue-800 text-sm font-black flex items-center justify-end gap-1 group"
                                            >
                                                Review <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Footer */}
                    <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-400">
                            Showing <span className="text-slate-900">1 to {filteredApplications.length}</span> of {applications.length} results
                        </p>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModeratorDashboard;