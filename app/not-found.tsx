'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import img404 from '@/app/icons/404error.svg'
import styled from 'styled-components'
import ArrowPrev from '@/app/components/ArrowPrev/ArrowPrev'

export const Title = styled.h2`
  font-size: 48px;
  font-weight: 600;
  line-height: 57.6px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 0;
  color: white;

  @media (max-width: 850px) {
    font-size: 30px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const H = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #4FDB40;
  /* padding:  17px 29px; */
  margin-right: '37px';
  cursor: pointer;
  width: 200px;
  height: 55px;
  color: #2d2d2d;
  font-weight: 600;
  border: none;
  font-size: 16px;
  color: white;
  text-decoration: none;

  &:hover{
    background-color: #F2C94C;
  }
`

const NotFound: FC = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Wrapper>
        <Title style={{ marginBottom: 10}}>{'Página no encontrada'.toUpperCase()}</Title>
        <H href="/product/melena-de-leon-capsules">
          <ArrowPrev aria-label="Back" />
          <p style={{ marginLeft: 10}}>{'Devolver'.toUpperCase()}</p>
        </H>
      </Wrapper>

      <Image             
        src={img404} 
        alt='Page Not Found Image'
        loading="eager"
        // sizes="(max-width: 1220px) 100vw, 50vw" 
        priority // hight loading priority 
      />
    </div>
  )
}

export default NotFound