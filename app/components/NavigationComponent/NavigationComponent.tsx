import React, { FC } from 'react'
import data from '@/app/components/data'
import type { NavigationProps } from '@/types/types'
import {
  Navigation,
  UlItself,
  LiItself,
  StyledLink
} from './styled'

const NavigationComponent: FC<NavigationProps> = ({ isopen, setShowMenu, isFooter }) => (
  <Navigation $isopen={isopen} $isFooter={isFooter}>
    <UlItself $isFooter={isFooter}> 
      {data.map(({ title, url, types }) => (
        <LiItself key={title} onClick={() => isopen && setShowMenu(false)}>
          <StyledLink href={`/product/${url}-${types[0]}`} $isFooter={isFooter}>
            {title}
          </StyledLink>
        </LiItself>
      ))} 
    </UlItself>
  </Navigation>
)

export default NavigationComponent