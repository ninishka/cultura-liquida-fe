import styled from 'styled-components'

export const HeaderBenefitsWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 margin: 0 3vh;
`
export const TextForBenefits = styled.h2`
 font-size: 48px;
 font-weight: 600;
 line-height: 57.6px;
 letter-spacing: 2%;
 margin-right: 6vh;
`
export const DescrWrapper = styled.div`
 display: flex;
 flex-direction: column;
 width: 623px;
`

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
`

export const BenefitsCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 204px;
  width: 204px;
  margin: 15px;
  border-radius: 16px;
  background-color: #2D2D2D;
  text-align: center;
`
