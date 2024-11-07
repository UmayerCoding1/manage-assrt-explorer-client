import React from "react";

const SectionTitle = ({ header }) => {
  return (
    <div className="flex items-center justify-center my-5">
      <h2 className="text-4xl font-semibold font-Rozha uppercase text-orange-400 flex items-center">
        <span className="text-xs">- - - - </span> {header} <span className="text-xs"> - - - -</span>
      </h2>
    </div>
  );
};

export default SectionTitle;
