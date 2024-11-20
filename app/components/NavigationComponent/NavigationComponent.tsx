import React, { FC } from 'react'
import data from '@/app/components/data'
import type { NavigationProps } from '@/types/types'
import {
  Navigation,
  UlItself,
  LiItself,
  StyledLink
} from './styled'

const NavigationComponent: FC<NavigationProps> = ({ isopen }) => (
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