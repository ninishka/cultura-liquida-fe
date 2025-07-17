import styled from 'styled-components'
import Image from 'next/image'
import { Radio } from 'antd'

export const ComplexSection = styled.section`
  border-top: 2px solid #9F9F9F;  

  @media (min-width: 2561px) {
    padding: 200px;
  }

  @media (max-width: 2560px) {
    padding: 10vh 0 20vh;
  }
  @media (max-width: 1920px) {
    padding: 15vw 0;
  }
  @media (max-width: 1100px) {
    padding: 20vh 0 10vh;
  }
`

export const AllWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 29px;
  
  @media (max-width: 1200px) {
    flex-direction: column; 
    align-items: center;
  }
  @media (min-width: 2000px) {
    justify-content: center;
  }
  @media (max-width: 1200px) {
    margin: 0;
  }
`

export const ImgMobileWrapper = styled.div`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 40px;
  }
`

export const ImgDesctopWrapper = styled.div`
  display: block;
  @media (max-width: 1200px) {
    display: none;
  }
`

export const ImgMobile = styled(Image)`
  display: none; 
  @media (max-width: 1200px) {
    display: block;
    width: -webkit-fill-available;
    height: auto;
    margin: 0px 10vw;
  }
  @media (max-width: 850px) {
    margin: 0px;
  }
`

export const RightContentWrap = styled.div`
 display: flex;
 flex-direction: column;
 margin-left: 25px;

 @media (max-width: 1200px) {
    align-items: center;
    margin: 0 4vw;
  }
`

export const TitleWrap = styled.div`
 display: flex;
 flex-direction: column;

 @media (max-width: 1200px) {
    align-items: center;
  }
`
export const Benefits = styled.h2`
  font-size: 48px;
  font-weight: 600;
  line-height: 57.6px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 0;

  @media (max-width: 1150px) {
    text-align: center;
  }

  @media (max-width: 850px) {
    font-size: 32px;
    line-height: 40px;
  }

  @media (max-width: 800px) {
    text-align: left;
  }
`

export const DiscountText = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #F2C94C;
  
  @media (max-width: 950px) {
    text-align: center;
  }

  @media (max-width: 800px) {
    text-align: left;
  }

`

export const ComplexItemsWrap = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #2D2D2D;
  padding: 6px 25px;
  border-radius: 16px;
  width: 50%;

  @media (max-width: 1200px) {
    margin: 40px 0 40px 0;
  }

  @media (max-width: 850px) {
    width: auto;
    margin: 20px 0 40px;
  }
`

export const TwoCardwrap = styled.div`
  display: flex;
  flex-direction: row;
  
  @media (max-width: 1200px) {
    gap: 10px;
  }
  @media (max-width: 850px) {
    flex-direction: column; 
    width: -webkit-fill-available;
  }
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`

export const RightSide = styled.div``

export const LeftTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
`

export const ThreeItemsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const InsideItemWrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  margin: 13px 0;
`

export const LearnMoreWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`

export const LearnMoreText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
  color:#9F9F9F;
`

export const ArrowIcon = styled(Image)`
  width: auto;
  margin-top: 16px;
`

export const ArrowButtons = styled.div`
  width: 100%; 
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover ${LearnMoreWrap} {
    transform: translateX(-10px);
    transition: transform 0.1s ease-in-out;
    color: white;
  }

  &:hover ${LearnMoreText} {
    color: white;
  }
`

export const CheckBoxGroup = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: flex-end;
 margin-bottom: 12px;
 width: -webkit-fill-available;

 @media (max-width: 850px) {
    justify-content: center;
    align-items: center;
  }
`

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  cursor: pointer;
  height: 54px;
  margin: 6px;
  border: 1px solid transparent;

  @media (max-width: 850px) {
    padding: 10px 20px;
    text-align: center;
    margin-right: 15px;
    margin: 10px 1vh;
    width: 33vw;
    padding: 10px 20px 10px 0;
  }

  @media (max-width: 700px) {
    width: -webkit-fill-available;
    padding: 10px 20px;
  }

  transition: all 0.3s ease;
  &:hover{
    background-color: #252525;
    border: 1px solid #9F9F9F;
  }
`

export const Icon = styled(Image)`
  width: 50px;
  height: auto;
  margin-left: 10px;
`

export const TextDesc = styled.h4`
  white-space: nowrap;
  font-weight: 400;
  font-size: 16px;
  padding-right: 10px;
  margin-left: 15px;

  @media (max-width: 850px) {
    /* margin: 0; */
    padding-right: 0;
    font-size: 14px;
  }
`

export const RadioButton = styled(Radio)`
  margin-left: 20px;
  display: flex;
  align-items: center;
  
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
`

export const LabelContent = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  font-family: var(--font-mohave);

`

export const FormationWrap = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #2D2D2D;
  padding: 6px 25px;
  border-radius: 16px;
  margin: 0px 21px;
  width: 50%;
  background-color: transparent;
  border: 2px solid #9F9F9F;

  @media (max-width: 1200px) {
    margin: 40px;
  }

  @media (max-width: 850px) {
    margin: 0;
    width: auto;

  }
`

export const Selecting = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
  color: #9F9F9F;
  margin: 13px 16px;
`

export const PriceCounterWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`

export const ButtonsWrapper = styled.div`
  @media (max-width: 850px) {
    display: flex;
    flex-wrap: wrap;
  }
`