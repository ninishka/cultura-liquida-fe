import styled from 'styled-components'
import type { AmountItemProps } from '@/types/types'

export const CounterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin:40px 0px;
  gap: 20px;
  align-items: center;
  @media (max-width: 1220px) {
    justify-content: center;
    margin: 10px 1vh;
  } 
  
  @media (max-width: 850px) {
    justify-content: center;
    align-items: center;
    gap: 0px;
  } 
`

export const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`

export const AmountItem = styled.div<AmountItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  /* background-color: #2D2D2D; */
  background-color: ${({$bgc}) => $bgc ? 'white' : '#2D2D2D'};
  border: ${({$bgc}) => $bgc ? '1.5px solid black' : '1.5px solid white'};
  color: ${({$bgc}) => $bgc && 'black'};
  width: 100px;
  height: 52px;
  
  /* &:hover{
    background-color: #252525;
    background-color: ${({$bgc}) => $bgc ? 'grey' : '#2D2D2D'};
  } */

  @media (max-width: 850px) {
    /* width: 89px;
    height: 39px; */
    margin: 20px;
  }
`

export const ArrowButtons = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
`

export const Number = styled.h1`
  margin: 6px 18px 8px;
  font-size: 16px;
  font-weight: 700;
  line-height: 17.6px;
  text-align: left;
`
export const BuyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #4FDB40;
  padding:  17px 29px;
  margin-right: '37px';
  cursor: pointer;
  width: 200px;
  height: 55px;
  color: #2d2d2d;
  font-weight: 600;
  border: none;
  font-size: 16px;
  &:hover{
    background-color: #F2C94C;
  }
`

export const Price = styled.p`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  color: black;

  @media (max-width: 850px) {
    text-align: left;
    font-size: 24px;
    margin-top: 20px;
    margin: 25px;
  }  
`

export const PriceWithoutDiscount = styled(Price)`
  text-decoration: line-through;
  font-size: 24px;
  color: #9F9F9F;

  @media (max-width: 850px) {
    font-size: 18px;
  }  
`
