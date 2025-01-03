import styled from 'styled-components'
import Link from 'next/link'
import type { StatusStyledProps } from '@/types/types'
import { SyncOutlined } from '@ant-design/icons';

export const CheckoutWrapper = styled.div`
  display: flex;
`

export const RightPanel = styled.div`
  background-color: #252525;
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  margin: 0 0 20px 20px;
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
  /* background-color: #252525; */
`
export const MPinfoItem = styled.div`
  background-color: #252525;
  border-radius: 16px;
  height: 80px;
  padding: 20px;
  margin: 5px;
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

export const PriceTextBox = styled.p`
  display: flex;
  justify-content: space-between;
  margin: 0;
`

export const ScrolableZone = styled.div`
  max-height: 1140px; 
  overflow: auto;
  height: 100%;
  margin-bottom: 20px;

  &::-webkit-scrollbar {
    width: 8px !important;
  }

  &::-webkit-scrollbar-thumb {
    background: #F2C94C !important;
    border-radius: 4px !important;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #F2C94C !important;
  }

  &::-webkit-scrollbar-track {
    background: #252525 !important;
  }
`

export const SyncOutlinedStyled = styled(SyncOutlined)`
  font-size: 36px;
  margin: 0 5px 10px;
  color: #4FDB40;

  :hover {
    color: #F2C94C;
  }
`
