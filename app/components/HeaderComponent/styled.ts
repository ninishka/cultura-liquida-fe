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
  min-height: 88px; 

  position: sticky;
  top: 0;
  background-color: #333;
  z-index: 10;
  
  @media (max-width: 850px) {
    min-height: none; 

    ${({$isopen}) => $isopen ? css`
      border-bottom: none;
      border-radius: unset;
    ` : ''};
  }
  
`

export const LogoFull = styled(Link)`
 margin-left: 30px;
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
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  padding:  6px;
  margin-right: 30px;
  position: relative;
  cursor: pointer;
  border: 1px solid transparent;

  /* box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5); */

  transition: all 0.3s ease;
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }

  @media (max-width: 850px) {
    width: 33px;
    height: 33px;
  }
`

export const CounterCartWrap = styled.div`
 background-color: #F2C94C;
 border-radius: 50%;
 position: absolute;
 width: 23px;
 height: 23px;
 margin: 0 31px;
 margin-top: -13px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const BurgerWrap = styled.div`
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  padding:  6px;
  margin-right: 30px;
  position: relative;
  border: 1px solid transparent;
 
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }
  display: none;
  @media (max-width: 850px) {
    display: block;
    width: 33px;
    height: 33px;
  }

`
export const BurgerImage = styled(Image)`
   ${reusedStyles}
`
