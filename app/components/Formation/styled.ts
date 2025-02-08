import styled, { css } from 'styled-components'
import Image from 'next/image'
import { Radio } from 'antd'
import Link from 'next/link'
import type { ProductItemProps } from '@/types/types'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`

export const StyledItem = styled.div<ProductItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 20px;
  cursor: pointer;
  width: 216px;
  height: 62px;
  border: 1px solid transparent;

  @media (max-width: 850px) {
    width: 50px;
    height: 105px;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 20px;
    text-align: center;
    margin-right: 15px;
    margin: 10px 1vh;
  }

  transition: all 0.3s ease;

  ${({checked}) => checked && css`
    border: 1px solid #9F9F9F;
  `}

  &:hover{
    background-color: #252525;

    ${({soldOut}) => soldOut && css`
      background-color: #F2654C;
    `}
  }

`

export const FormationSection = styled.section`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #9F9F9F;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* @media (min-width: 2000px) {
    justify-content: center;
  } */
`

export const ContentWrapper = styled.div`
  width: 65%;
  margin-top: 50px;

  @media (max-width: 1200px) {
    width: auto;
    margin-top: 0;
  }
`

export const ImageWrapperDesktop = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`

export const ImageWrapperMobile = styled.div`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`

export const ImageStyled = styled(Image)`
    height: 470px;
    width: auto 
`

export const TitleFrame = styled.div`
  margin-top: 40px;
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
export const Description = styled.h2`
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 2%;
  margin: 0;

  @media (max-width: 850px) {
    font-size: 18px;
  }
`

export const Release = styled.h3`
  color: #9F9F9F;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 40px;
  margin-top: 40px;

  @media (max-width: 850px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`

export const CheckBoxGroup = styled.div`
 display: flex;
 flex-direction: row;

 @media (max-width: 1200px) {
    justify-content: center
  }
`

export const Icon = styled(Image)`
  width: 50px;
  height: auto;
  margin-left: 10px;

  @media (max-width: 850px) {
    margin-left: 0
  }
`
export const TextDesc = styled.h4`
  font-weight: 400;
  font-size: 16px;
  padding-right: 10px;

  @media (max-width: 850px) {
    margin: 0;
    padding-right: 0;
    font-size: 14px;
  }
`

export const RadioButton = styled(Radio)`
display: flex;
align-items: center;
    margin-left: 20px;

.ant-radio-inner {
  border: 1px solid #FFFFFF; 
  background-color: transparent;
  border-radius: 50%;
}

.ant-radio-checked .ant-radio-inner {
  border-color: #FFFFFF;
  background-color: transparent;
}

.ant-radio-checked .ant-radio-inner::after {
  background-color: #FFFFFF;
}

&:hover .ant-radio-inner {
  border-color: #FFFFFF; 
}

.ant-radio-wrapper {
  margin-left: 20px;
}

@media (max-width: 850px) {
    margin-left: 8px;
  }
`

export const LabelContent = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;

 @media (max-width: 850px) {
    flex-direction: column;
  }
`
