import styled, { css } from 'styled-components'
import Image from 'next/image'
import Link from 'next/link';
import { Form, Input, Select, Checkbox } from 'antd'
import { Modal } from 'antd';
import { Button } from 'antd';
import type { ModalStyledProps, OrderStyledProps } from '@/types/types'

export const ModalTitle = styled.h2`
  font-weight: 600;
  line-height: 57.6px;
  font-size: 48px;
  color: black;
  text-align: center;
  text-transform: uppercase;
  
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
  /* display: flex;
  flex-direction: column;
  align-items: stretch; */
  width: -webkit-fill-available;
    margin: 10px;
`

export const CartItemWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  /* justify-content: flex-end; */
`
export const CartItem = styled.div<OrderStyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-around; */
  background-color: white;
  border-radius: 16px 16px;
  margin: 10px 0;
  width: inherit;
  gap: 9px;
  font-family: var(--font-mohave);
  min-width: 280px;

  @media (max-width: 850px) {
    gap: 0;
  }

  ${({isOrder}) => isOrder ? css`
    @media (max-width: 522px) {
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  ` : css`
    @media (max-width: 522px) {
      margin: 10px;
      flex-wrap: wrap;
      /* flex-direction: column; */
      justify-content: flex-start;
    }
  `}
`

export const CountAndAmountWrap = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`



export const CartImg = styled(Image)`
  width: revert-layer;
  height: auto;
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
    align-items: baseline;
  }  

  @media (max-width: 522px) {
    flex-direction: column;
    margin: 0 auto;
  }
`

export const InfoContainer = styled.div<OrderStyledProps>`
  display: flex;
  align-items: center;
  
  @media (max-width: 600px) {
    flex-direction: column ;
  }

  @media (max-width: 522px) {
    flex-direction: row;
    margin: 10px;
    ${({isOrder}) => isOrder ? css`
      padding: 0 17% 0 40px;
      justify-content: space-between;
      width: inherit;
    ` : ''};
  }
` 

export const InfoContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 13vw;

  @media (max-width: 2200px) {
    min-width: 15vw;
  }

  @media (max-width: 1880px) {
    min-width: 17vw;
  }

  @media (max-width: 1520px) {
    min-width: 23vw;
  }

  @media (max-width: 1060px) {
    min-width: 22vw;
    flex-direction: column;
    margin: auto 20px;
  }

  @media (max-width: 500px) {
    margin: 0;
  }
` 

export const Title = styled.h3`
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  margin: 0;
  white-space: nowrap;

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
  margin: 0;
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

  &.ant-input[disabled] {
    background-color: #2D2D2D;
    border-color: #2D2D2D;
    text-transform: uppercase;
    color: #F2C94C;
    font-weight: 700;
    cursor: auto;
  }
`

export const StyledSelect = styled(Select)<OrderStyledProps>`
  height: 52px;
  ${({isOrder}) => isOrder && css`
    &.ant-select * {
      cursor: auto  !important;
      font-weight: 700;
    }

    &.ant-select-disabled {
      background-color: #2D2D2D;
      border-color: #2D2D2D;
      border-radius: 16px;

      .ant-select-selector {
        border-color: #2D2D2D;
        text-transform: uppercase;
        color: #F2C94C !important;
      }

      .ant-select-arrow {
        display: none;  
      }
    }
  `}

  .ant-select-selector {
    border-radius: 16px;
  }
`

export const StyledFormItem = styled(Form.Item)<OrderStyledProps>`
  margin-bottom: 0;
  width: 50%;
  padding: 7px 15px;

  .ant-radio-checked .ant-radio-inner {
    border-color: #4FDB40; 
    background-color: #4FDB40; /* Inner dot color for checked radio */
  }

  /* TODO BORDER HOVER COLOR */
  /* .ant-radio-checked .ant-radio-inner::after {
    border: 1px solid #4FDB40 !important
  } */

  /* :hover {
    border: 1px solid #4FDB40 !important
  } */

    
  ${({ isOrder }) => !isOrder && css`
    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
      content: '*'; 
      margin-inline-start: 4px; 
      color: black;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
    }`
   }

  ${({ isOrder }) => isOrder && css`
      .ant-form-item-label > label {
        color: white
      }`
   }

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    content: ''; /* Remove the default asterisk */
  }

  .ant-form-item-explain-error{
    color: red;
    font-weight: 600;
  }

  .ant-input-status-error:not(.ant-input-disabled){
    border-color: red;
    box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2) !important;
  }
  .ant-input-status-error:not(.ant-input-disabled):focus,
  .ant-input-status-error:not(.ant-input-disabled):hover {
    border-color: red !important; 
  }

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
  margin: 5px -12px;
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

export const CheckboxInput = styled(Checkbox)`
  .ant-checkbox-inner {
    border-color: #4FDB40;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #4FDB40;
  }
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

export const Price = styled.p<OrderStyledProps>`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  color: black;
  white-space: nowrap;

  @media (max-width: 850px) {
    text-align: left;
    font-size: 24px;
    /* margin-top: 20px; */
  }

  @media (max-width: 600px) {
    margin-top: 3px !important;
  }
  
  /* @media (max-width: 522px) {
    ${({isOrder}) => isOrder ? 'padding-left: 40%' : ''}    
  } */

  ${({isOrder}) => isOrder ? css`
    @media (max-width: 522px) {
      padding-left: 40%
    }
    @media (max-width: 470px) {
      padding-left: 38%
    }
    @media (max-width: 400px) {
      padding-left: 32%
    }
  ` : css`
    @media (max-width: 522px) {
      padding-left: 25%
    }
    @media (max-width: 470px) {
      padding-left: 15%
    }
    @media (max-width: 400px) {
      padding-left: 5%
    }
  `}    

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
    flex-direction: column;
  }
`
export const LeftSideWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin: 15px;
  width: 60%;

  @media (max-width: 850px) {
    width: auto;
  }
`


export const CartPayButton = styled(Button)`
  width: 100%;
  background-color: #4FDB40;
  border: none;
  padding: 30px;
  border-radius: 16px 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-mohave);
  font-size: large;
  text-transform: uppercase;
  color: white;


 transition: all 0.3s ease;
 &:hover{
    background-color: #F2C94C !important;
    color: white !important;
  }

  ${({ disabled }) =>
    disabled && css`
    background-color: #BDBDBD !important;
    color: #FFFFFF80 !important;
    cursor: not-allowed !important;
    pointer-events: none;
    &:hover {
      background-color: #BDBDBD !important;
      color: #FFFFFF80 !important;
    }
  `}
`

export const ItemProductTypeText = styled.p`
  color: red;
  text-align: center;
  width: 90px;
  /* margin: 0 20px 2px 2vw; */
  font-size: 16px;
  /* margin: 0 6vh 0 8vh;
  

  @media (max-width: 1650px) {
    margin: 0 5vh 0 7vh;
  }

  @media (max-width: 940px) {
    margin: 0 0.5vh 0 1.5vh;
  } */

  @media (max-width: 764px) {
    margin: 0 8vw 0 0;
    width: auto;

    /* margin: auto 20px; */
  }
`

export const BankInfoBlock = styled.div`
  background-color: #2D2D2D;
  border-radius: 16px;
  padding: 10px 20px;
  width: -webkit-fill-available;
  margin: 10px;
`

export const BankInfoText = styled.p`
  margin: 0;
  color: white;
`

export const BankNumberBlock = styled.div`
  display: flex;
  justify-content: space-between;
`

export const BankInfoNumber = styled.p`
  margin: 0;
  color: #F2C94C;
  font-weight: 700;
  letter-spacing: 0.5px;
`

export const BankInfoBlockOrder = styled(BankInfoBlock)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 0;
  /* max-width: max-content; */

  @media (max-width: 800px) {
    margin-bottom: 10px;
  }
`

const orderedStyle = css`
  color: black;
  white-space: nowrap;

  @media (max-width: 522px) {
    margin: 0;
  }
`

export const OrderedAmount = styled.b`
  ${orderedStyle}
`

export const OrderedX = styled.p`
  margin: 20px 2vw;
  ${orderedStyle}
`

export const MailLink = styled(Link)`
  font-weight: 700;
  margin: 10;
  color: black;
  letter-spacing: 0.6px;
  text-decoration: underline;

  &:hover {
    color: black !important;
    /* text-decoration: underline; */
  }
`

export const MailWrapper = styled.div`
  background-color: #F2C94C;
  border-radius: 16px;
  width: -webkit-fill-available;
  margin: 10px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

export const MailDescription = styled.p`
  max-width: 50%;
  margin: 7px 0;
  line-height: 1.2;
  @media (max-width: 650px) {
    max-width: none;
  }
`

export const MailLorar = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  margin: 10;
  @media (max-width: 650px) {
    margin: 5px 0;
  }
`

export const BankingBoxesWrapper = styled.div`
  display: flex;
  @media (max-width: 650px) {
    flex-direction: column;
  }
`

export const TransferBoxWrapper = styled.div`
  margin: 10px;
  @media (max-width: 850px) {
    margin: 10px 20px;
  }
`