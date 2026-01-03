import React, { useEffect, useState, useMemo } from 'react';
import {
    FiUsers, FiShield, FiTrash2, FiSearch, FiUserCheck
} from 'react-icons/fi';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';
import { Link } from 'react-router';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const fetchUsers = async () => {
        try {
            // Using the NEW unique endpoint
            const { data } = await api.get('/users/manage/all');
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            // Using the NEW unique endpoint
            await api.patch(`/users/manage/role/${userId}`, { role: newRole });

            setUsers(prev => prev.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: `Role updated to ${newRole}`,
                showConfirmButton: false,
                timer: 2000
            });
        } catch (err) {
            Swal.fire("Error", "Failed to update role", "error");
        }
    };

    const handleDeleteUser = (id, name) => {
        Swal.fire({
            title: `Delete ${name}?`,
            text: "User access will be permanently revoked.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Using the NEW unique endpoint
                    await api.delete(`/users/manage/delete/${id}`);
                    setUsers(prev => prev.filter(u => u._id !== id));
                    Swal.fire("Deleted!", "User removed.", "success");
                } catch (err) {
                    Swal.fire("Error", "Action failed", "error");
                }
            }
        });
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === "All" || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);

    const stats = [
        { label: 'Total Users', value: users.length, icon: <FiUsers />, color: 'blue' },
        { label: 'Administrators', value: users.filter(u => u.role === 'admin').length, icon: <FiShield />, color: 'red' },
    ];

    if (loading) return <Loader />;

    return (
        <div className="bg-[#f8fafc] min-h-screen lg:mt-32 p-6 lg:p-10 mt-16">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className='lg:flex justify-between lg:px-5'>
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
                        <p className="text-slate-500 mt-1">Control access and platform roles.</p>
                    </div>
                    <div>
                        <Link to={'/add-scholarship'}>
                            <button className='bg-blue-600 cursor-pointer px-14 py-3 rounded-2xl font-bold text-white text-lg'>
                                Add Scholarship
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl 
                                ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    stat.color === 'red' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-slate-50 border-none rounded-2xl px-6 py-3 text-sm font-bold text-slate-600 outline-none"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="All">All Roles</option>
                        <option value="student">Students</option>
                        <option value="moderator">Moderators</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="px-8 py-5">Member</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5">Last Activity</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center font-bold text-slate-400">
                                                {u.photoURL ? <img src={u.photoURL} className="w-full h-full object-cover" /> : u.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{u.name}</p>
                                                <p className="text-xs text-slate-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <select
                                            value={u.role}
                                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                            className={`text-[11px] font-black uppercase px-3 py-1.5 rounded-xl border-none outline-none cursor-pointer
                                                ${u.role === 'admin' ? 'bg-red-50 text-red-600' :
                                                    u.role === 'moderator' ? 'bg-blue-50 text-blue-600' :
                                                        u.role === 'organization' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}
                                        >
                                            <option value="student">Student</option>
                                            <option value="moderator">Moderator</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-bold text-slate-500">
                                        {u.lastLoggedIn ? new Date(u.lastLoggedIn).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => handleDeleteUser(u._id, u.name)}
                                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <FiTrash2 className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;