import React from "react";

const ClubsIcon = ({ width, height, className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height={height}
    width={width}
    version="1.1"
    id="Layer_1"
    viewBox="0 0 48 48"
    xmlSpace="preserve"
  >
    <linearGradient id="gradientColor">
      <stop offset="5%" stopColor="#7eaaff"></stop>
      <stop offset="95%" stopColor="#ff48fb"></stop>
    </linearGradient>
    <defs>
      <style>
        {`
          .b {
            fill: none;
            stroke: url('#gradientColor');
            stroke-linecap: round;
            stroke-linejoin: round;
          }
        `}
      </style>
    </defs>
    <circle className="b" cx="24" cy="24" r="21.5" />
    <polyline className="b" points="30 10 14.9 11.8 8.9 25.8" />
    <line className="b" x1="39.1" y1="22.2" x2="30" y2="10" />
    <polyline className="b" points="18 38 33.1 36.2 39.1 22.2" />
    <line className="b" x1="8.9" y1="25.8" x2="18" y2="38" />
    <polyline className="b" points="39.1 22.2 27.7 15.4 14.9 11.8 14.6 25.1 18 38" />
    <polyline className="b" points="18 38 29.6 31.6 39.1 22.2" />
    <polygon className="b" points="29.6 31.6 14.6 25.1 27.7 15.4 29.6 31.6" />
    <line className="b" x1="8.9" y1="25.8" x2="14.6" y2="25.1" />
    <line className="b" x1="27.7" y1="15.4" x2="30" y2="10" />
    <line className="b" x1="33.1" y1="36.2" x2="29.6" y2="31.6" />
  </svg>
);

export default ClubsIcon;
