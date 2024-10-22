"use client"

import React from 'react'
import { useParams } from 'next/navigation';
import Counter from '../Counter/Counter'
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


const init = (slug) => slug[0].includes("melena") 
  ? ((slug[0].includes('capsules') && "1") || (slug[0].includes('100ml') && "2") || (slug[0].includes('30ml') && "3")) 
  : (((slug[0].includes('100ml') && "1") || (slug[0].includes('30ml') && "2")))


const Formation = ({ formationData, formationDataStatic }) => {
  const { slug } = useParams();
  console.log('slug', slug)
  const rInit = init(slug)
  console.log('rInit', rInit)

  console.log('formationData', formationData)
  const filterdContent = formationData?.filter(({ id }) => id === rInit)
  const filterdContent2 = formationData?.find(({ id }) => id === rInit)
  console.log('filterdContent', filterdContent)
  console.log('filterdContent2', filterdContent2)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.type
  const preObj = {idCart , ...filterdContent?.[0]}
  const source = filterdContent?.[0]?.src || ''

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
        <Release>Seleccione la presentación del producto:</Release>
        <CheckBoxGroup>
          {formationData.map(({type, icon, id, url, size, price}) => {
            const hrefLogic = type === "capsules" ? `/product/${url}-${type}` : `/product/${url}-${type}-${size}`
            return (
              <Link key={id} href={hrefLogic} style={{textDecoration: 'none', color: '#fff'}}>
                <Item aria-label={`Elección del tamaño del producto`}> 
                  <label htmlFor={id} aria-label={`Elección del tamaño del producto`} >
                    <RadioButton 
                      id={id}
                      type="radio" 
                      name="group1" 
                      checked={id === rInit}
                      readOnly
                  />
                  </label>  
                  <LabelContent >
                    <Icon src={icon} alt={type}/>
                    <TextDesc>{type === 'extracts' ? "Extracto " + size : "Cápsulas"}</TextDesc>
                  </LabelContent>
                </Item>
              </Link>
            )})
          }
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