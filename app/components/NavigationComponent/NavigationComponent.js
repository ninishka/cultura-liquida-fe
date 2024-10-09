import data from '../data'
import React, { useContext, useState } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'


import {
  Navigation,
  UlItself,
  LiItself,
  StyledButton
} from './styled'


const NavigationComponent = ({isopen}) => {
  const { setDisplayingItem, setShowMenu } = useContext(CartContext)

  const navClick = (id) => {
    setDisplayingItem(id.toString())
    setShowMenu(false)
  }


  return (
    <Navigation $isopen={isopen}>
      <UlItself> 
        {data.map(({ title }, index) => {
          const id = index + 1
          return (
            <LiItself key={title}>
              <StyledButton onClick={() => navClick(id)}>
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