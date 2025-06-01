import React from "react";

const PolygonalIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="19" 
      viewBox="0 0 20 19" 
      fill="none"
    >
      <path 
        d="M10 1.27499L17.1231 5.38749V13.6125L10 17.725L2.87695 13.6125V5.38749L10 1.27499Z" 
        stroke="black" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeDasharray="2.5 2.5"
      />
    </svg>

  );
};

export default PolygonalIcon;