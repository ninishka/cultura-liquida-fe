"use client"
import Image from 'next/image'

import styled from 'styled-components'

export const BenefitsSection = styled.section`
  min-height: 70vh;
  /* margin: 20vh 0 0; */
  padding: 20vw 0 5vw;
  border-top: 2px solid #9F9F9F;
`

export const HeaderBenefitsWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 
 @media (max-width: 850px) {
    flex-direction: column;
    align-items: start;
    margin: 0 1vh;
  }
  /* @media (min-width: 2000px) {
    justify-content: space-around;
  } */
`
export const TextForBenefits = styled.h2`
 font-size: 48px;
 font-weight: 600;
 line-height: 57.6px;
 margin-right: 6vh;
 margin-bottom: 20px;
 min-width: 340px;

 @media (max-width: 1200px) {
    font-size: 40px;
    line-height: 45px;
    margin-bottom: 10px;
  }
`
export const DescrWrapper = styled.div`
 display: flex;
 flex-direction: column;
 width: 623px;

 @media (max-width: 850px) {
    width: auto;
  }
`

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;

  @media (max-width: 850px) {
    font-size: 14px;
  }
`
export const DescriptionCard = styled.p`
  text-align: center;
  margin: 10px 5px;

  @media (max-width: 850px) {
    margin: 5px;
  }
`

export const BenefitsCards = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  align-items: stretch;
  
  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr); /* Ensure 3 columns */
  }

  @media (max-width: 850px) {
    grid-template-columns: repeat(2, 1fr); /* Ensure 2 columns */
  }
`

export const Card = styled.div`
  min-width: 180px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 204px;
  border-radius: 16px;
  background-color: #2D2D2D;
  text-align: center;

  @media (max-width: 850px) {
    height: 166px;
    /* width: 195px; */
  }

  @media (max-width: 500px) {
    padding: 20px 0;
  }
`
export const BenefitIcon = styled(Image)`
  width: 100%;
  height: auto
`

export const BenefitIconWrapper = styled.div`
  width: 100px;
  height: 100px;
  
  @media (max-width: 850px) {
    width: 76px;
    height: 76px;
  }
`