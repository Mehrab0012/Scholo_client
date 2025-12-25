
import React from 'react';

const ReviewApplication = () => {
  return (
    <div className="animate-in fade-in duration-500 py-10 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl">rate_review</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Review Process</h3>
        <p className="text-slate-500 font-medium">
          Once your application is submitted, our academic board will review your credentials within 2-4 weeks. 
          You can track your progress here after starting an application.
        </p>
        <button className="mt-8 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
          Learn about our Selection Process
        </button>
      </div>
    </div>
  );
};

export default ReviewApplication;
