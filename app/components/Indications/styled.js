import styled from 'styled-components'
import Image from 'next/image'

export const IndicationsContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  border-radius: 16px;
  border: 1px solid #9F9F9F;
  margin: 10vw 0 20vw;

  background-color: #2D2D2D;
  line-height: 17.6px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    margin-top: 30vw;
  }
`

export const IconWrapper = styled.div`
  margin: 90px 40px;

  @media (max-width: 850px) {
    margin: 40px;
  }
`

export const IconIndications = styled(Image)`
  height: 300px;
  width: 300px;
  @media (max-width:500px) {
    height: 200px;
    width: 200px;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 40px 0 0;

  @media (max-width: 850px) {
    align-items: center;
    margin: 0 20px;
  }
`

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 500;
  line-height: 45px;
`


export const IndicationsWrapper = styled.div`
  display: flex;

  @media (max-width: 1100px) {
    flex-direction: column;
  }

  @media (max-width: 850px) {
    width: -webkit-fill-available;
    margin: 0 20px;
  }
`


export const IndicationsDescription = styled.p`
  background-color: #333333;
  border-radius: 16px;
  margin: 0 20px 10px 0;
  padding: 20px;

  @media (max-width: 850px) {
    margin: 0 0 15px;
  }
`

export const CautionWrapper = styled.div`
  display: flex;
  background-color: #333333;
  border-radius: 16px;
  margin: 10px 20px 0 0;
  padding: 20px;

  @media (max-width: 850px) {
    margin: 0 20px;
  }
`

export const Caution = styled.span`
  color: #F2C94C;
  font-weight: 600;
`




