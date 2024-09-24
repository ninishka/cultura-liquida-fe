import data from '../data'
import React, { useContext, useState } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'


import {
  Navigation,
  UlItself,
  LiItself,
  StyledButton
} from './styled'


const NavigationComponent = ({shouldDisapeatr}) => {
  const { setDisplayingItem } = useContext(CartContext)

  return (
    <Navigation shouldDisapeatr={shouldDisapeatr}>
      <UlItself shouldDisapeatr={shouldDisapeatr}>
        {data.map(({ title }, index) => {
          const id = index + 1
          return (
            <LiItself key={title}>
              <StyledButton onClick={() => setDisplayingItem(id.toString())}>
                  {title}
              </StyledButton>
            </LiItself>
          )
        })} 
      </UlItself>
    </Navigation>

  )
}

export default NavigationComponent