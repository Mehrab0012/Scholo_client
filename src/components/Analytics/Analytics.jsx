import React, { useEffect, useState, useMemo } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    FiDownload, FiCalendar, FiUsers, FiFileText, FiAward, FiClock, FiEye
} from 'react-icons/fi';
import { Link } from 'react-router';
import Loader from '../Loader/Loader';
import api from '../../api/axios';

const Analytics = () => {
    const [applications, setApplications] = useState([]);
    const [scholarshipsCount, setScholarshipsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                // Fetch all applications
                const { data: apps } = await api.get('/all-applications');
                setApplications(apps);

                // Fetch scholarships to get the count
                const { data: schol } = await api.get('/scholarships?limit=1000');
                setScholarshipsCount(schol.length);

                //fetch all user 
                api.get("/users/count")
                    .then(res => {
                        setTotalUsers(res.data.totalUsers);
                    })
                    .catch(err => console.log(err));
            } catch (err) {
                console.error("Analytics fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalyticsData();
    }, []);

    // --- Logic for Pie Chart (Status Breakdown) ---
    const statusData = useMemo(() => {
        const pending = applications.filter(a => a.applicationStatus === 'pending').length;
        const accepted = applications.filter(a => a.applicationStatus === 'approved').length;
        const rejected = applications.filter(a => a.applicationStatus === 'rejected').length;

        return [
            { name: 'Pending', value: pending, color: '#137fec' },
            { name: 'Accepted', value: accepted, color: '#00ba9d' },
            { name: 'Rejected', value: rejected, color: '#ff4b55' },
        ];
    }, [applications]);

    // --- Logic for Area Chart (Mocking weekly growth based on real total) ---
    const activityData = [
        { name: 'Week 1', apps: Math.floor(applications.length * 0.15) },
        { name: 'Week 2', apps: Math.floor(applications.length * 0.35) },
        { name: 'Week 3', apps: Math.floor(applications.length * 0.65) },
        { name: 'Week 4', apps: applications.length },
    ];

    if (loading) return <Loader />;

    return (
        <div className="bg-[#f8fafc] lg:mt-32 p-6 lg:p-10 mt-16">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Overview</h1>
                        <p className="text-slate-500 mt-1">Welcome back. Here's what's happening on ScholarStream today.</p>
                    </div>
                 
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Active Scholarships" value={scholarshipsCount} change="+12%" icon={<FiAward />} color="blue" />
                    <StatCard title="Total Applications" value={applications.length} change="+5%" icon={<FiFileText />} color="purple" />
                    <StatCard title="New Users (This Week)" value={totalUsers} change="+8%" icon={<FiUsers />} color="orange" />
                    <StatCard title="Pending Approvals" value={applications.filter(a => a.applicationStatus === 'pending').length} change="Same" icon={<FiClock />} color="red" />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                    {/* Application Activity Line Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Application Activity</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-slate-900">{applications.length}</span>
                                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+12.5%</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={activityData}>
                                    <defs>
                                        <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#137fec" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#137fec" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="apps" stroke="#137fec" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Status Breakdown Pie Chart */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                        <h3 className="text-lg font-black text-slate-900 mb-8">Status Breakdown</h3>
                        <div className="h-[250px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={statusData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <p className="text-2xl font-black text-slate-900">{(applications.length / 1000).toFixed(1)}k</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                            </div>
                        </div>
                        <div className="mt-auto space-y-3">
                            {statusData.map(item => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="font-bold text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-black text-slate-900">
                                        {((item.value / (applications.length || 1)) * 100).toFixed(0)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Applications Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-900">Recent Applications</h3>
                        <Link to="/admin-dashboard" className="text-sm font-bold text-[#137fec] hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-4">Student Name</th>
                                    <th className="px-8 py-4">Scholarship</th>
                                    <th className="px-8 py-4">Date Applied</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {applications.slice(0, 5).map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                                                    {app.userName?.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-slate-900">{app.userName}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-bold text-slate-600">{app.universityName}</td>
                                        <td className="px-8 py-5 text-sm font-medium text-slate-400">{app.applicationDate}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${app.applicationStatus === 'pending' ? 'bg-orange-50 text-orange-600' :
                                                app.applicationStatus === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                                                    'bg-red-50 text-red-600'
                                                }`}>
                                                {app.applicationStatus === 'pending' ? 'Pending Review' : app.applicationStatus}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <Link to={`/review/${app._id}`} className="text-slate-400 hover:text-[#137fec]">
                                                <FiEye className="inline text-lg" />
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

// --- Helper Component for Stats ---
const StatCard = ({ title, value, change, icon, color }) => {
    const colors = {
        blue: "text-blue-600 bg-blue-50",
        purple: "text-purple-600 bg-purple-50",
        orange: "text-orange-600 bg-orange-50",
        red: "text-red-600 bg-red-50",
    };
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colors[color]}`}>
                {icon}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
            <div className="flex items-center gap-3">
                <h4 className="text-2xl font-black text-slate-900">{typeof value === 'number' ? value.toLocaleString() : value}</h4>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${change === 'Same' ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    {change !== 'Same' && '↗'} {change}
                </span>
            </div>
        </div>
    );
};

export default Analytics;