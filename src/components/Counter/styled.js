import styled from 'styled-components'

export const BuyWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px 0;

  @media (max-width: 1220px) {
    justify-content: center;
    margin: 10px 1vh;
  } 
  
  @media (max-width: 850px) {
    justify-content: center;
    flex-direction: column;
  } 
`

export const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

`

export const AmountItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  /* background-color: #2D2D2D; */
  background-color: ${({$bgc}) => $bgc ? 'white' : '#2D2D2D'};
  border: ${({$bgc}) => $bgc ? '1.5px solid black' : '#2D2D2D'};
  color: ${({$bgc}) => $bgc && 'black'};
  width: 100px;
  height: 52px;
  
  &:hover{
    background-color: #252525;
    background-color: ${({$bgc}) => $bgc ? 'grey' : '#2D2D2D'};
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

export const Number = styled.h4`
  margin: 6px 18px 8px;
`
export const BuyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #4FDB40;
  padding:  17px 29px;
  margin-right: 30px;
  cursor: pointer;
  width: 200px;
  height: 52px;
  color: #fff;
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
  }  
`