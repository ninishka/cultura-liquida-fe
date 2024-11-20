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
  margin: 0 10px 10px;

  position: sticky;
  top: 0;
  background-color: #333;
  z-index: 9999;
  
  @media (max-width: 850px) {
    border-radius: 0 16px 16px;
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
  @media (max-width: 860px) {
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
  padding:  6px 9px 6px 9px;
  margin-right: 30px;
  position: relative;
  /* box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5); */

  &:hover{
    background-color: #252525;
  }

  @media (max-width: 860px) {
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
`

export const BurgerWrap = styled.div`
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  padding:  6px 9px 6px 9px;
  margin-right: 30px;
  position: relative;
  &:hover{
    background-color: #252525;
  }
  display: none;
  @media (max-width: 860px) {
    display: block;
    width: 33px;
    height: 33px;
  }

`
export const BurgerImage = styled(Image)`
   ${reusedStyles}
`
