import styled, { css } from 'styled-components'

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