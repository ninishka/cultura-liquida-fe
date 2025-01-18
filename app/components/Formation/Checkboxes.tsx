import React, { Fragment } from 'react'
import Link from 'next/link'
import { Tooltip } from 'antd'
import Counter from '@/app/components/Counter/Counter'
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

const Checkboxes = ({ rInit, formationData, filterdContent, preObj }) => (
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
                <Tooltip title={'Por favor, elija el método de pago'}>
                  <AbsentProductText>Agotado</AbsentProductText>
                </Tooltip>
              </AbsentProductCheckboxWrapper>
            )}
          </Fragment>
        )})
      }
    </CheckBoxGroup>
    <Counter filterdContent={filterdContent} preObj={preObj} />
  </>
)

export default Checkboxes
