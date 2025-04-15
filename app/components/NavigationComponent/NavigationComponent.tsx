import React, { FC, useEffect, useState } from 'react'
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

const NavigationComponent: FC<NavigationProps> = ({ isopen, isfooter, isSticky, setShowMenu }) => {
  const pathname = usePathname();
  const { data, isLoading } = useGetProductQuery('');
  const [menuProps, setMenuProps] = useState<Partial<NavigationProps>>({});
  
  useEffect(() => {
    if (isopen && isSticky) {
      setMenuProps({
        $position: 'fixed',
        $top: '0',
        $right: '0',
        $width: '100%',
        $maxHeight: 'calc(100vh - 150px)',
        $overflowY: 'auto',
        $backgroundColor: '#333333',
      });
    } else if (isopen && !isSticky) {
      setMenuProps({});
    }

    return () => isopen && setShowMenu(false);
  }, [isopen, isSticky]);

  if (isLoading) return ''

  const uni = uniqueTitles(data)
  const productSlug = pathname.replace(pathPrefix, '')
  const product = productSlug.split('-')

  return (
    <Navigation
      {...(isfooter && { isfooter })}
      {...(isopen && { isopen })}
      {...menuProps}
    >
      <UlItself {...(isfooter && { isfooter })} {...(isopen && { isopen })}> 
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