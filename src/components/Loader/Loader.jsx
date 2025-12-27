import React from 'react';

const Loader = () => {
  return (

    <div className="flex justify-center items-center">
      <div className="w-10 h-10 border-[3px] border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;