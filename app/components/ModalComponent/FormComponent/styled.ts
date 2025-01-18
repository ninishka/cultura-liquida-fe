import styled, { css } from 'styled-components'
import Link from 'next/link';
import { Form, Input, Select, Checkbox } from 'antd'
import { Button } from 'antd';
import type { OrderStyledProps } from '@/types/types'

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

const inputStyle = css`
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

export const StyledInput = styled(Input)`
  ${inputStyle}
  &:hover, &:focus {
    border: 1px #F2C94C solid; 
  }
`

export const StyledTextarea = styled(Input.TextArea)`
  ${inputStyle}
  &:hover, &:focus {
    border: 1px #F2C94C solid; 
  }
`

export const StyledSelect = styled(Select)<OrderStyledProps>`
  height: 52px;
  ${({$isOrder}) => $isOrder && css`
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
    &:hover, &:focus-within {
      border-color: #F2C94C !important;
    }
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

    
  ${({ $isOrder }) => !$isOrder && css`
    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
      content: '*'; 
      margin-inline-start: 4px; 
      color: black;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
    }`
   }

  ${({ $isOrder }) => $isOrder && css`
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

export const CheckboxInput = styled(Checkbox)`
  .ant-checkbox-inner {
    border-color: #4FDB40 !important;
    transition: all 0.3s ease;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #4FDB40 !important;
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
  margin: 10px 0;
  line-height: 1.2;
  @media (max-width: 650px) {
    max-width: none;
  }
`

export const MailLorar = styled.p`
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 10px 0 0;
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

export const SubtotalText = styled.p`
  font-size: 24px;
  margin: 0;
  color: white;
`

export const PriceTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
`
