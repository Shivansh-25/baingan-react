import React from "react";

const NewsIcon = ({ width = 24, height = 24, className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height={height}
    width={width}
    viewBox="-1 0 46 46"
    version="1.1"
    id="Layer_1"
    xmlSpace="preserve"
  >
    <linearGradient id="gradientColorNews">
      <stop offset="5%" stopColor="#7eaaff"></stop>
      <stop offset="95%" stopColor="#ff48fb"></stop>
    </linearGradient>
    <defs>
      <style>
        {`
          .b {
            fill: none;
            stroke: url('#gradientColorNews');
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
    </defs>
    <path
      className="b"
      d="M41,47H7a5,5,0,0,1-5-5V2A1,1,0,0,1,3,1H37a1,1,0,0,1,1,1h0V16h7a1,1,0,0,1,1,1V42A5,5,0,0,1,41,47Zm-5-5V3H4V42H4a3,3,0,0,0,3,3H37.022A4.962,4.962,0,0,1,36,42Zm8-24H38V42a3,3,0,0,0,6,0ZM7,40a1,1,0,0,1,1-1h9a1,1,0,0,1,0,2H8A1,1,0,0,1,7,40Zm4.666-16.285a.977.977,0,1,1-1.381-1.381l5.905-5.905a.887.887,0,0,1,.095-.143,1.047,1.047,0,0,1,1.43,0,.959.959,0,0,1,.095.143L22,20.619l2.19-2.19a.887.887,0,0,1,.095-.143.919.919,0,0,1,1.525.143l3.905,3.905a.977.977,0,1,1-1.381,1.381L25,20.381,23.381,22l.334.334a.977.977,0,1,1-1.381,1.381L17,18.381ZM23,29h9a1,1,0,0,1,0,2H23a1,1,0,0,1,0-2Zm0,5h9a1,1,0,0,1,0,2H23a1,1,0,0,1,0-2Zm0,5h9a1,1,0,0,1,0,2H23a1,1,0,0,1,0-2Zm1-23.5A1.5,1.5,0,1,1,22.5,14,1.5,1.5,0,0,1,24,15.5ZM27,10H13a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2ZM8,34h9a1,1,0,0,1,0,2H8a1,1,0,0,1,0-2Zm10-4a1,1,0,0,1-1,1H8a1,1,0,0,1,0-2h9A1,1,0,0,1,18,30Z"
      transform="translate(-2 -1)"
      fillRule="evenodd"
    />
  </svg>
);

export default NewsIcon;
