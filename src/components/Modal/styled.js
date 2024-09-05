import styled from 'styled-components'


export const ModalTitle = styled.h2`
  font-weight: 600;
  line-height: 57.6px;
  font-size: 48px;
   
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 99999;
`

 
export const ContentWrapper = styled.div`

  height: auto;
  /* background-color: rgba(0, 0, 0, 0.5); */
  margin: 5vw;
  padding: 20px;
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;

  
  /* background-color: #F2C94CCC ;
  display: block;
  position: initial;  */

  align-items: stretch
`

export const FullModal = styled.main`
  background-color: #F2C94CCC ;
`

export const CartItemsWrap = styled.div`

`
export const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;

  justify-content: space-between;
`

export const CartImg = styled.img`
  width: 100px;
  height: 100px;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;

`

export const Title = styled.h3`
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  margin: 0;

  /* line-height: 43.2px;
  text-align: left; */
`

export const Description = styled.p`
  color: #333333;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  /* line-height: 22.29px;
  text-align: left; */
`