"use client"

import React, { useContext } from 'react'
import Counter from '../Counter/Counter'
import CartContext from '@/app/contexts/cartContext/cartContext'
import Link from 'next/link'
import {
  FormationSection,
  ContentWrapper,
  ImageWrapperMobile,
  ImageWrapperDesktop,
  ImageStyled,
  TitleFrame,
  TitleH1,
  Description,
  Release,
  CheckBoxGroup,
  Item,
  Icon,
  TextDesc,
  RadioButton,
  LabelContent,
} from './styled'


const Formation = ({ formationData }) => {
  const { checkedState, setCheckedState } = useContext(CartContext);

  const rechecking = id => {
    if(checkedState !== id) setCheckedState(id)
  }

  const filterdContent = formationData.filter(({ id }) => id === checkedState)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.id
  const preObj = {idCart , ...filterdContent?.[0]}
  const source = filterdContent?.[0]?.src || ''
  console.log('source - reload the page if empty', source)

  // if (!formationData?.[0]?.stock || isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return <Error />; 
  // }

  return (
  <FormationSection>
    <ContentWrapper>
      <TitleFrame>
        <TitleH1>{filterdContent?.[0]?.title || ''}</TitleH1>
        <Description>{filterdContent?.[0]?.description || ''}</Description>
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
      <div>
        <Release>Seleccione el formulario de liberación:</Release>
        <CheckBoxGroup>
          {formationData.map(({type, icon, id, url, size, price}) => {
            const hrefLogic = type === "capsules" ? `/product/${url}-${type}` : `/product/${url}-${type}-${size}`
            return (
              <Link key={id} href={hrefLogic} style={{textDecoration: 'none', color: '#fff'}}>
                <Item 
                  onClick={() => rechecking(id)} 
                  aria-label={`Elección del tamaño del producto`}
                > 
                  <label htmlFor={id} aria-label={`Elección del tamaño del producto`} >
                    <RadioButton 
                      id={id}
                      type="radio" 
                      name="group1" 
                      checked={id === checkedState}
                      // c={console.log('id', id, checkedState)}
                      onChange={() => rechecking(id)} 
                  />
                  </label>  
                  <LabelContent >
                    <Icon src={icon} alt={type}/>
                    <TextDesc>{type + size}</TextDesc>
                  </LabelContent>
                </Item>
              </Link>
            )})}
        </CheckBoxGroup>
      </div>
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