import React, { FC, useEffect, useState } from 'react'
import { usePathname } from "next/navigation";
import { useAppSelector } from '@/lib/redux/store/hooks'

import type { NavigationProps } from '@/types/types'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import { uniqueTitles } from '@/app/components/helpers'
import {
  Navigation,
  UlItself,
  StyledLink
} from './styled'

const pathPrefix = '/product/'

const NavigationComponent: FC<NavigationProps> = ({ isfooter, isSticky }) => {
  const pathname = usePathname();
  const { data, isLoading } = useGetProductQuery('');
  const [menuStyle, setMenuStyle] = useState<Record<string, string>>({});
  const { showMenu } = useAppSelector(state => state.cart);
  
  
  useEffect(() => {
    if (showMenu && isSticky) setMenuStyle({ position: 'fixed', top: '0', right: '0' });
    else if (showMenu && !isSticky) setMenuStyle({});
  }, [showMenu, isSticky]);

  if (isLoading) return ''

  const uni = uniqueTitles(data)
  const productSlug = pathname.replace(pathPrefix, '')
  const product = productSlug.split('-')

  return (
    <Navigation
      {...(isfooter && { isfooter })}
      {...(showMenu && { showMenu })}
      style={menuStyle}
    >
      <UlItself {...(isfooter && { isfooter })} {...(showMenu && { showMenu })}> 
        {uni?.map(({ title, slug }) => (
          <StyledLink
            key={title}
            href={`${pathPrefix}${slug}`}
            isselected={slug.includes(product[0]) ? 'selected' : ''}
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