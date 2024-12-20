import styled from 'styled-components'
import Image from 'next/image'
import { Radio } from 'antd'
import Link from 'next/link'

export const AllWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 29px;
  
  @media (max-width: 1200px) {
    flex-direction: column; 
    align-items: center;
  }
  @media (min-width: 2000px) {
    justify-content: center;
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
 /* margin-left: 20px; */

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

  @media (max-width: 850px) {
    font-size: 32px;
    line-height: 40px;
  }

`
export const DiscountText = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #F2C94C;
`

export const ComplexItemsWrap = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #2D2D2D;
  padding: 6px 25px;
  border-radius: 16px;
  /* margin: 0px 21px; */
  width: 50%;

  @media (max-width: 1200px) {
    margin: 40px;
  }
  @media (max-width: 850px) {
    width: auto;
    margin: auto 40px;
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
  }

`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
`

export const RightSide = styled.div`

`
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
export const Item123 = styled.h3`
  font-size: 24px;
  font-weight: 400;
  line-height: 28.8px;
  letter-spacing: 0.02em;
  text-align: left;
  margin: 13px 0
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
  width: 15px;
  height: auto;
  /* color: lightgray; */
`

 export const ArrowButtons = styled(Link)`
  cursor: pointer;
  text-decoration: none;
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

  @media (max-width: 850px) {
    /* width: 70px;
    height: 125px; */
    /* flex-direction: column; */
    padding: 10px 20px;
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
    margin-left: 0;
  }
`
export const TextDesc = styled.h4`
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
    width: auto
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