"use client"

import React, { FC } from 'react'
import { useParams } from 'next/navigation';
import type { FormationProps } from '@/types/types'
import { init } from '@/app/components/helpers'
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
} from './styled'
import Checkboxes from './Checkboxes'

const Formation: FC<FormationProps> = ({ formationData, error }) => {
  const { slug } = useParams();
  const rInit = init(slug)
  const filterdContent = formationData?.filter(({ id }) => id === rInit)
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.type + (filterdContent?.[0]?.type === "extracts" ? filterdContent?.[0]?.size : '')
  const preObj = {idCart , ...filterdContent?.[0]}
  const source = filterdContent?.[0]?.src || ''

  // if (error) return <div>Error: {error?.message}</div>;

  return (
    <FormationSection>
      <ContentWrapper>
        <TitleFrame>
          {/* <p>{filterdContent?.[0]?.stock}</p> */}
          <TitleH1 style={{textTransform: 'uppercase'}}>{filterdContent?.[0]?.title || ''}</TitleH1>
          <Description>{filterdContent?.[0]?.description || ''}</Description>
        </TitleFrame>

        <ImageWrapperMobile key={source}>
          <ImageStyled
            src={source} 
            height={558} 
            width={486} 
            // sizes='fill'
            alt='La imagen del producto'
            priority // hight loading priority
            loading="eager"
            sizes='(max-width: 850px) 100vw, 50vw'
          />
        </ImageWrapperMobile>
        <Release>Seleccione la presentación del producto:</Release>
        <Checkboxes rInit={rInit} formationData={formationData} filterdContent={filterdContent} preObj={preObj} />
      </ContentWrapper>
      <ImageWrapperDesktop key={source}>
        <ImageStyled 
          src={source} 
          alt='La imagen del producto'
          loading="eager"
          sizes="(max-width: 1200px) 100vw, 50vw" 
          priority // hight loading priority
        />
      </ImageWrapperDesktop>
    </FormationSection>
  )
}

export default Formation