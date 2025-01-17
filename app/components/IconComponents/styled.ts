import styled, { css } from 'styled-components'
import type { IconStyledProps } from '@/types/types'

export const StyledSVGT = styled.svg<IconStyledProps>`
  rect {
    transition: all 0.3s ease;
    fill: ${({$isDark}) => $isDark ? '#2D2D2D' : '#4FDB40'};    
  }

  &:hover rect {
    fill: ${({$isDark}) => $isDark ? '#252525' : '#FFD700'};
  }

  ${({ $isDark }) => $isDark ? css`
    border: 1px solid transparent;

    &:hover {
      border: 1px solid #9F9F9F;
      border-radius: 16px;
    }
  ` : ''}
`;
