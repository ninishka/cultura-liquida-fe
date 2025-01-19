import styled, { css } from 'styled-components'
import { Modal } from 'antd';
import { Button } from 'antd';
import type { ModalStyledProps } from '@/types/types'

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

export const TotalWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;

  @media (max-width: 850px) {
    flex-direction: column;
  }

  @media (max-width: 522px) {
    margin: 0 5px;
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

  @media (max-width: 522px) {
    margin: 10px;
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


export const ListItemsWrapper = styled.div`
  width: -webkit-fill-available;
  margin: 10px;
`