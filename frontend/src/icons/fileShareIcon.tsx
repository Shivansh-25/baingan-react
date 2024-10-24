import React from "react";

const FileShareIcon = ({ width = 24, height = 24, className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height={height}
    width={width}
    viewBox="0 0 36 36"
    version="1.0"
    id="Layer_3"
    xmlSpace="preserve"
  >
    <linearGradient id="gradientColorFileShare">
      <stop offset="5%" stopColor="#7eaaff"></stop>
      <stop offset="95%" stopColor="#ff48fb"></stop>
    </linearGradient>
    <defs>
      <style>
        {`
          .b {
            fill: none;
            stroke: url('#gradientColorFileShare');
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
    </defs>
    <g id="b3dc53c0-2517-4c2c-b033-b6ee3b39cce0" data-name="Layer 3">
      <path
        className="b"
        d="M25,4H7.83A1.89,1.89,0,0,0,6,5.91V30.09A1.89,1.89,0,0,0,7.83,32H28.17A1.87,1.87,0,0,0,30,30.09V9ZM24,5.78,28.2,10H24ZM8,30V6H22v6h6V30Z"
      />
      <path
        className="b"
        d="M22,21.81a2.11,2.11,0,0,0-1.44.62l-5.72-2.66v-.44l5.66-2.65a2.08,2.08,0,1,0,.06-2.94h0a2.14,2.14,0,0,0-.64,1.48v.23l-5.64,2.66a2.08,2.08,0,1,0-.08,2.95l.08-.08,5.67,2.66v.3A2.09,2.09,0,1,0,22,21.84Z"
      />
    </g>
  </svg>
);

export default FileShareIcon;
