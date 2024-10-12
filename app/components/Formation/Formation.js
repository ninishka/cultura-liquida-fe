"use client"

import React, { useState, useEffect, useContext } from 'react'
import Counter from '../Counter/Counter'
import CartContext from '@/app/contexts/cartContext/cartContext'
import Loading from './loading'; 
import Error from './error'; 
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


const Formation = ({ formationData }) => {
  const { isLoading, isError } = useContext(CartContext);
  const [ checkedState, setCheckedState ] = useState('1')
  const [ localData, setLocalData ] = useState(null)

  useEffect(() => {
    if (!!formationData?.length > 0) {
      const filteredData = formationData.find((item, index) => checkedState === `${index+1}`)
      setLocalData(filteredData)
    }
  }, [formationData, checkedState])

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
  }

  const filterdContent = formationData.filter(({ id }) => id === checkedState)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.id
  const preObj = {idCart , ...filterdContent?.[0]}
  const source = filterdContent?.[0]?.src || ''

  if (!formationData?.[0]?.stock || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />; 
  }

  return (
  <FormationSection>
    <ContentWrapper>
      <TitleFrame>
        <TitleH1>{localData?.title}</TitleH1>
        <Description>{localData?.description}</Description>
      </TitleFrame>

      <ImageWrapperMobile key={source}>
        <ImageStyled
          src={source} 
          height={558} 
          width={486} 
          // sizes='fill'
          alt='Product image'
          loading="eager"
          sizes='(max-width: 850px) 100vw, 50vw'
        />
      </ImageWrapperMobile>
      <FrameForTwo>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
          {formationData.map(({type, icon, id, price}) => (
            <Item key={id} onClick={() => rechecking(id)} aria-label={`Elección del tamaño del producto`}> 
              <label htmlFor={id} aria-label={`Elección del tamaño del producto`} >
                <RadioButton 
                  id={id}
                  type="radio" 
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
      </FrameForTwo>
      <Counter filterdContent={filterdContent} preObj={preObj} />
    </ContentWrapper>
    <ImageWrapperDesktop key={source}>
      <ImageStyled 
        src={source} 
        alt='formation'
        loading="eager" 
        sizes="(max-width: 1220px) 100vw, 50vw" 
      />
    </ImageWrapperDesktop>
  </FormationSection>
  )
}

export default Formation