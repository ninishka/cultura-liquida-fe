import styled from 'styled-components'
import Image from 'next/image'

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 16px 16px 16px 16px;
  padding:  6px 9px 6px 9px;
  margin-right: 30px;
  gap: 30px;

  @media (max-width: 1200px) {
    margin-right: 0;
  }
`

export const Contacts = styled(Image)`
  margin: 6px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 2px solid #9F9F9F;
  border-radius: 16px 16px;
  margin: 67px 0;
  padding: 82px;
  background-color: #2D2D2D;
  gap: 129px;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 50px;
    margin: 41px 41px;
  }

  @media (max-width: 850px) {
    margin: 41px auto;
  }
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1200px) {
    align-items: center;
  }
`

export const ContactText = styled.h2`
  font-size: 48px;
  font-weight: 600;
  line-height: 57.6px;
  letter-spacing: 0.02em;
  text-align: center;
  margin: 0;
`

export const Text = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: center;
`
