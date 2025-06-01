import React from "react";


const BackArrowIcon = ({ className }) => {
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
        d="M17 9.5H3M3 9.5L10 16.5M3 9.5L10 2.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};




export default BackArrowIcon;
