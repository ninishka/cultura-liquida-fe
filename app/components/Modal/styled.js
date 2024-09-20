import styled from 'styled-components'
import Image from 'next/image'

export const FormItself = styled.form`

`

export const ModalTitle = styled.h2`
  font-weight: 600;
  line-height: 57.6px;
  font-size: 48px;
  color: black;
  text-align: center;
   
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(8, 8, 8, 0.8);
  height: 100%;
  width: 100%;
  z-index: 99999; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

 
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: stretch;
  
  padding: 50px 40px;
  width: 80%;
  max-width: 960px;
  margin: 0 auto;
  overflow-y: auto;
  background-color: #F2C94CCC;
  margin-top: 104px;
  border-radius: 16px 16px;
  background-image: url(${({src}) => src});
`

export const ListItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const FullModal = styled.main`
  background-color: #F2C94CCC ;
`

export const CartItemWrap = styled.div`
 display: flex;
 flex-direction: row;
 width: 100%;
 /* justify-content: flex-end; */
`
export const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  border-radius: 16px 16px;
  margin: 22px 0px 22px;
  width: inherit;
`

export const CountAndAmountWrap = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`
export const WrapForErrorAndLabel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 14px;
  align-items: center;
  & > label {
    color: black;
  }
`

export const CartImg = styled(Image)`
 margin: 15px;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h3`
  font-size: 25px;
  font-weight: 500;
  color: #333333;
  margin: 0;
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
  & > input,
  & > textarea,
  & > select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    border: none;
    outline: none;
    box-sizing: border-box;
    resize: none;
    min-height: 50px;
    color: #9F9F9F;
  }
`;

export const FormWrapper = styled.div`

`
export const ErrorMessage = styled.p`
  color: red;
  font-size: 16px; 
  font-weight: 400;
`;

export const DeleteButtonWrap = styled.div`
`
export const DeleteButtonItself = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;

  margin: 18px -12px;
`
export const DeleteButtonIcon = styled(Image)`
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  background-color: black;
  accent-color: black;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
`;

export const EmptyCartWrapper = styled.div`
  
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