import styled, { css } from 'styled-components'
import type { ModalStyledProps2 } from '@/types/types'

export const CounterWrapper = styled.div<ModalStyledProps2>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* margin:40px 0px; */
  margin: ${({$isModal}) => $isModal ? '40px 3vw' : '40px 0px'};
  gap: 20px;
  align-items: center;

  @media (min-width: 1700px) {
    margin: ${({$isModal}) => $isModal && '20px 3vh'};
  } 

  @media (max-width: 1200px) {
    justify-content: center;
    /* margin: 20px 1vh 20px 3vh; */
    margin: ${({$isModal}) => !$isModal && '20px 1vh 20px 3vh'};
  } 
  
  @media (max-width: 850px) {
    justify-content: center;
    align-items: center;
    gap: 0px;
    /* margin: 0; */
    max-width: 400px;

    /* justify-content: flex-start;
        margin: 0 13%; */
  } 


  @media (max-width: 764px) {
    margin: 40px 7vw;
  }

  @media (max-width: 650px) {
    margin: 10px;
  } 
  @media (max-width: 522px) {
    margin: 0 10px 0 0;
  } 
`

export const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`

export const AmountItem = styled.div<ModalStyledProps2>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: ${({$isModal}) => $isModal ? 'white' : '#2D2D2D'};
  border: ${({$isModal}) => $isModal ? '1.5px solid black' : '1.5px solid white'};
  color: ${({$isModal}) => $isModal && 'black'};
  width: 100px;
  height: 52px;
  
  /* &:hover{
    background-color: #252525;
    background-color: ${({$isModal}) => $isModal ? 'grey' : '#2D2D2D'};
  } */

  @media (max-width: 850px) {
    /* width: 89px;
    height: 39px; */
    margin: 20px;
    margin-left: ${({$isModal}) => !$isModal && '10px'};
    margin: ${({$isModal}) => $isModal && '0px'};
  }

`

export const ArrowButtons = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`

export const Number = styled.h1`
  margin: 3px 0 0 0;
  font-size: 16px;
  font-weight: 700;
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
  font-family: var(--font-mohave);
  color: white;
  text-transform: uppercase;

  @media (max-width: 1200px) {
    width: 216px;
  } 

  @media (max-width: 850px) {
    width: 180px;
  }

  transition: all 0.3s ease;
  &:hover{
    background-color: #F2C94C;
  }
`

export const Price = styled.p<ModalStyledProps2>`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  color: black;

  @media (max-width: 850px) {
    text-align: left;
    font-size: 24px;
    margin: 25px;
    margin-top: ${({$isModal}) => !$isModal && 0};
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
