import styled, { css, keyframes } from 'styled-components'
import Link from 'next/link'
import type { StatusStyledProps, OrderLoadingStyledProps } from '@/types/types'
import { SyncOutlined } from '@ant-design/icons';

export const PageWrapper = styled.div`
  margin: 10px auto; 
  max-width: 1350px; 

  @media (max-width: 1200px) {
    max-width: 900px;
  }
`

export const CheckoutWrapper = styled.div`
  display: flex;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`

export const RightPanel = styled.div`
  background-color: #252525;
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  margin: 0 0 20px 20px;
  height: fit-content;

  @media (max-width: 1200px) {
    min-width: min-content;
    white-space: nowrap;
    margin: 0 auto 40px auto;
    max-width: 865px;
  }
`

export const StatusPanel = styled.div<StatusStyledProps>`
  background-color: ${({$status}) => $status || '#F2654C'};
  border-radius: 16px;
  height: 92px;
  margin: 15px;
`

export const CheckoutWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const MPinfoItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 10px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

export const TitleH1 = styled.h1`
  font-size: 72px;
  margin: 0;
  letter-spacing: 2%;
  font-weight: 600;

  @media (max-width: 850px) {
    font-size: 40px;
  }
`

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #4FDB40;
  text-decoration: none;
 
  :hover{
    color: #FFD700
    svg path {
      fill: #FFD700;
    }
  }

  * {
    margin: 3px;
  }
`

export const SubtotalText = styled.p`
  font-size: 24px;
  margin: 0;
  color: white;
`

export const PriceTextBoxCheckout = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
`

export const ScrolableZone = styled.div`
  max-height: 1140px; 
  overflow: auto;
  height: 100%;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin: 0 auto;
  }
`


const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SyncOutlinedStyled = styled(SyncOutlined)<OrderLoadingStyledProps>`
  font-size: 36px;
  margin: 0 10px 10px;
  color: #4FDB40;

  :hover {
    color: #F2C94C;
  }

  ${({ loading }) => loading && css`
    animation: ${rotate} 1s linear infinite;
  `}
`



// those two are duplicated from ModalComponent/styled.js
export const ListItemsWrapperCheckout = styled.div`
  width: -webkit-fill-available;
  margin: 10px;
`
export const ModalTitleCheckout = styled.h2`
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