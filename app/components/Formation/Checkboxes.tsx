import React, { Fragment } from 'react'
import Link from 'next/link'
import Counter from '@/app/components/Counter/Counter'
import {
    Release,
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

  return (
    <>
      <div>
        <Release>Seleccione la presentación del producto:</Release>
        <CheckBoxGroup>
          {formationData.map(({type, icon, id, url, size, price, stock}) => {
            const hrefLogic = type === "capsules" ? `/product/${url}-${type}` : `/product/${url}-${type}-${size}`
            return (
              <Fragment key={hrefLogic}>
                {!!stock ? (
                  <Link key={id} href={hrefLogic} style={{textDecoration: 'none', color: '#fff', zIndex: !stock && -99 }}>
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
                        <TextDesc>{type === 'extracts' ? "Extracto " + size : "Cápsulas"}</TextDesc>
                      </LabelContent>
                    </Item>
                  </Link>
                ) : (
                  <AbsentProductCheckboxWrapper>
                    <AbsentProductText>{'¡vendido!'.toUpperCase()} <br/> {'¿Libro?'.toUpperCase()}</AbsentProductText>
                  </AbsentProductCheckboxWrapper>
                )}
              </Fragment>
            )})
          }
        </CheckBoxGroup>
      </div>
      <Counter filterdContent={filterdContent} preObj={preObj} />
    </>
  )
}

export default Checkboxes
