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
  right: 0;
  bottom: 0;
  background-color: rgba(9, 9, 9, 0.9);
  height: 100%;
  width: 100%;
  z-index: 99999; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

 
export const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  overflow-x: auto;
  overflow-y: auto;
  background-color: #F2C94CCC;
  display: block;
  /* align-items: stretch */
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
  align-items: center;
  border-radius: 16px 16px;
  margin: 22px 0px 22px;
`

export const CountAndAmountWrap = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;

`

export const CartImg = styled.img`
    margin: 15px;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;

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
  margin-top: 0px;
`
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

export const FormField = styled.div`
  margin-bottom: 15px;
  position: relative;

  & > label {
    display: block;
    width: 100%;
    margin-bottom: 5px;
    font-weight: bold;
  }

  & > input,
  & > textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const FormWrapper = styled.div`

`
