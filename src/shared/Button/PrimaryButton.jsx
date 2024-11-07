import React from "react";
import { CiLogin } from "react-icons/ci";
const PrimaryButton = ({ text ,icon}) => {
  return (
    <div>
      <button className="bg-[#12BED2] w-auto px-2 h-10 rounded-lg font-bold flex items-center justify-center text-black">
       {icon ?   <CiLogin className="text-2xl font-bold mr-2" /> : ''} {text}
      </button>
    </div>
  );
};

export default PrimaryButton;
