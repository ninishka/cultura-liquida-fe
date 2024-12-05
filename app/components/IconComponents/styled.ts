import styled from 'styled-components'
import type { IconStyledProps } from '@/types/types'

export const StyledSVGT = styled.svg<IconStyledProps>`
  rect {
    transition: fill 0.3s ease;
    fill: ${({$isDark}) => $isDark ? '#2D2D2D' : '#4FDB40'};
  }

  &:hover rect {
    fill: ${({$isDark}) => $isDark ? '#252525' : '#FFD700'};
  }
`;


export const StyledSVGW = styled.svg<IconStyledProps>`
  rect {
    fill: white;
  }

  path {
    transition: fill 0.3s ease;
    fill: ${({ $isDark }) => ($isDark ? '#2D2D2D' : '#4FDB40')};
  }
  
  &:hover path {
    fill: ${({ $isDark }) => ($isDark ? '#252525' : '#FFD700')};
  }
`;