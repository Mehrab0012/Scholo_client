
import React from 'react';
import { FaArrowRight, FaCalendarAlt, FaShare } from 'react-icons/fa';
import { GrFavorite } from 'react-icons/gr';
import { MdOutlinePayments } from 'react-icons/md';
import { Link } from 'react-router';

const ApplyScholership = ({ id, amount, fee, deadline, frequency }) => {

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
                <div className="space-y-8">
                    {/* Award Amount */}
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Award Amount</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-extrabold text-slate-900">${amount}</span>
                            <span className="text-slate-400 font-bold">/ {frequency}</span>
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    {/* Details List */}
                    <div className="space-y-6">
                        <SidebarDetail
                            icon={<FaCalendarAlt />}
                            iconBg="bg-rose-50"
                            iconColor="text-rose-500"
                            label="Application Deadline"
                            value={deadline}
                            subValue="21 days remaining"
                            isUrgent={true}
                        />
                        <SidebarDetail
                            icon={<MdOutlinePayments />}
                            iconBg="bg-[#137fec]/10"
                            iconColor="text-[#137fec]"
                            label="Application Fee"
                            value={`$ ${fee}`}
                        />
                    </div>

                    {/* CTA */}
                    <div className="space-y-4 pt-4">
                        <Link to={`/application/${id}`}>
                            <button className="w-full bg-[#137fec] cursor-pointer active:scale-95 transform ease-in-out delay-40 hover:bg-[#137fec]/90 text-white font-extrabold py-5 rounded-xl transition-all shadow-xl shadow-[#137fec]/30 flex items-center justify-center gap-3 text-lg">
                                Apply Now
                                <FaArrowRight className='text-xl' />

                            </button>
                        </Link>
                        <p className="text-center text-[10px] text-slate-400 font-semibold px-4">
                            By applying, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center cursor-pointer gap-2 bg-white border border-slate-100 py-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                    <GrFavorite className='text-red-400 text-xl' />
                    Save
                </button>
                <button className="flex items-center justify-center gap-2 cursor-pointer bg-white border border-slate-100 py-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                    <FaShare className='text-blue-400 text-xl' />
                    Share
                </button>
            </div>
        </div>
    );
};

const SidebarDetail = ({ icon, iconBg, iconColor, label, value, subValue, isUrgent }) => (
    <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}>
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{value}</p>
            {subValue && (
                <p className={`text-xs font-bold mt-1 ${isUrgent ? 'text-rose-500' : 'text-slate-400'}`}>
                    {subValue}
                </p>
            )}
        </div>
    </div>
);

export default ApplyScholership;
