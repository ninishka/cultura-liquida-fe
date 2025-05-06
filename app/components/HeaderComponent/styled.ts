"use client"

import styled, { css, keyframes } from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import type { NavigationProps } from '@/types/types'
import type { HTMLAttributes } from 'react'

export const HeaderFull = styled.header<NavigationProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #9F9F9F;
  height: 100px;

  max-width: 1920px;
  margin: 0 auto;
  padding: 0 20px;

  /* position: sticky; */
  top: 0;
  background-color: #333;
  z-index: 10;
  
  @media (max-width: 850px) {
    min-height: none; 
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

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(242, 201, 76, 0.6);
    border: 1px solid rgba(242, 201, 76, 0.4);
  }
  70% {
    box-shadow: 0 0 8px 4px rgba(242, 201, 76, 0);
    border: 1px solid rgba(242, 201, 76, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(242, 201, 76, 0);
    border: 1px solid rgba(242, 201, 76, 0);
  }
`
interface CartWrapProps extends HTMLAttributes<HTMLDivElement> {
  $highlight?: boolean
}

export const CartWrap = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$highlight'
})<CartWrapProps>`
  height: 52px;
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: #252525;
  margin-right: 30px;
  position: relative;
  cursor: pointer;
  border: 1px solid transparent;

  transition: all 0.3s ease;
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }

  ${({ $highlight }) => $highlight && css`
    animation: ${pulse} 0.5s ease-in-out;
  `}
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
  font-weight: 600;
`

export const BurgerWrap = styled.div`
  display: none;
  border-radius: 16px 16px 16px 16px;
  background-color: #252525;
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
    right: 20px;
    z-index: 999;
    
    @media (min-width: 1920px) {
      right: calc(50% - 960px + 20px);
    }
  `}; 
`