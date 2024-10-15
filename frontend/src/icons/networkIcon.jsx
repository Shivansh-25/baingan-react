import React from "react";

const NetworkIcon = ({ width = 24, height = 24, className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height={height}
    width={width}
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <defs>
      <linearGradient id="gradientColorNews">
        <stop offset="5%" stopColor="#7eaaff"></stop>
        <stop offset="95%" stopColor="#ff48fb"></stop>
      </linearGradient>
      <style>
        {`
          .st0 {
            fill: none;
            stroke: url('#gradientColorNews');
            stroke-width: 12.5;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
    </defs>
    <path className="st0" d="M256.001,118.244c32.648,0,59.126-26.47,59.126-59.118S288.65,0,256.001,0s-59.118,26.477-59.118,59.126S223.353,118.244,256.001,118.244z"/>
    <path className="st0" d="M256.001,228.204c40.613,0,82.205-14.063,75.715-52.998c-2.643-15.812-15.718-37.977-25.65-47.901c-1.286-1.278-7.108-1.612-8.69-0.632c-12.052,7.434-26.202,11.768-41.376,11.768c-15.166,0-29.316-4.334-41.367-11.768c-1.583-0.98-7.406-0.646-8.691,0.632c-9.924,9.924-23.014,32.089-25.65,47.901C173.803,214.142,215.396,228.204,256.001,228.204z"/>
    <path className="st0" d="M95.685,402.046c32.648,0,59.126-26.47,59.126-59.118c0-32.656-26.477-59.126-59.126-59.126s-59.119,26.47-59.119,59.126C36.567,375.576,63.037,402.046,95.685,402.046z"/>
    <path className="st0" d="M145.75,411.114c-1.285-1.293-7.107-1.612-8.69-0.639c-12.059,7.434-26.201,11.762-41.375,11.762c-15.173,0-29.316-4.327-41.368-11.762c-1.583-0.972-7.413-0.654-8.697,0.639c-9.925,9.917-23.007,32.082-25.642,47.894C13.487,497.944,55.08,512,95.685,512c40.613,0,82.206-14.056,75.714-52.992C168.758,443.196,155.675,421.031,145.75,411.114z"/>
    <path className="st0" d="M416.314,402.046c32.648,0,59.118-26.47,59.118-59.118c0-32.656-26.47-59.126-59.118-59.126s-59.126,26.47-59.126,59.126C357.189,375.576,383.666,402.046,416.314,402.046z"/>
    <path className="st0" d="M492.022,459.008c-2.636-15.812-15.718-37.977-25.642-47.894c-1.286-1.293-7.115-1.612-8.698-0.639c-12.052,7.434-26.194,11.762-41.368,11.762c-15.173,0-29.316-4.327-41.375-11.762c-1.583-0.972-7.405-0.654-8.69,0.639c-9.924,9.917-23.003,32.082-25.646,47.894C334.113,497.944,375.701,512,416.314,512C456.92,512,498.512,497.944,492.022,459.008z"/>
    <path className="st0" d="M336.24,370.973l-70.488-40.692v-81.385c0-5.387-4.363-9.75-9.75-9.75c-5.38,0-9.743,4.363-9.743,9.75v81.385l-70.488,40.692c-4.66,2.693-6.265,8.662-3.572,13.322c2.694,4.662,8.661,6.258,13.322,3.572l70.48-40.7l70.488,40.692c4.661,2.694,10.622,1.097,13.315-3.565C342.498,379.635,340.9,373.666,336.24,370.973z"/>
  </svg>
);

export default NetworkIcon;