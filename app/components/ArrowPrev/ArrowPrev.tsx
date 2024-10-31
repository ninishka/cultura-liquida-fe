import React, { FC } from 'react';

const ArrowPrev: FC = ({ color }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1087_9597)">
      <path d="M1 7.5L12.25 13.9952L12.25 1.00481L1 7.5Z" fill={color || "white"}/>
    </g>
    <defs>
    <clipPath id="clip0_1087_9597">
      <rect width="15" height="15" fill="white"/>
    </clipPath>
    </defs>
  </svg>
)

export default ArrowPrev