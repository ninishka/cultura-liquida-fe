import React, { FC } from 'react';
import { StyledSVGT } from './styled'
import type { IconProps } from '@/types/types'

const Ph: FC<IconProps> = ({ isDark }) => (
  <StyledSVGT
    $isDark={isDark}
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="52" height="52" rx="16" fill="#2D2D2D"/>
    <path d="M38.5675 33.9389L33.1202 28.4915C32.4392 27.8106 31.4859 27.8106 30.805 28.4915L28.4899 30.8066C25.4938 33.9389 18.1399 26.5849 21.1359 23.5888L23.4511 21.2737C24.132 20.5928 24.132 19.6395 23.4511 18.9586L18.0037 13.5112C17.3228 12.8303 16.3695 12.8303 15.6885 13.5112L14.0543 15.1454C11.1945 18.0053 13.9181 25.3592 20.3188 31.6237C26.5833 37.8882 33.9373 40.7481 36.7971 37.8882L38.5675 36.254C39.2485 35.5731 39.2485 34.6198 38.5675 33.9389Z" fill="white"/>
  </StyledSVGT>
);

export default Ph;
