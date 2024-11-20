import styled from 'styled-components'
import Image from 'next/image'
import { Form, Input, Select } from 'antd'
import { Modal } from 'antd';
import { Button } from 'antd';
import type { ModalStyledProps } from '@/types/types'

export const ModalTitle = styled.h2`
  font-weight: 600;
  line-height: 57.6px;
  font-size: 48px;
  color: black;
  text-align: center;
  @media (max-width: 850px) {
    font-size: 30px;
  }
  font-family: var(--font-mohave);

`

export const ModalStyled = styled(Modal)<ModalStyledProps>`
  z-index: 25; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({$isEmpty}) => $isEmpty ? 'normal' : 'center'};

  .ant-modal-content {
    background-color: #F2C94CCC;
    border-radius: 16px;
    ${({$isEmpty}) => $isEmpty ? 'padding: 50px' : ''}
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: ${({$isEmpty}) => $isEmpty ? 'normal' : 'center'};
  }
`

 
export const ContentWrapper = styled.div`

`

export const ListItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  gap: 9px;
  font-family: var(--font-mohave);

  @media (max-width: 700px) {
    gap: 0;
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`

export const CountAndAmountWrap = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`



export const CartImg = styled(Image)`
  width: auto;
  /* height: auto; */
 margin: 20px;
 @media (max-width: 850px) {
  margin: 10px;
 }
`

export const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 764px) {
    flex-direction: column;
  }  
`

export const InfoContainer = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  
  @media (max-width: 1060px) {
    display: block;
    margin: auto;
  }
` 

export const InfoContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;

  @media (max-width: 1060px) {
    flex-direction: column;
    margin: auto 20px;
  }
` 

export const Title = styled.h3`
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  margin: 0;

  @media (max-width: 1060px) {
    font-size: 20px;
  }
`

export const Description = styled.p`
  color: #333333;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  max-width: 300px;
  margin: 0
`
export const StyledForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;

  .ant-row {
    display: block;
  }

  .ant-form-item-label{
    position: relative;
    text-align: left;
    font-weight: 500;
  }
`

export const StyledInput = styled(Input)`
  height: 52px;
  border-radius: 16px;
`

export const StyledSelect = styled(Select)`
  height: 52px;


  .ant-select-selector {
    border-radius: 16px;
  }
`

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
  width: 50%;
  padding: 7px 15px;
  @media (max-width: 850px) {
    width: 100%;
  }
`



export const LabelErrorWrap = styled.div`
display: flex;
flex-direction: row;
`

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
  width: auto;
  height: auto;
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

export const Price = styled.p`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  color: black;

  @media (max-width: 850px) {
    text-align: left;
    font-size: 24px;
    /* margin-top: 20px; */
  }  
`


export const TotalBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #252525;
  border-radius: 16px;
  margin: 20px;
  padding: 5px;
  font-family: var(--font-mohave);

`
export const TotalWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;

  @media (max-width: 850px) {
    flex-direction: column-reverse;
  }
`
export const LeftSideWrap = styled.div`
  display: flex;
  flex-direction: column;
`


export const Comprar = styled(Button)`
  width: 100%;
 background-color: #4FDB40;
 border: none;
 padding: 30px;
 border-radius: 16px 16px;
 font-weight: 600;
 cursor: pointer;
 font-family: var(--font-mohave);
 font-size: large;

 
  
/* TODO - so we need to change color btns, but Accessability dont let us */ 
/* Possible solution - border for white text or different color */
 // ========= here we can make border for text
 /* position: relative;
  color: transparent;
 -webkit-text-stroke: 1px black;
 text-stroke: 1px black;
 transition: all 0.3s ease; */

 // ====== here how hover for example
 /* color: black; 
 -webkit-text-stroke: 0;
 text-stroke: 0; */



 &:hover{
    background-color: #F2C94C !important;
    color: white !important;
  }
`