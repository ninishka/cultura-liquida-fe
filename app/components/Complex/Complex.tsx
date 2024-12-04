import React, { FC } from 'react'
import { complexData2 } from '@/app/data'
import { useState } from 'react';
import Counter from '../Counter/Counter'
import data from '../data'

import imgC9 from '@/app/icons/CL-703.png'
import imgC10 from '@/app/icons/CL-71.png'
import imgC from '@/app/icons/arrow_next.svg'
import {
  AllWrap,
  ImgSide,
  ImgDesktop,
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
  Selecting,
  PriceCounterWrap,
  ImgMobile
} from './styled'

const Complex: FC = () => {
  const [ checkedState, setCheckedState ] = useState<string>('1')

  const rechecking = (id: string) => {
    if(checkedState !== id) setCheckedState(id)
  }

  const filterdContent = complexData2.filter(({ id }) => id === checkedState)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.id
  const preObj = {idCart , ...filterdContent?.[0]}

  return (
    <section>
      <AllWrap>
        <ImgSide> 
          <ImgDesktop sizes='100vw' src={imgC9} alt='Complex'/>
          <ImgMobile sizes='100vw' src={imgC10} alt='Complex'/>
        </ImgSide>
       <RightContentWrap>
          <TitleWrap>
            <Benefits>
              MEJORAR SIGNIFICATIVAMENTE MEMORIA, SISTEMA NERVIOSO, METABOLISMO
            </Benefits>
            <DiscountText>
              ¡Con la ayuda de un complejo de suplementos de hongos con un 20% de descuento!
            </DiscountText>
          </TitleWrap>
          <TwoCardwrap>
            <ComplexItemsWrap>
              <LeftSide>
                <LeftTitle>El complejo consta de:</LeftTitle>
                {data.map(({ url, title, types }, index) => (
                  <ThreeItemsWrap key={title}>
                    <InsideItemWrap>
                      <Item123>{title}</Item123>
                    </InsideItemWrap>
                    <ArrowButtons href={`/product/${url}-${types[0]}`} aria-label={`Obtenga más información sobre ${title}`}>
                      <LearnMoreWrap key={title + `${index + 1}`.toString()}>
                        <LearnMoreText>Leer más</LearnMoreText>
                        <ArrowIcon src={imgC} alt='arrow' />
                      </LearnMoreWrap>
                    </ArrowButtons>
                  </ThreeItemsWrap>
                ))} 
              </LeftSide>
            </ComplexItemsWrap>
            <FormationWrap>
              <CheckBoxGroup>
                <Selecting>Seleccione la presentación del producto:</Selecting>
                {complexData2.map(({type, icon, id}) => (
                  <Item key={id} onClick={() => rechecking(id)} aria-label={`Elección del tamaño del producto`}> 
                    <label htmlFor={id} aria-label={`Elección del tamaño del producto`}>
                      <RadioButton 
                        type="radio" 
                        id={`${id}+${type}`}
                        name="group1" 
                        checked={id === checkedState}
                        onChange={() => rechecking(id)}
                      />
                    </label>
                    <LabelContent>
                      <Icon src={icon} alt={type}/>
                      <TextDesc>{type}</TextDesc>
                    </LabelContent>
                  </Item>
                  ))}
              </CheckBoxGroup>
            </FormationWrap>
          </TwoCardwrap>
          <PriceCounterWrap>
            <Counter filterdContent={filterdContent} preObj={preObj} isComplex /> 
          </PriceCounterWrap>
       </RightContentWrap>
      </AllWrap>
    </section>
)}


export default Complex


