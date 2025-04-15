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

const NavigationComponent: FC<NavigationProps> = ({ isopen, isfooter, isSticky, burgerRef, setShowMenu }) => {
  const pathname = usePathname();
  const { data, isLoading } = useGetProductQuery('');
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    if (isopen && burgerRef?.current && isSticky) {
      // const burgerRect = burgerRef.current.getBoundingClientRect();
      setMenuStyle({
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        maxHeight: 'calc(100vh - 150px)',
        overflowY: 'auto',
        backgroundColor: '#333333',
      });
    } else if (isopen && !isSticky) setMenuStyle({});

    return () => isopen && setShowMenu(false);
  }, [isopen, burgerRef, isSticky]);

  if (isLoading) return ''

  const uni = uniqueTitles(data)
  const productSlug = pathname.replace(pathPrefix, '')
  const product = productSlug.split('-')

  return (
    <Navigation
      {...(isfooter && { isfooter })}
      {...(isopen && { isopen })}
      style={menuStyle}
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