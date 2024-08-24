import React, { useState } from 'react';
import {
  MelenaMain,
  ContentWrapper,
  ImageWrapperDesktop,
  ImageWrapperMobile,
  MelenaImage,
  TitleFrame,
  TitleH1,
  Description,
  FrameForTwo,
  Release,
  CheckBoxGroup,
  Item,
  Icon,
  TextDesc,
  Checkbox,
  BuyWrap,
  AmountWrapper,
  AmountItem,
  Prev,
  Next,
  Number,
  ArrowButtons,
  BuyButton,
  Price,
} from './styled'

import icon1 from '../icons/icon_caps.svg'
import icon2 from '../icons/icon_ex100.svg'
import icon3 from '../icons/icon_ex30.svg'
import arrownext from '../icons/arrow_next.svg'
import arrowprev from '../icons/arrow_prev.svg'
import melenacaps from '../icons/Frame_878.png'
import melenaextract from '../icons/Frame_87.png'


const checkBoxes = [
  {
    id: '1',
    icon: icon1,
    text: 'Cápsulas',
    src: melenacaps,
  },
  {
    id: '2',
    icon: icon2,
    text: 'Extracto 100ml',
    src: melenaextract,
  },
  {
    id: '3',
    icon: icon3,
    text: 'Extracto 30ml',
    src: melenaextract,
  },
]

const Melena = () => {
  const [ checkedState, setCheckedState ] = useState('1')
  const [ count, setCount ] = useState(1)

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
  }

  const filterdContent = checkBoxes.filter(({ id }) => id === checkedState)

// sometimes when i put func (for example: console.log() ) u need to know the sintaxis differents
// onClick={console.log('prev')} <-- this gonna be called automaticly on render time
// onClick={() => console.log('prev')} <-- this how it will be called ONLY FATER CLICK on it
  return (
  <MelenaMain>
    <ContentWrapper>
      <TitleFrame>
        <TitleH1>MELENA DE LEON</TitleH1>
        <Description>Cuerpo fructífero de hongos y micelio de Hericium erinaceus.</Description>
      </TitleFrame>
      {filterdContent.map(({ src }) => (
        <ImageWrapperMobile>
          <MelenaImage src={src}/>
        </ImageWrapperMobile>
      ))}
      <FrameForTwo>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
        {checkBoxes.map(({text, icon, id}) => (
          <Item key={id} onClick={() => rechecking(id)}> 
          {/* remake it to radio button later */}
              <Checkbox 
                type="checkbox" 
                id={id}
                name="group1" 
                checked={id === checkedState}
                onChange={() => rechecking(id)}
              />
            <Icon src={icon} alt={text}/>
            <TextDesc>{text}</TextDesc>
          </Item>
          ))}
        </CheckBoxGroup>
      </FrameForTwo>
      <BuyWrap>
        <AmountWrapper>
          <AmountItem>
            <ArrowButtons onClick={() => {
              if(count > 1)  setCount(count - 1)
            }}>
              <Prev src={arrowprev}/>
            </ArrowButtons>
            {/* invisible button is still working around img, need  fix later */}
            <Number>{count}</Number>
            <ArrowButtons  onClick={() => setCount(count + 1)}>
              <Next src={arrownext}/>
            </ArrowButtons>
          </AmountItem>  
          <BuyButton>Comprar</BuyButton>
        </AmountWrapper>
        <Price>90 000 COP</Price>
      </BuyWrap>
    </ContentWrapper>
      {filterdContent.map(({ src }) => (
        <ImageWrapperDesktop>
          <MelenaImage src={src}/>
        </ImageWrapperDesktop>
      ))}
  </MelenaMain>
  )
}

export default Melena;