"use client"

import React, { useState, useId, Fragment } from 'react'
import Counter from '../Counter/Counter'
import {
  FormationSection,
  ContentWrapper,
  ImageWrapperMobile,
  ImageWrapperDesktop,
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
  LabelContent,
} from './styled'

const Formation = ({ formationDataTitle, formationData }) => {
  const [ checkedState, setCheckedState ] = useState('1')
  const filterdContent = formationData.filter(({ id }) => id === checkedState)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.id
  const preObj = {idCart , ...filterdContent?.[0]}

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
  }

  const source = filterdContent?.[0]?.src || ''
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
      <ImageWrapperMobile key={source}>
        <ImageStyled 
          src={source} 
          height={558} 
          width={486} 
          sizes='fill' 
          alt='Product image'
        />
      </ImageWrapperMobile>
      <FrameForTwo>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
        {formationData.map(({type, icon, id, price}) => (
          <Item key={id} onClick={() => rechecking(id)}> 
          <label>
          <RadioButton 
              type="radio" 
              id={id}
              name="group1" 
              checked={id === checkedState}
              onChange={() => rechecking(id)}
            />
          </label>
           
            <LabelContent htmlFor="text">
              <Icon src={icon} alt={type}/>
              <TextDesc>{type}</TextDesc>
            </LabelContent>
          </Item>
          ))}
        </CheckBoxGroup>
      </FrameForTwo>
      {/* <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        
        <Price style={{color:'white'}}>{filterdContent?.[0]?.price} COP</Price>
      </div> */}
      <Counter filterdContent={filterdContent} preObj={preObj} />
    </ContentWrapper>
    <ImageWrapperDesktop key={source}>
      <ImageStyled src={source} alt='formation'/>
    </ImageWrapperDesktop>
  </FormationSection>
  )
}

export default Formation