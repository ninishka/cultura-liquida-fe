"use client"

import styled from 'styled-components'
import Image from 'next/image'

export const HeaderFull = styled.header`
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
    border-radius: 16px 16px;
  }
  
`

export const LogoFull = styled.div`
 margin-left: 30px;
`
export const LogoItself = styled(Image)`
  width: 131px;
`

export const Cart = styled(Image)`
  width: 40px;
  height: 40px;
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

// export const BurgerWrap = styled.div`
//   border-radius: 16px 16px 16px 16px;
//   background-color: #2D2D2D;
//   padding:  6px 9px 6px 9px;
//   margin-right: 30px;
//   position: relative;
//   &:hover{
//     background-color: #252525;
//   }
//   display: none;
//   @media (max-width: 860px) {
//     display: block;
//   }

// `
// export const BurgerImage = styled(Image)`
//   width: 40px;
//   height: 40px;
// `

export const HamburgerButton = styled.button`
background-color: transparent;
border: none;
display: none;
flex-direction: column;
align-items: center;
justify-content: center;
cursor: pointer;
gap: 0.5rem;
 span{
  width: 35px;
  height: 1.5px;
  background-color: #4FDB40;
 }

 @media (max-width: 860px) {
    display: flex;
  }
`