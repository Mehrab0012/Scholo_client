import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default Loader;
