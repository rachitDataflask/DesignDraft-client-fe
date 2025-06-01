import React from "react";

export const ReloadIcon = ({ className = "w-5 h-5 stroke-current" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        d="M2.06 4.22V8.56M2.06 8.56H6.39M2.06 8.56L5.41 5.41C6.18 4.63 7.14 4.06 8.20 3.76C9.25 3.45 10.37 3.42 11.44 3.66C12.51 3.90 13.50 4.41 14.32 5.14C15.14 5.87 15.76 6.80 16.13 7.83M17.94 15.78V11.44M17.94 11.44H13.61M17.94 11.44L14.59 14.59C13.82 15.37 12.86 15.94 11.80 16.24C10.75 16.55 9.63 16.58 8.56 16.34C7.49 16.10 6.50 15.59 5.68 14.86C4.86 14.13 4.24 13.20 3.87 12.17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
