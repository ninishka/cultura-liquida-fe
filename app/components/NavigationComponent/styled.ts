"use client"

import styled from 'styled-components'
import Link from 'next/link'
import type { NavigationProps } from '@/types/types'

export const UlItself = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

export const Navigation = styled.nav<NavigationProps>`
  display: flex;
  align-items: center;
  flex-direction: row;

  @media (max-width: 850px) {
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
  }
 
  @media (max-width:850px) {
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
