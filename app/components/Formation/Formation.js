"use client"

import React, { useState, Fragment } from 'react'
import Counter from '../Counter/Counter'
import {
  FormationSection,
  ContentWrapper,
  ImageWrapperMobile,
  ImageStyled,
  TitleFrame,
  TitleH1,
  Description,
  FrameForTwo,
  Release,
  CheckBoxGroup,
  Item,
  Icon,
  TextDesc,
  RadioButton,
  LabelContent
} from './styled'

const Formation = ({ formationDataTitle, formationData }) => {
  const [ checkedState, setCheckedState ] = useState('1')
  const filterdContent = formationData.filter(({ id }) => id === checkedState)
  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
  }

// sometimes when i put func (for example: console.log() ) u need to know the sintaxis differents
// onClick={console.log('prev')} <-- this gonna be called automaticly on render time
// onClick={() => console.log('prev')} <-- this how it will be called ONLY FATER CLICK on it

  return (
  <FormationSection>
    <ContentWrapper>
      <TitleFrame>
        {formationDataTitle.map(({ title, description}) => (
          <Fragment key={title}>
            <TitleH1>{title}</TitleH1>
            <Description>{description}</Description>  
          </Fragment>
        ))}
      </TitleFrame>
      {filterdContent.map(({ src }) => (
        <ImageWrapperMobile key={src}>
          <ImageStyled 
            src={src} 
            height={558} 
            width={486} 
            sizes='fill' 
            alt='Product image'
          />
        </ImageWrapperMobile>
      ))}
      <FrameForTwo>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
        {formationData.map(({text, icon, id}) => (
          <Item key={id} onClick={() => rechecking(id)}> 
            <RadioButton 
              type="radio" 
              id={id}
              name="group1" 
              checked={id === checkedState}
              onChange={() => rechecking(id)}
            />
            <LabelContent htmlFor="text">
              <Icon src={icon} alt={text}/>
              <TextDesc>{text}</TextDesc>
            </LabelContent>
          </Item>
          ))}
        </CheckBoxGroup>
      </FrameForTwo>
      <Counter filterdContent={filterdContent}/>
    </ContentWrapper>
      {/* {filterdContent.map(({ src }) => (
        <ImageWrapperDesktop key={src}>
          <ImageStyled src={src}/>
        </ImageWrapperDesktop>
      ))} */}
  </FormationSection>
  )
}

export default Formation