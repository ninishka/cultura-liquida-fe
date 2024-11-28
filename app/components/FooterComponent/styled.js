"use client"

import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'

export const FooterFull = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: #252525;
`
export const HeaderLikeFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #252525;
  height: 130px;
  margin-top: 50px;

  @media (max-width: 850px) {
    flex-direction: column;
    height: auto;
  }
`

export const LogoFull = styled(Link)`
 margin-left: 30px;
 

 @media (max-width: 850px) {
    margin-left: 0;
  }
`
export const LogoItself = styled(Image)`
  width: 131px;
  height: auto;
`

export const UlItself = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 0;
`

export const LiItself = styled.li`
  list-style-type: none;
`

export const Contacts = styled(Image)`
  margin: 6px;
`
export const LastFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 25px;
  color:#FFFFFF;
`

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 16px 16px 16px 16px;
  padding:  6px 9px 6px 9px;
  margin-right: 30px;
  /* box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5); */

  /* &:hover{
    background-color: #252525;
  } */
  @media (max-width: 850px) {
    margin-right: 0;
  }
`

export const StyledLink = styled(Link)`
   display: block;
  transition: all 0.3s ease;
  padding: 15px;
  border: 2px solid transparent;
  border-radius: 16px 16px 16px 16px;
  background-color: #252525;
  color: #FFFFFF;
  margin: 0px 20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  &:hover{
    background-color:#333333;
  }

  @media (max-width: 850px) {
   margin:  3px 4px;
  }
`