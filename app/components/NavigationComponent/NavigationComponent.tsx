import React, { FC, useEffect, useState } from 'react'
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from '@/lib/redux/store/hooks'
import { toggleShowMenu } from '@/lib/redux/slices/cartSlice'
import { useGetProductQuery } from "@/lib/redux/slices/api";

import type { NavigationProps } from '@/types/types'
import { uniqueTitles } from '@/app/components/helpers'
import CloseBurgerIcon from '@/app/icons/icon_close_burger.svg'

import {
  Navigation,
  UlItself,
  LiWrap,
  StyledLink,
  CloseIconNav
} from './styled'

const pathPrefix = '/product/'

const NavigationComponent: FC<NavigationProps> = ({ isfooter, isSticky }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  
  const { data, isLoading } = useGetProductQuery('');
  const [menuStyle, setMenuStyle] = useState<Record<string, string>>({});
  const { showMenu } = useAppSelector(state => state.cart);
  
  useEffect(() => {
    if (showMenu && isSticky) setMenuStyle({ position: 'fixed', top: '0', right: '0' });
    else if (showMenu && !isSticky) setMenuStyle({});
  }, [showMenu, isSticky]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showMenu) dispatch(toggleShowMenu(false));
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMenu, dispatch]);

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
      {(showMenu && isSticky) && (
        <CloseIconNav 
          sizes='20vh' 
          src={CloseBurgerIcon} 
          onClick={() => dispatch(toggleShowMenu(false))} 
          alt="Сerrar menú"
        />
      )}
      <UlItself {...(isfooter && { isfooter })} {...(showMenu && { showMenu })}> 
        {uni?.map(({ title, slug }) => (
          <LiWrap key={title}>
            <StyledLink
              href={`${pathPrefix}${slug}`}
              isselected={slug.includes(product[0]) ? 'selected' : ''}
              {...(isfooter && { isfooter })}
            >
              {title}
            </StyledLink>
          </LiWrap>
        ))} 
      </UlItself>
    </Navigation>
  )
}

export default NavigationComponent