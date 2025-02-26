"use client"

import React, { FC, useState } from 'react'
import { toggleShowCart } from '@/lib/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import type { NavigationProps } from '@/types/types'

import NavigationComponent from '@/app/components/NavigationComponent'
import Logo from '@/app/icons/logo_full 1.svg'
import CartIcon from '@/app/icons/icon_cart.svg'
import BurgerIcon from '@/app/icons/icon_burger.svg'
import CloseBurgerIcon from '@/app/icons/icon_close_burger.svg'
import { useGetProductQuery } from "@/lib/redux/slices/api";

import {
  LogoFull,
  LogoItself,
  HeaderFull,
  Cart,
  CartWrap,
  CounterCartWrap,
  Counter,
  BurgerWrap,
  BurgerImage,
} from './styled'


const HeaderComponent: FC<NavigationProps> = () => {
  const dispatch = useAppDispatch()
  const { cartItems } = useAppSelector(state => state.cart);
  const { data } = useGetProductQuery('');
  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [ showMenu, setShowMenu ] = useState(false)

  return (
  <HeaderFull>
    <LogoFull href={data?.[0]?.slug ? `/product/${data?.[0]?.slug}` : '/'}>
      <LogoItself src={Logo} alt="El logotipo de Cultura Líquida" priority />
    </LogoFull>

    <NavigationComponent isopen={showMenu} />

    <div style={{ display: 'flex'}}>
      <BurgerWrap onClick={() => setShowMenu(!showMenu)}>
        <BurgerImage sizes='50vh' src={showMenu ? CloseBurgerIcon : BurgerIcon} alt="El icono del menú" />
      </BurgerWrap>
      
      <CartWrap onClick={() => dispatch(toggleShowCart(true))}>
        <Cart src={CartIcon} alt="El icono del carrito" />
        <CounterCartWrap>
          <Counter>
            {totalAmount}
          </Counter>
        </CounterCartWrap>
      </CartWrap>
    </div>
  </HeaderFull>
)}



export default HeaderComponent;