import React, { FC } from 'react'
import type { NavigationProps } from '@/types/types'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import { uniqueTitles } from '@/app/components/helpers'
import {
  Navigation,
  UlItself,
  LiItself,
  StyledLink
} from './styled'

const NavigationComponent: FC<NavigationProps> = ({ isopen, setShowMenu, isFooter }) => {
  const { data, isLoading } = useGetProductQuery('');
  if (isLoading) return ''

  const uni = uniqueTitles(data)
  return (
    <Navigation $isopen={isopen} $isFooter={isFooter}>
      <UlItself $isFooter={isFooter}> 
        {uni?.map(({ title, slug }) => (
          <LiItself key={title} onClick={() => isopen && setShowMenu(false)}>
            <StyledLink href={`/product/${slug}`} $isFooter={isFooter}>
              {title}
            </StyledLink>
          </LiItself>
        ))} 
      </UlItself>
    </Navigation>
  )
}

export default NavigationComponent