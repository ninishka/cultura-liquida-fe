"use client"

import React, { FC, useState } from 'react'
import { toggleShowCart } from '@/lib/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import type { NavigationProps } from '@/types/types'

import NavigationComponent from '@/app/components/NavigationComponent/NavigationComponent'
import Logo from '@/app/icons/logo_full 1.svg'
import CartIcon from '@/app/icons/icon_cart.svg'
import BurgerIcon from '@/app/icons/icon_burger.svg'
import CloseBurgerIcon from '@/app/icons/icon_close_burger.svg'

import {
  LogoFull,
  LogoItself,
  HeaderFull,
  Cart,
  CartWrap,
  CounterCartWrap,
  BurgerWrap,
  BurgerImage,
} from './styled'


const HeaderComponent: FC<NavigationProps> = () => {
  const dispatch = useAppDispatch()
  const { cartItems } = useAppSelector(state => state.cart);
  const [ showMenu, setShowMenu ] = useState(false)

  return (
  <HeaderFull $isopen={showMenu ? true : false}>
    <LogoFull href='/product/melena-de-leon-capsules'>
      <LogoItself src={Logo} alt="Company Logo" />
    </LogoFull>
    
    <NavigationComponent isopen={showMenu ? true : false} />
    <BurgerWrap onClick={() => setShowMenu(!showMenu)}>
      <BurgerImage sizes='50vh' src={showMenu ? CloseBurgerIcon : BurgerIcon} alt="Menu icon"/>
    </BurgerWrap>

    <CartWrap onClick={() => dispatch(toggleShowCart(true))}>
      <CounterCartWrap>
        <p style={{color: 'black', margin: '0 7px' }}>
          {cartItems?.length}
        </p>
      </CounterCartWrap>
      <Cart src={CartIcon} alt="Cart logo" />
    </CartWrap>
  </HeaderFull>
)}

export default HeaderComponent;
