import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleShowMenu } from '@/app/store/slices/cartSlice'
import data from '../data'
import {
  Navigation,
  UlItself,
  LiItself,
  StyledLink
} from './styled'

const NavigationComponent = ({ isopen }) => {
  const dispatch = useDispatch()
  
  return (
    <Navigation $isopen={isopen}>
      <UlItself> 
        {data.map(({ title, url, types }) => (
          <LiItself key={title}>
            <StyledLink 
              href={`/product/${url}-${types[0]}`} 
              onClick={() => dispatch(toggleShowMenu())}
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