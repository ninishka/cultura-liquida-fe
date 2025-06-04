import styled, { css } from 'styled-components'
import Link from 'next/link';
import type { ContactsStyledProps } from '@/types/types'

export const MailLink = styled(Link)`
  font-weight: 700;
  margin: 10;
  color: #F2C94C;
  letter-spacing: 0.6px;
  text-decoration: underline;

  &:hover {
    color: #F2C94C !important;
  }
`

export const MailWrapper = styled.div<ContactsStyledProps>`
  border: 1px solid #F2C94C;
  border-radius: 16px;
  width: -webkit-fill-available;
  margin: 10px 15px;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 850px) {
    flex-direction: column;
  }

  ${({ isColumn }) => isColumn && css`
    flex-direction: column;
  `}
`

export const MailDescription = styled.p<ContactsStyledProps>`
  color: white;
  max-width: 50%;
  margin: 20px 0;
  line-height: 1.2;
  @media (max-width: 850px) {
    max-width: none;
  }
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: normal;
  ${({ isColumn }) => isColumn && css`
    max-width: 100%;
  `}
`

export const MailContent = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const MailImgWrapper = styled.p`
  margin: 6px 30% 0;
  @media (max-width: 1000px) {
    margin: 6px 20% 0;
  }
  @media (max-width: 850px) {
    margin: 0;
  }
`

export const StyledLink = styled(Link)`
  margin: 5px 20px 0;

  @media (max-width: 1000px) {
    margin: 5px 10px 0;
  }

  @media (max-width: 850px) {
   margin:  0px 4px;
  }
`

export const TransferNote = styled.p`
  margin: 18px 13px 0;
  font-size: 16px;
  color: white;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: normal;
`
