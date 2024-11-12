"use client"

import React, { useState, Suspense } from 'react'
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
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
import Checkboxes from './Checkboxes'
import Loading from '@/app/components/Loading/Loading'
import {useGetProductByNameQuery} from "@/lib/redux/slices/api";
import { setLayoutData } from '@/lib/redux/slices/productSlice';

const init = (slug) => slug[0].includes("melena") 
  ? ((slug[0].includes('capsules') && "1") || (slug[0].includes('100ml') && "2") || (slug[0].includes('30ml') && "3")) 
  : (((slug[0].includes('100ml') && "1") || (slug[0].includes('30ml') && "2")))


const Formation = ({ formationData, formationDataStatic }) => {
  const { slug } = useParams();
  const rInit = init(slug)
  const filterdContent = formationData?.filter(({ id }) => id === rInit)
  // const filterdContent2 = formationData?.find(({ id }) => id === rInit)
  // TODO need to do something better with ids
  const idCart = filterdContent?.[0]?.title + filterdContent?.[0]?.type + (filterdContent?.[0]?.type === "extracts" ? filterdContent?.[0]?.size : '')
  const preObj = {idCart , ...filterdContent?.[0]}
  const source = filterdContent?.[0]?.src || ''

  // if (!formationData?.[0]?.stock || isLoading) {
  //   return <Loading />;
  // }

  // if (isError) {
  //   return <Error />; 
  // }
  const dispatch = useDispatch();
  const { layoutData } = useSelector((state) => state.product);

  const {data} = useGetProductByNameQuery("");
  dispatch(setLayoutData(data));

  console.log('layoutData FORMATION', layoutData)


  // console.log('data', data)
  // if (data) setTimeout(() => console.log('data', data), 4000)
  // await new Promise(resolve => {
  //   if (data) setTimeout(resolve, 0)
  // }) // its how Suspense  for all Formation can be controled

  if (!data) return <Loading />

  return (
    <FormationSection>
      <Suspense fallback={<Loading />}>
        <ContentWrapper>
          <TitleFrame>
            <p>{filterdContent?.[0]?.stock}</p>
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
            <Checkboxes rInit={rInit} formationData={formationData} filterdContent={filterdContent} preObj={preObj} data={data}/>
          {/* </Suspense> */}
        </ContentWrapper>
        <ImageWrapperDesktop key={source}>
          <ImageStyled 
            src={source} 
            alt='formation'
            loading="eager" 
            sizes="(max-width: 1220px) 100vw, 50vw" 
          />
        </ImageWrapperDesktop>
      </Suspense>
    </FormationSection>
  )
}

export default Formation