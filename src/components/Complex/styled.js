import styled from 'styled-components'

export const AllWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  @media (max-width: 1200px) {
    flex-direction: column; 
    align-items: center;
  }
`
export const ImgSide = styled.div`

`
export const ImgItself = styled.img`

`
export const RightContentWrap = styled.div`
 display: flex;
 flex-direction: column;

 @media (max-width: 1200px) {
    align-items: center;
  }
`
export const TitleWrap = styled.div`
 display: flex;
 flex-direction: column;
 margin-left: 20px;

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
  margin: 0px 21px;
  width: 50%;

  @media (max-width: 1200px) {
    margin: 20px 0;
    width: auto
  }
`

export const TwoCardwrap = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1200px) {
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
export const Item123 = styled.h5`
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
`
export const LearnMoreText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 17.6px;
  text-align: left;
  color:#FFFFFF;
`

 export const ArrowIcon = styled.img`
  width: 15px;
 `

 export const ArrowButtons = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
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
export const Item = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  cursor: pointer;
  height: 54px;
  margin: 6px;

  @media (max-width: 850px) {
    width: 70px;
    height: 125px;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 20px;
    text-align: center;
    margin-right: 15px;
    margin: 10px 1vh;
  }

  &:hover{
    background-color: #252525;
  }
`

export const  Icon = styled.img`
  width: 50px;
  margin-left: 10px;

  @media (max-width: 850px) {
    margin-left: 0
  }
`
export const TextDesc = styled.h6`
  font-weight: 400;
  font-size: 16px;
  padding-right: 10px;

  @media (max-width: 850px) {
    margin: 0;
    padding-right: 0;
    font-size: 14px;
  }
`

export const RadioButton = styled.input`
  appearance: none;
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
  }
`

export const LabelContent = styled.label`
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
    margin: 20px 0;
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