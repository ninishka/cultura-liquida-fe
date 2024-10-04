import styled from 'styled-components'
import Image from 'next/image'

export const FormationSection = styled.section`
  display: flex;
  flex-direction: row;
  margin: 10px 15px;
  border-bottom: 2px solid #9F9F9F;

  @media (max-width: 1220px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

export const ContentWrapper = styled.div`
  width: 60%;
  margin-top: 50px;

  @media (max-width: 1220px) {
    width: auto;
    margin-top: 0;
  }
`

export const ImageWrapperDesktop = styled.div`
  @media (max-width: 1220px) {
    display: none;
  }
`

export const ImageWrapperMobile = styled.div`
  display: none;
  @media (max-width: 1220px) {
    display: flex;
    justify-content: center;
  }
`

export const ImageStyled = styled(Image)`

  @media (max-width: 850px) {
    height: 300px;
    width: auto
  }
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

export const FrameForTwo = styled.div`
`

export const Release = styled.h3`
  color: lightgray;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  margin-bottom: 20px;
  margin-top: 24px;

  @media (max-width: 850px) {
    font-size: 14px;
  }
`

export const CheckBoxGroup = styled.div`
 display: flex;
 flex-direction: row;

 @media (max-width: 850px) {
    justify-content: center
  }
`
export const Item = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 30px;
  cursor: pointer;
  width: 216px;
  height: 62px;

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

export const  Icon = styled(Image)`
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

export const LabelContent = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
`