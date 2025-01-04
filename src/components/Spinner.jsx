import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center z-50">
      <div className="relative w-32 h-32">
        <div className="absolute w-32 h-32 border-2 border-t-[#00BEC0] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.8s_linear_infinite]"></div>
        <div className="absolute w-24 h-24 left-4 top-4 border-2 border-t-[#FF4444] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.4s_linear_infinite]"></div>
        <div className="absolute w-16 h-16 left-8 top-8 border-2 border-t-[#eb34b4] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Spinner;
