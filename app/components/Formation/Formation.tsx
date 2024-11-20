"use client"

import React, { Suspense, FC } from 'react'
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
  Description
} from './styled'
import Checkboxes from './Checkboxes'
import Loading from '@/app/components/Loading/Loading'

const Formation: FC<FormationProps> = ({ formationData, formationDataStatic, isLoading, error, slogMain, isMain }) => {
  const { slug } = useParams();
  const conditionSlug = isMain ? slogMain : slug 
  const rInit = init(conditionSlug)
  const filterdContent = formationData?.filter(({ id }) => id === rInit)
  // const filterdContent2 = formationData?.find(({ id }) => id === rInit)
  // TODO need to do something better with ids
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.type + (filterdContent?.[0]?.type === "extracts" ? filterdContent?.[0]?.size : '')
  const preObj = {idCart , ...filterdContent?.[0]}
  const source = filterdContent?.[0]?.src || ''


  if (isLoading) return <Loading />
  // if (error) return <div>Error: {error?.message}</div>;

  return (
    <FormationSection>
      <Suspense fallback={<Loading />}>
        <ContentWrapper>
          <TitleFrame>
            {/* <p>{filterdContent?.[0]?.stock}</p> */}
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
          {/* <Suspense fallback={<Loading />}> */}
            <Checkboxes rInit={rInit} formationData={formationData} filterdContent={filterdContent} preObj={preObj} data={formationData}/>
          {/* </Suspense> */}
        </ContentWrapper>
        <ImageWrapperDesktop key={source}>
          <ImageStyled 
            src={source} 
            alt='formation'
            loading="eager"
            sizes="(max-width: 1220px) 100vw, 50vw" 
            priority // hight loading priority
          />
        </ImageWrapperDesktop>
      </Suspense>
    </FormationSection>
  )
}

export default Formation