"use client"

import styled, { css } from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import type { NavigationProps } from '@/types/types'

export const HeaderFull = styled.header<NavigationProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #9F9F9F;
  height: 100px;
  margin: 0 20px;

  max-width: 1920px;
  margin: 0 auto;

  /* position: sticky; */
  top: 0;
  background-color: #333;
  z-index: 10;
  
  @media (max-width: 850px) {
    min-height: none; 

    ${({isopen}) => isopen ? css`
      border-bottom: none;
      border-radius: unset;
    ` : ''};
  }
`

export const LogoFull = styled(Link)`
 margin-left: 8px;
`
export const LogoItself = styled(Image)`
  width: 131px;
  height: auto;
`

const reusedStyles = css`
  width: 40px;
  height: 40px;
  @media (max-width: 850px) {
    width: 33px;
    height: 33px;
  }
`

export const Cart = styled(Image)`
   ${reusedStyles}
`

export const CartWrap = styled.div`
  height: 52px;
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 30px;
  position: relative;
  cursor: pointer;
  border: 1px solid transparent;
  /* position: fixed !important; */

  transition: all 0.3s ease;
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }
`

export const CounterCartWrap = styled.div`
  padding-top: 2px;
  background-color: #F2C94C;
  border-radius: 50%;
  position: absolute;
  width: 23px;
  height: 23px;
  top: -8px;
  left: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Counter = styled.p`
  padding-top: 1px;
  color: black;
  font-size: 14px;
  font-weight: 500;
`

export const BurgerWrap = styled.div`
  display: none;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  padding:  10px;
  margin-right: 30px;
  position: relative;
  border: 1px solid transparent;
 
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }
  
  @media (max-width: 850px) {
    display: block;
    width: 33px;
    height: 33px;
  }
`
export const BurgerImage = styled(Image)`
   ${reusedStyles}
`

interface StickyWrapperStyled {
  $isSticky?: boolean
}

export const StickyWrapper = styled.div<StickyWrapperStyled>`
  display: flex;
  
  ${({ $isSticky }) => $isSticky && css`
    position: fixed;
    top: 15px;
    right: -20px;
    /* right: 0px; */
    z-index: 1000;
  `}; 
`