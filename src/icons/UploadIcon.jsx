import React from "react";

const UploadIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M15.125 10.375V13.5417C15.125 13.9616 14.9582 14.3643 14.6613 14.6613C14.3643 14.9582 13.9616 15.125 13.5417 15.125H2.45833C2.03841 15.125 1.63568 14.9582 1.33875 14.6613C1.04181 14.3643 0.875 13.9616 0.875 13.5417V10.375M11.9583 4.83333L8 0.875M8 0.875L4.04167 4.83333M8 0.875L8 10.375"
        stroke="#808080"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UploadIcon;
