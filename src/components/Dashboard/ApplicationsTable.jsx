
import React from 'react';

export const ApplicationsTable = ({ applications }) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
              <th className="px-6 py-4">Scholarship Title</th>
              <th className="px-6 py-4">Organization</th>
              <th className="px-6 py-4">Date Submitted</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center shadow-sm ${app.iconColor}`}>
                        <span className="material-symbols-outlined text-2xl">{app.icon}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{app.title}</div>
                        <div className="text-xs text-gray-400 mt-0.5">ID: {app.appId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{app.organization}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.dateSubmitted}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 italic">
                  No applications found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">5</span> of <span className="font-semibold text-gray-900">12</span> results
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'Completed':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'Rejected':
        return 'bg-gray-100 text-gray-500 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getDotColor = () => {
    switch (status) {
      case 'Processing': return 'bg-blue-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Completed': return 'bg-green-500';
      case 'Rejected': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStyles()}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`}></span>
      {status}
    </span>
  );
};
