
import React from 'react';
import { FaLayerGroup, FaRegCheckCircle } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { MdEditDocument, MdHistoryEdu } from 'react-icons/md';

const Overview = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Description */}
      <section>
        <div className="flex items-center gap-3 mb-6">

          <h3 className="text-xl font-bold text-slate-900">Scholarship Description</h3>
        </div>
        <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
          <p>
            The Global Future Leaders Scholarship is designed to identify and support outstanding undergraduate students 
            who have demonstrated exceptional leadership potential and academic excellence in the field of Engineering. 
            This prestigious award aims to foster the next generation of innovators who are committed to solving global 
            challenges through technology.
          </p>
          <p>
            Recipients of this scholarship will not only receive financial support but also gain access to an exclusive 
            mentorship program with industry leaders, networking events, and internship opportunities at top-tier 
            tech companies. We are looking for individuals who are passionate, driven, and ready to make a significant 
            impact on the world.
          </p>
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* Eligibility Criteria */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#137fec]/10 flex items-center justify-center text-[#137fec]">
            <FaRegCheckCircle className=' text-2xl text-green-500' />

          </div>
          <h3 className="text-xl font-bold text-slate-900">Eligibility Criteria</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Minimum GPA of 3.5 on a 4.0 scale",
            "Currently enrolled full-time in an undergraduate program",
            "Declared major in Engineering or Computer Science",
            "US Citizen or Permanent Resident",
            "Demonstrated leadership experience"
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <IoMdCheckmarkCircleOutline className='text-xl text-green-500' />

              <span className="text-slate-700 font-semibold text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-100" />

      {/* Application Requirements */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#137fec]/10 flex items-center justify-center text-[#137fec]">
           <IoFolderOpenOutline className='text-blue-900 text-2xl' />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Application Requirements</h3>
        </div>
        <div className="space-y-6">
          <RequirementItem 
            icon={<MdEditDocument className='text-2xl' />}
            title="Personal Essay" 
            desc='500-word essay on "How I plan to change the world with Engineering"'
          />
          <RequirementItem 
            icon={<MdHistoryEdu className='text-2xl'/>}
            title="Official Transcript" 
            desc="Most recent university transcript"
          />
          <RequirementItem 
            icon={<FaLayerGroup className='text-xl' />}

            title="Two Letters of Recommendation" 
            desc="One from a professor, one from a community leader"
          />
        </div>
      </section>
    </div>
  );
};

const RequirementItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-full bg-[#137fec]/5 border border-[#137fec]/10 flex items-center justify-center text-[#137fec] shrink-0">
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-500 font-medium mt-1">{desc}</p>
    </div>
  </div>
);

export default Overview;
