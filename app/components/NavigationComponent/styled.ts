"use client"

import styled, { css } from 'styled-components'
import Link from 'next/link'
import type { NavigationProps } from '@/types/types'

export const UlItself = styled.ul<NavigationProps>`
  display: flex;
  align-items: center;

  @media (max-width: 850px) {
    display: ${({isopen}) => isopen ? 'block' : 'none'};
    flex-direction: ${({ isfooter }) => isfooter ? 'row' : 'column'};
    padding: 0px;
  }
`

export const Navigation = styled.nav<NavigationProps>`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 850px) {
    ${({ isfooter, isopen }) => isfooter ? css`display: flex;` 
    : css`
      position: ${({$position}) => $position || 'absolute'};
      top: ${({$top}) => $top || '80px'};
      background-color: ${({$backgroundColor}) => $backgroundColor || '#333333'};
      width: ${({$width}) => $width || '100%'};
      right: ${({$right}) => $right || '0'};
      height: fit-content;
      z-index: 99999;
      justify-content: center;
      border-bottom: ${isopen ? '2px solid #9F9F9F' : 'none'};
      border-radius: ${({$borderRadius}) => $borderRadius || '0'};
      max-height: ${({$maxHeight}) => $maxHeight || 'auto'};
      overflow-y: ${({$overflowY}) => $overflowY || 'visible'};
    `}
  }
`

export const StyledLink = styled(Link)<NavigationProps>`
  display: block;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 16px 16px 16px 16px;
  background-color: #333333;
  color: #FFFFFF;
  margin: 0 2vw;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;

  transition: all 0.3s ease;
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }

  ${({ isselected }) => isselected && css`
    background-color: #252525;
  `}; 

  @media (min-width:1000px) {
    margin: 0 20px;
  }

 
  @media (max-width:850px) {
    width: ${({ isfooter }) => isfooter ? 'auto' : '268px'};


    margin: 12px;
    background-color: #2D2D2D;

    &:hover{
      background-color: #333333;
    }
  }

  @media (max-width: 412px) {
    ${({ isfooter }) => isfooter ? css`
      height: 45px;
      display: flex;;
      align-items: center;
    ` : ''}; 
  }

  &:hover{
    background-color: #252525;
  }
`
