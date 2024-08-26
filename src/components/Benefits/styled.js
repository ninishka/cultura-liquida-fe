import styled from 'styled-components'

export const HeaderBenefitsWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 margin: 0 2vh;

 @media (max-width: 850px) {
    flex-direction: column;
    align-items: start;
    margin: 0 1vh;
  }
`
export const TextForBenefits = styled.h2`
 font-size: 48px;
 font-weight: 600;
 line-height: 57.6px;
 letter-spacing: 2%;
 margin-right: 6vh;

 @media (max-width: 850px) {
    font-size: 40px;
    line-height: 45px;   
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 5px;

  @media (max-width: 850px) {
    justify-content: space-evenly;
  }
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

  @media (max-width: 850px) {
    height: 166px;
    width: 140px;
  }
`
