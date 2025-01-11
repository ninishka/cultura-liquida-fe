import React, { FC } from 'react';
import { StyledSVGT } from './styled'
import type { IconProps } from '@/types/types'

const Wa: FC<IconProps> = ({ isDark }) => (
  <StyledSVGT
    $isDark={isDark}
    width="52"
    height="53"
    viewBox="0 0 52 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.5" width="52" height="52" rx="16" fill="#4FDB40"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M26.0006 40.9556H25.9946C23.3027 40.9544 20.6628 40.258 18.36 38.9422L17.812 38.6291L12.1345 40.0631L13.6497 34.7328L13.2931 34.186C11.7918 31.8861 10.9987 29.2285 11 26.499C11.003 18.5348 17.7325 12.0557 26.006 12.0557C30.0124 12.0568 33.7785 13.5616 36.6106 16.2917C39.4427 19.0219 41.0012 22.6508 41 26.5106C40.997 34.4759 34.2681 40.9556 26.0006 40.9556ZM34.2279 30.1372C33.7768 29.9198 31.5601 28.8696 31.1464 28.7246C30.7333 28.5796 30.4322 28.5071 30.1318 28.9421C29.8313 29.377 28.9671 30.3547 28.704 30.6446C28.4408 30.9346 28.1777 30.9705 27.7272 30.7531C27.6535 30.7175 27.5529 30.6755 27.4288 30.6237C26.7938 30.3584 25.5413 29.8354 24.1008 28.5976C22.7603 27.4459 21.8552 26.0241 21.5921 25.5897C21.3289 25.1548 21.5637 24.92 21.7896 24.7036C21.9249 24.5737 22.0804 24.3913 22.2358 24.2091C22.3133 24.1181 22.3908 24.0272 22.4658 23.9428C22.6568 23.728 22.74 23.5648 22.8527 23.3437C22.8729 23.304 22.894 23.2625 22.9169 23.2186C23.0674 22.9287 22.9922 22.6752 22.8795 22.4578C22.8043 22.3125 22.3769 21.3107 21.9894 20.4025C21.7967 19.9508 21.6138 19.5222 21.4891 19.2336C21.1658 18.4861 20.8384 18.488 20.5755 18.4896C20.5406 18.4898 20.5068 18.49 20.4744 18.4884C20.2118 18.4757 19.9107 18.4734 19.6102 18.4734C19.3097 18.4734 18.8214 18.5818 18.4076 19.0167C18.381 19.0448 18.3512 19.0754 18.3188 19.1087C17.8489 19.5917 16.8293 20.64 16.8293 22.6393C16.8293 24.7715 18.4371 26.8316 18.6691 27.129L18.6708 27.1311C18.6855 27.1499 18.7117 27.1862 18.7492 27.238C19.2875 27.9816 22.145 31.9292 26.3741 33.6879C27.4502 34.1355 28.2896 34.4023 28.9448 34.6024C30.0251 34.9329 31.0079 34.8865 31.7853 34.7746C32.6519 34.6499 34.4531 33.7244 34.8288 32.7102C35.2046 31.696 35.2046 30.8262 35.092 30.6452C35.0012 30.4988 34.788 30.3995 34.4722 30.2525C34.3965 30.2173 34.3149 30.1793 34.2279 30.1372Z" fill="white"/>
  </StyledSVGT>
);

export default Wa;
