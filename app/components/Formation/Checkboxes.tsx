import React, { Fragment } from 'react'
import Link from 'next/link'
import Counter from '@/app/components/Counter/Counter'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import {
    CheckBoxGroup,
    Item,
    Icon,
    TextDesc,
    RadioButton,
    LabelContent,
    AbsentProductCheckboxWrapper,
    AbsentProductText
  } from './styled'

const Checkboxes = ({ rInit, formationData, filterdContent, preObj }) => {
  const { data, isLoading, error } = useGetProductQuery('');
  // await new Promise(resolve => {
  //   if (data) setTimeout(resolve, 0)
  // }) // its how Suspense  for all Formation can be controled
  // console.log('formationData', formationData)

  return (
    <>
      <CheckBoxGroup>
        {formationData.map(({type, displayingType, icon, id, url, size, price, availableStock}) => {
          const hrefLogic = `/product/${url}-${type}${size ? `-${size}` : ''}`;
          return (
            <Fragment key={hrefLogic}>
              {!!availableStock ? (
                <Link key={id} href={hrefLogic} style={{textDecoration: 'none', color: '#fff', zIndex: !availableStock && -99 }}>
                  <Item aria-label='Elección del tamaño del producto'> 
                    <label htmlFor={id} aria-label='Elección del tamaño del producto'>
                      <RadioButton
                        id={id}
                        type="radio"
                        name="group1"
                        checked={id === rInit}
                      />
                    </label>  
                    <LabelContent >
                      <Icon src={icon} alt={type}/>
                      <TextDesc>{displayingType}{size ? ` ${size}` : ''}</TextDesc>
                    </LabelContent>
                  </Item>
                </Link>
              ) : (
                <AbsentProductCheckboxWrapper>
                  <AbsentProductText>¡vendido! <br/> ¿Libro?</AbsentProductText>
                </AbsentProductCheckboxWrapper>
              )}
            </Fragment>
          )})
        }
      </CheckBoxGroup>
      <Counter filterdContent={filterdContent} preObj={preObj} />
    </>
  )
}

export default Checkboxes
