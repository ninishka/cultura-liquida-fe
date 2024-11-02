import React from 'react'
import data from '../data'
import {
  Navigation,
  UlItself,
  LiItself,
  StyledLink
} from './styled'

const NavigationComponent = ({ isopen }: { isopen: boolean }) => (
  <Navigation $isopen={isopen}>
    <UlItself> 
      {data.map(({ title, url, types }) => (
        <LiItself key={title}>
          <StyledLink href={`/product/${url}-${types[0]}`}>
            {title}
          </StyledLink>
        </LiItself>
      ))} 
    </UlItself>
  </Navigation>
)

export default NavigationComponent