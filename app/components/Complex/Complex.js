import { complexData, FormationData } from '@/app/data'
import { useState, useContext } from 'react';
import CartContext from '@/app/contexts/cartContext/cartContext'
import Counter from '../Counter/Counter'
import Formation from '../Formation/Formation'


import imgC9 from '@/app/icons/CL-703.png'

import {
  AllWrap,
  ImgSide,
  ImgItself,
  RightContentWrap,
  TitleWrap,
  Benefits,
  DiscountText,
  ComplexItemsWrap,
  LeftSide,
  LeftTitle,
  ThreeItemsWrap,
  InsideItemWrap,
  Item123,
  LearnMoreWrap,
  LearnMoreText,
  ArrowIcon,
  ArrowButtons,
  CheckBoxGroup,
  RadioButton,
  TextDesc,
  Icon,
  Item,
  LabelContent,
  TwoCardwrap,
  FormationWrap,
  Selecting
} from './styled'

const Complex = ({something, formationData}) => {
  const [ checkedState, setCheckedState ] = useState('1')
  const filterdContent = formationData.filter(({ id }) => id === checkedState)
  const rechecking = id => {
  if(checkedState !== id) setCheckedState(id)
  }

   const source = filterdContent?.[0]?.src || ''
   
  return (
    <section>
      <AllWrap>
        <ImgSide> 
          <ImgItself src={imgC9} alt='Complex'/>
        </ImgSide>
       <RightContentWrap>
          <TitleWrap>
            <Benefits>
             {'mejorar significativamente memoria, sistema nervioso, metabolismo '.toUpperCase()}4
            </Benefits>
            <DiscountText>¡Con la ayuda de un complejo de suplementos de hongos con un 20% de descuento!</DiscountText>
          </TitleWrap>
          <TwoCardwrap>
            <ComplexItemsWrap>
              <LeftSide>
                <LeftTitle>El complejo consta de:</LeftTitle>
                {complexData.map(({src, learnmmore, name }) => (
                  <ThreeItemsWrap key={name}>
                    <InsideItemWrap>
                      <Item123>{name}</Item123>
                    </InsideItemWrap>
                    <LearnMoreWrap>
                      <LearnMoreText>{learnmmore}</LearnMoreText>
                      <ArrowButtons><ArrowIcon src={src} alt='arrow' /></ArrowButtons>
                    </LearnMoreWrap>
                  </ThreeItemsWrap>
                ))}
              </LeftSide>
            </ComplexItemsWrap>
            <FormationWrap>
              <CheckBoxGroup>
                <Selecting>Seleccione el formulario de liberación:</Selecting>
                {FormationData.map(({type, icon, id,}) => (
                  <Item key={id} onClick={() => rechecking(id)}> 
                      <RadioButton 
                        type="radio" 
                        id={id}
                        name="group1"
                        checked={id === checkedState}
                        onChange={() => rechecking(id)} 
                      />
                    <LabelContent htmlFor="text">
                      <Icon src={icon} alt={type}/>
                      <TextDesc>{type}</TextDesc>
                    </LabelContent>
                  </Item>
                  ))}
              </CheckBoxGroup>
            </FormationWrap>
          </TwoCardwrap>

          <Counter filterdContent={filterdContent} />

       </RightContentWrap>
      </AllWrap>
    </section>
    
)}


export default Complex