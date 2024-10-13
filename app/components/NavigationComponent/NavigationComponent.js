import React, { useContext } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import data from '../data'
import {
  Navigation,
  UlItself,
  LiItself,
  StyledLink
} from './styled'

const NavigationComponent = ({ isopen }) => {
  const { setShowMenu, setDisplayingItem } = useContext(CartContext)
  
  return (
    <Navigation $isopen={isopen}>
      <UlItself> 
        {data.map(({ title, url, types }) => (
          <LiItself key={title}>
            <StyledLink 
              href={`/product/${url}-${types[0]}`} 
              onClick={() => {
                setShowMenu(false)
                setDisplayingItem(url?.includes('reishi') && '2' ||  url?.includes('cola') &&'3')
              }}
            >
              {title}
            </StyledLink>
          </LiItself>
        ))} 
      </UlItself>
    </Navigation>
  )
}

export default NavigationComponent