
import React from 'react';
import { MdOutlineRateReview } from 'react-icons/md';

const ReviewApplication = () => {
  return (
    <div className="animate-in fade-in duration-500 py-10 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-6">
          <MdOutlineRateReview  className='text-5xl'/>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Review Process</h3>
        <p className="text-slate-500 font-medium">
          Once your application is submitted, our academic board will review your credentials within 2-4 weeks.
          You can track your progress here after starting an application.
        </p>

      </div>
    </div>
  );
};

export default ReviewApplication;
