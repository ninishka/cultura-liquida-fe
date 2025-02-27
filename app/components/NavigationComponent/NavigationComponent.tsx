import React, { FC } from 'react'
import { usePathname } from "next/navigation";

import type { NavigationProps } from '@/types/types'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import { uniqueTitles } from '@/app/components/helpers'
import {
  Navigation,
  UlItself,
  StyledLink
} from './styled'

const pathPrefix = '/product/'

const NavigationComponent: FC<NavigationProps> = ({ isopen, isfooter }) => {
  const pathname = usePathname();
  const { data, isLoading } = useGetProductQuery('');
  if (isLoading) return ''

  const uni = uniqueTitles(data)
  const productSlug = pathname.replace(pathPrefix, '')
  const product = productSlug.split('-')
  
  return (
    <Navigation {...(isfooter && { isfooter })} {...(isopen && { isopen })}>
      <UlItself {...(isfooter && { isfooter })} {...(isopen && { isopen })}> 
        {uni?.map(({ title, slug }) => (
          <StyledLink
            key={title}
            href={`${pathPrefix}${slug}`}
            isselected={slug.includes(product[0]).toString()}
            {...(isfooter && { isfooter })}
          >
            {title}
          </StyledLink>
        ))} 
      </UlItself>
    </Navigation>
  )
}

export default NavigationComponent