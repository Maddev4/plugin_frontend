import React from "react";
export const Icons4 = ({ className, color = "#444444" }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66667 9.16667H13.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.66667 12.5H13.3333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M2.5 16.6667V3.33333C2.5 2.89131 2.67559 2.46738 2.98816 2.15482C3.30072 1.84226 3.72464 1.66667 4.16667 1.66667H15.8333C16.2754 1.66667 16.6993 1.84226 17.0118 2.15482C17.3244 2.46738 17.5 2.89131 17.5 3.33333V16.6667L15 15L12.5 16.6667L10 15L7.5 16.6667L5 15L2.5 16.6667Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
