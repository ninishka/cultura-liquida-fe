import React, { FC } from 'react';

const ArrowNext: FC = ({ color }: { color?: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_1087_9598)">
    <path d="M14 7.5L2.75 13.9952L2.75 1.00481L14 7.5Z" fill={color || "white"} />
  </g>
  <defs>
    <clipPath id="clip0_1087_9598">
    <rect width="15" height="15" fill="white"/>
    </clipPath>
  </defs>
</svg>
)

export default ArrowNext