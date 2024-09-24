import styled from 'styled-components'
import Image from 'next/image'

export const IndicationsSection = styled.section`
  display: flex;
  flex-direction: row-reverse;
  border-radius: 16px;
  border: 1px solid #9F9F9F;
  margin: 50px;
  background-color: #2D2D2D;
  line-height: 17.6px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
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
`


export const IndicationsWrapper = styled.div`
  display: flex;

  @media (max-width: 850px) {
    margin: 0 20px;
    flex-direction: column;
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
  color: yellow;
  font-weight: 600;
`




