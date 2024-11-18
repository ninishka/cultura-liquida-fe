import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import {
    Release,
    CheckBoxGroup,
    Item,
    Icon,
    TextDesc,
    RadioButton,
    LabelContent,
  } from './styled'
  import Counter from '../Counter/Counter'

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
            console.log('data Checkboxes', data)

            const hrefLogic = type === "capsules" ? `/product/${url}-${type}` : `/product/${url}-${type}-${size}`
            return (
              <>
                {/* {!!stock && ( */}
                  <Link key={id} href={hrefLogic} style={{textDecoration: 'none', color: '#fff', zIndex: !stock && -99 }}>
                  <Item aria-label={`Elección del tamaño del producto`}> 
                    <label htmlFor={id} aria-label={`Elección del tamaño del producto`} >
                     {!stock ?  <p style={{
                      position: 'absolute',
                      margin: '-15px 0px 0px -20px',
                      color: 'red',
                      fontSize: '20px',
                     }}>SOLD</p> : (
                        <RadioButton
                        id={id}
                        type="radio" 
                        name="group1" 
                        checked={id === rInit}
                        readOnly
                        
                      />
                      )}
                      {/* <RadioButton
                        id={id}
                        type="radio" 
                        name="group1" 
                        checked={id === rInit}
                        readOnly
                        
                      /> */}
                    </label>  
                    <LabelContent >
                      <Icon src={icon} alt={type}/>
                      <TextDesc>{type === 'extracts' ? "Extracto " + size : "Cápsulas"}</TextDesc>
                    </LabelContent>
                  </Item>
                  </Link>
                {/* )} */}
              </>

            )})
          }
        </CheckBoxGroup>
      </div>
      <Counter filterdContent={filterdContent} preObj={preObj} />
    </>
  )
}

export default Checkboxes