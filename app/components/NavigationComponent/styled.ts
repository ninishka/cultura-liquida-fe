"use client"

import styled from 'styled-components'
import Link from 'next/link'

export const UlItself = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 860px) {
    flex-direction: column;
  }
`

interface NavigationProps {
  $isopen: boolean;
}

export const Navigation = styled.nav<NavigationProps>`
  display: flex;
  align-items: center;
  flex-direction: row;
  @media (max-width: 860px) {
    display: ${({$isopen}) => $isopen ? 'block' : 'none'};
    position: fixed;
    top: 67px;
    background-color: #333333;
    width: 100%;
    right: 0;
    height: fit-content;
    z-index: 99999;
    border-top: 2px solid #9F9F9F;
    justify-content: center;
  }
`

export const LiItself = styled.li`
  list-style-type: none;
`

export const StyledLink = styled(Link)`
  display: block;
  transition: color 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
  background-color 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);  
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
 
  @media (max-width:860px) {
    width: 268px;
    margin: 12px;
    background-color: #2D2D2D;

    &:hover{
      background-color: #333333;
    }
  }

  &:hover{
    /* color: #000000; */
    background-color: #252525;
  }
`
