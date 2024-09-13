import styled from 'styled-components'

export const HeaderFull = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #9F9F9F;
  margin: 10px 10px;
`

export const LogoFull = styled.div`
 margin-left: 30px;
`
export const LogoItself = styled.img`
  width: 131px;
`


export const UlItself = styled.ul`
  display: flex;
  flex-direction: row;
`

export const LiItself = styled.li`
  list-style-type: none;
`

export const Cart = styled.img`
  width: 40px;

`

export const CartWrap = styled.div`
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  padding:  6px 9px 6px 9px;
  margin-right: 30px;
  position: relative;
  /* box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5); */

  &:hover{
    background-color: #252525;
  }
`

export const StyledButton = styled.button`
  display: block;
  transition: all 0.3s ease;
  padding: 15px;
  border: 2px solid transparent;
  border-radius: 16px 16px 16px 16px;
  background-color: #333333;
  color: #FFFFFF;
  margin: 0px 20px;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;

  @media (max-width: 726px) {
    display: none;
  }

  &:hover{
    background-color: #252525;
  }
`
export const CounterCartWrap = styled.div`
 background-color: #F2C94C;
 border-radius: 50%;
 position: absolute;
 width: 23px;
 height: 23px;
 margin: 0 31px;
 margin-top: -13px;
`