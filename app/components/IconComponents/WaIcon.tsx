import React, { FC } from 'react';
import { StyledSVGW } from './styled'
import type { IconProps } from '@/types/types'

const Wa: FC<IconProps> = ({ isDark }) => (
  <StyledSVGW
    $isDark={isDark}
    width="50"
    height="50"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="3" width="25" height="25" rx="15" fill="white" />
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      fill="white"
      d="M15.0006 29.0053H14.9949C12.4826 29.0042 10.0186 28.3292 7.86929 27.0539L7.35786 26.7504L2.05888 28.1403L3.47301 22.974L3.14026 22.444C1.73905 20.2149 0.998827 17.6391 1 14.9935C1.00278 7.27437 7.28363 0.994629 15.0056 0.994629C18.7449 0.995741 22.2599 2.45424 24.9032 5.10037C27.5466 7.74649 29.0011 11.2638 29 15.0048C28.9972 22.725 22.7169 29.0053 15.0006 29.0053ZM22.6793 18.5198C22.2583 18.3091 20.1895 17.2912 19.8033 17.1507C19.4178 17.0102 19.1368 16.9399 18.8563 17.3615C18.5758 17.783 17.7693 18.7306 17.5237 19.0116C17.2781 19.2926 17.0325 19.3275 16.612 19.1167C16.5432 19.0823 16.4494 19.0416 16.3335 18.9913C15.7408 18.7342 14.5719 18.2273 13.2274 17.0276C11.9763 15.9114 11.1315 14.5333 10.8859 14.1123C10.6403 13.6908 10.8595 13.4631 11.0703 13.2534C11.1966 13.1275 11.3417 12.9507 11.4868 12.7741C11.5591 12.686 11.6315 12.5978 11.7014 12.5161C11.8797 12.3078 11.9573 12.1496 12.0625 11.9354C12.0813 11.8969 12.101 11.8567 12.1224 11.8141C12.2629 11.5331 12.1927 11.2874 12.0876 11.0767C12.0174 10.9359 11.6185 9.96493 11.2567 9.0846C11.0769 8.64684 10.9063 8.23146 10.7898 7.95167C10.4881 7.22721 10.1825 7.22907 9.93711 7.23055C9.90454 7.2308 9.87302 7.23098 9.84274 7.22944C9.59769 7.21708 9.31667 7.21485 9.0362 7.21485C8.75574 7.21485 8.29994 7.31992 7.91379 7.74148C7.88894 7.76867 7.86113 7.79834 7.83091 7.8306C7.39235 8.29883 6.4407 9.31481 6.4407 11.2526C6.4407 13.3192 7.94129 15.3159 8.15785 15.6041L8.15945 15.6062C8.17311 15.6245 8.19759 15.6596 8.23257 15.7098C8.73497 16.4305 11.402 20.2567 15.3491 21.9613C16.3535 22.3951 17.137 22.6537 17.7485 22.8476C18.7568 23.168 19.6741 23.123 20.3997 23.0145C21.2084 22.8937 22.8895 21.9967 23.2402 21.0136C23.591 20.0306 23.5909 19.1876 23.4859 19.0122C23.4011 18.8703 23.2021 18.774 22.9074 18.6315C22.8368 18.5974 22.7606 18.5606 22.6793 18.5198Z"
    />
  </StyledSVGW>
);

export default Wa;