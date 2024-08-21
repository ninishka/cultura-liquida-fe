import styled from 'styled-components'

export const HeaderFull = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const LiDiv = styled.div`
  display: block;
  transition: all 0.3s ease;
  padding: 15px;
  border: 2px solid transparent;
  border-radius: 16px 16px 16px 16px;
  box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5); /* was not in design but i thought it would bemore visible this way */
  &:hover{
    background-color: #252525;
  }
  @media (max-width: 726px) {
    display: none;
  }
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
  padding:  12px 15px 12px 15px;
  margin-right: 30px;
  &:hover{
    background-color: #252525;
  }
  box-shadow: 10px 10px 20px rgba(36, 36, 36, 0.5);

`