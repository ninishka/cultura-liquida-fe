import React, { Fragment } from 'react'
import Link from 'next/link'
import Counter from '@/app/components/Counter/Counter'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import Loading from './Loading'
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

const Checkboxes = ({ rInit, formationData, filterdContent, preObj, data }) => {
  // await new Promise(resolve => {
  //   if (data) setTimeout(resolve, 0)
  // }) // its how Suspense  for all Formation can be controled
  // console.log('formationData', formationData)
  const { isLoading } = useGetProductQuery('');

  if (isLoading) return <Loading /> 

  return (
    <>
      <CheckBoxGroup>
        {formationData.map(({type, icon, id, url, size, price, stock}) => {
          const isExtract = type === 'extracts'
          const hrefLogic = isExtract ? `/product/${url}-${type}` : `/product/${url}-${type}-${size}`
          const hasStock = !!stock
          let name = isExtract ? "Extracto " + size : "Cápsulas"
          if (!hasStock)
            name = 'Vendido'

          return (
            <Fragment key={hrefLogic}>
                <Link key={id} href={hrefLogic} style={{textDecoration: 'none', color: '#fff', zIndex: !stock && -99 }}>
                  <Item aria-label='Elección del tamaño del producto'> 
                    <label htmlFor={id} aria-label='Elección del tamaño del producto'>
                      <RadioButton
                        id={id}
                        type="radio"
                        name="group1"
                        checked={id === rInit}
                        disabled={hasStock}
                      />
                    </label>  
                    <LabelContent >
                      <Icon src={icon} alt={type}/>
                      <TextDesc>{name}</TextDesc>
                    </LabelContent>
                  </Item>
                </Link>
            </Fragment>
          )})
        }
      </CheckBoxGroup>
      <Counter filterdContent={filterdContent} preObj={preObj} />
    </>
  )
}

export default Checkboxes
