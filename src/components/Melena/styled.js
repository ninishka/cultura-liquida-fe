import styled from 'styled-components'

export const MelenaMain = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 2px solid #9F9F9F;
  margin: 20px 40px;
  border-bottom: 2px solid #9F9F9F;
`

export const TitleFrame = styled.div`
  margin-top: 40px;
`
export const TitleH1 = styled.h1`
  font-size: 72px;
  margin: 0;
`
export const Description = styled.h5`
  font-size: 24px;
  margin: 0;
`

export const FrameForTwo = styled.div`
  /* display: flex; */
`

export const Release = styled.h6`
  color: lightgray;
  font-size: 24px;
`
export const CheckBoxGroup = styled.div`
 display: flex;
 flex-direction: row;
 /* justify-content: space-between; */
`
export const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 30px;
  cursor: pointer;
  width: 216px;
  height: 62px;
  
  &:hover{
    background-color: #252525;
  }
`

export const  Icon = styled.img`
  width: 50px;
  margin-left: 10px;

`
export const TextDesc = styled.h6`

`

export const Checkbox = styled.input`
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

export const BuyWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px 0;
`

export const AmountItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #2D2D2D;
  margin-right: 30px;
  width: 100px;
  height: 52px;
  
  &:hover{
      background-color: #252525;
    }
`

export const ArrowButtons = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
`

export const Prev = styled.img`
   cursor:pointer;
`

export const Next = styled.img`
   cursor:pointer;
`
export const Number = styled.h4`
margin: 5px 5px 10px;
`
export const BuyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 16px 16px;
  background-color: #4FDB40;
  padding:  17px 29px;
  margin-right: 30px;
  cursor: pointer;
  width: 200px;
  height: 52px;
  color: #fff;
  font-weight: 600;

  &:hover{
    background-color: #252525;
  }
`