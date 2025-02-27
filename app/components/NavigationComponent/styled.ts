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
      position: absolute;
      top: 75px;
      background-color: #333333;
      width: 100%;
      right: 0;
      height: fit-content;
      z-index: 99999;
      justify-content: center;
      border-bottom: ${isopen ? '2px solid #9F9F9F' : 'none'};
    `}
  }
`

export const StyledLink = styled(Link)<NavigationProps>`
  display: block;
  padding: 15px;
  border: 2px solid transparent;
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
    border: 2px solid #9F9F9F;
  }

  ${({ isselected }) => isselected && css`
    background-color: #252525;
  `}; 
 
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
