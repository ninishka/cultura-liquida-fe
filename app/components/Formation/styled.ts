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
  margin-bottom: 10px;
  cursor: pointer;
  width: 216px;
  height: 62px;
  border: 1px solid transparent;

  @media (max-width: 850px) {
    width: 168px;
  }

  @media (max-width: 620px) {
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

    ${({$soldout}) => $soldout && css`
      background-color: #F2654C;
    `}
  }

`

export const FormationSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 945px) {
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  @media (max-width: 2560px) {
    min-height: 100vh;
  }
`

export const ContentWrapper = styled.div`
  @media (max-width: 945px) {
    width: auto;
    margin-top: 0;
  }
`

export const ImageWrapperDesktop = styled.div`
  width: 45%;
  height: 45%;

  @media (max-width: 1200px) {
    margin: 2vw;
    width: 60%;
    height: 60%;
  }

  @media (max-width: 945px) {
    display: none;
  }
`
export const ImageWrapperMobile = styled.div`
  width: 45%;
  display: none;

  @media (max-width: 945px) {
    display: flex;
    justify-content: center;
    width: auto;
    max-width: 500px;
    margin: 0 auto;
  }

  @media (max-width: 850px) {
    width: auto;
    display: flex;
  }
`

export const ImageStyled = styled(Image)`
  object-fit: contain;
  height: max-content;
  max-height: 88vh;
  width: -webkit-fill-available;
  max-width: 750px;
  margin-bottom: 6vw;

  @media (max-width: 945px) {
    margin-bottom: auto;
    height: 57vh;
  }

  @media (max-width: 850px) {
    margin-bottom: auto;
  }

  @media (max-width: 620px) {
    height: 47vh;
  }

  @media (max-width: 520px) {
    height: 40vh;
  }
`

export const TitleFrame = styled.div`
  margin-top: 40px;

  @media (max-width: 945px) {
    margin-top: 25px;
  }
`
export const TitleH1 = styled.h1`
  font-size: 72px;
  margin: 0;
  letter-spacing: 2%;
  font-weight: 600;

  @media (max-width: 945px) {
    font-size: 64px;
  }
`
export const Description = styled.h2`
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 2%;
  margin: 0;

  @media (max-width: 945px) {
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

  @media (max-width: 945px) {
    font-size: 18px;
    margin: 15px 0 30px;
  }

  @media (max-width: 850px) {
    /* font-size: 14px; */
    margin-bottom: 20px;
  }
`

export const CheckBoxGroup = styled.div`
 display: flex;
 flex-direction: row;

 @media (max-width: 1200px) {
    flex-wrap: wrap;
    min-width: 480px;
  }

  @media (max-width: 945px) {
    justify-content: center;
    flex-wrap: nowrap;
    min-width: auto;
  }
`

export const CheckBoxGroupInner = styled.div`
 display: flex;
 flex-direction: row;

 @media (max-width: 1200px) {
    flex-wrap: wrap;
  }

  @media (max-width: 945px) {
    justify-content: center;
    flex-wrap: nowrap;
  }
`

export const Icon = styled(Image)`
  width: 50px;
  height: auto;
  // margin-left: 10px;

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
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  font-family: var(--font-mohave);

 @media (max-width: 620px) {
    flex-direction: column;
  }
`
