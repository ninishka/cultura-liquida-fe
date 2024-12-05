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
  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  
  return (
  <HeaderFull $isopen={showMenu ? true : false}>
    <LogoFull href='/product/melena-de-leon-capsules'>
      <LogoItself src={Logo} alt="El logotipo de Cultura Líquida" />
    </LogoFull>
    
    <NavigationComponent isopen={showMenu ? true : false} setShowMenu={setShowMenu} />
    <BurgerWrap onClick={() => setShowMenu(!showMenu)}>
      <BurgerImage sizes='50vh' src={showMenu ? CloseBurgerIcon : BurgerIcon} alt="El icono del menú" />
    </BurgerWrap>

    <CartWrap onClick={() => dispatch(toggleShowCart(true))}>
      <CounterCartWrap>
        <p style={{color: 'black', fontSize: 14, fontWeight: 500 }}>
          {totalAmount}
        </p>
      </CounterCartWrap>
      <Cart src={CartIcon} alt="El icono del carrito" />
    </CartWrap>
  </HeaderFull>
)}

export default HeaderComponent;