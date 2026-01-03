import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { HiOutlinePrinter, HiOutlineMail, HiDownload } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import api from '../api/axios';
import Swal from 'sweetalert2';
import Loader from '../components/Loader/Loader';

const Review = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('statement');

    // Review Form State
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        api.get(`/applications/single/${id}`)
            .then(res => {
                setApp(res.data);
                setStatus(res.data.applicationStatus);
                setNotes(res.data.internalNotes || '');
                setFeedback(res.data.feedback || '');
                setLoading(false);
            })
            .catch(() => navigate('/dashboard'));
    }, [id]);
    // useEffect(() => {
    //     api.get(`/applications/${id}`)
    //         .then(res => {
    //             console.log(res.data)
    //         })
    //         .catch(() => navigate('/dashboard'));
    // }, [id]);


    const handleSaveDecision = async () => {
        try {
            await api.patch(`/applications/review/${id}`, {
                status,
                internalNotes: notes,
                feedback,
                awarded: status === 'approved' 
            });
            Swal.fire("Saved", "Application status updated successfully", "success");
            navigate('/dashboard');
        } catch (err) {
            Swal.fire("Error", "Failed to update decision", err);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-[#f8fafc] min-h-screen mt-16 lg:mt-32 mb-16 lg:mb-32 px-4 md:px-8">
            <div className="max-w-6xl pt-10 mx-auto">
                {/* Breadcrumbs & Header */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        
                        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            {app.universityName} 
                            <span className="text-xs uppercase px-3 py-1 bg-blue-100 text-blue-700 rounded-md tracking-wider">
                                {status}
                            </span>
                        </h1>
                        <p className="text-slate-500 mt-1">Application ID: #{app._id} • Submitted: {app.applicationDate}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn btn-sm normal-case bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                            <HiOutlinePrinter /> Print
                        </button>
                        <button className="btn btn-sm normal-case bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                            <HiOutlineMail /> Email
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                                {app.providerImage ? <img src={app.providerImage} alt="" className="w-full h-full object-cover"/> : <FaUserCircle className="text-5xl text-slate-300"/>}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-slate-900">{app.userName}</h2>
                                <p className="text-slate-500">{app.degree} • {app.scholarshipCategory}</p>
                                <div className="grid grid-cols-2 mt-4 gap-y-2 text-sm">
                                    <span className="text-slate-500">📧 {app.userEmail}</span>
                                    <span className="text-slate-500">📞 {app.phoneNumber}</span>
                                    <span className="text-slate-500">📍 {app.address}</span>
                                    <span className="text-slate-500">🎓 Class of 2026</span>
                                </div>
                            </div>
                          
                        </div>

                        {/* Tabs & Content */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <div className="flex border-b border-slate-100">
                                {['Personal Statement', 'Academic Record', 'Financial Info'].map((tab) => (
                                    <button 
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                                        className={`px-6 py-4 text-sm font-bold transition-all ${activeTab === tab.toLowerCase().split(' ')[0] ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="p-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Why I deserve this scholarship</h3>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                    {app.personalStatement || "No personal statement provided."}
                                </p>
                            </div>
                        </div>

                        {/* Attachments */}
                  
                    </div>

                    {/* Right Side - Moderator Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
                                Moderator Evaluation <span className="text-xs text-slate-400 font-normal">🛡️</span>
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Application Status</label>
                                    <select 
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="select select-bordered w-full bg-slate-50 border-slate-200 focus:outline-none"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Internal Notes</label>
                                        <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded font-bold">PRIVATE</span>
                                    </div>
                                    <textarea 
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add notes for other moderators..."
                                        className="textarea p-2 textarea-bordered w-full bg-slate-50 h-32 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Feedback to Student</label>
                                        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Visible to Applicant</span>
                                    </div>
                                    <textarea 
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Optional feedback or request for more info..."
                                        className="textarea p-2 textarea-bordered w-full bg-slate-50 h-32 focus:outline-none"
                                    />
                                </div>

                                <button 
                                    onClick={handleSaveDecision}
                                    className="btn w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 cursor-pointer text-white border-none normal-case font-bold"
                                >
                                    Save Decision
                                </button>
                                <button onClick={() => navigate(-1)} className="btn btn-ghost w-full text-black font-bold cursor-pointer normal-case">Cancel</button>
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;