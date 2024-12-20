import styled from 'styled-components'
import Image from 'next/image'
import { Radio } from 'antd'


export const FormationSection = styled.section`
  display: flex;
  flex-direction: row;
  margin: 10px 15px;
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
export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 20px;
  cursor: pointer;
  width: 216px;
  height: 62px;

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
  &:hover{
    background-color: #252525;
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
  /* appearance: none;
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
  background: transparent;
  border-radius: 50%;
  border: 0.5px solid #ddd;
  cursor: pointer;
  position: relative;
  margin-left: 20px;

  @media (max-width: 850px) {
    margin-left: 0;
  }

  &:checked::after {
    content: "";
    display: block;
    width: 0.7em; 
    height: 0.7em;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    z-index: 1;
  } */

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

export const AbsentProductCheckboxWrapper = styled.div`
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 20px;
  width: 216px;
  height: 62px;
  text-align: center;
  background-color: #F2654C;

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
`

export const AbsentProductText = styled.p`
  margin: 10px 0 0 0;
  text-align: center;
  text-transform: uppercase;

  @media (max-width: 850px) {
    margin-top: 60%;
  }
`