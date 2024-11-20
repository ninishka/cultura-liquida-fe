"use client"

import React, { FC, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store/store'
import { toggleShowCart } from '@/lib/redux/slices/cartSlice'

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


interface HeaderComponentProps {
  isopen?: boolean;
}

const HeaderComponent: FC<HeaderComponentProps> = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [ showMenu, setShowMenu ] = useState(false)

  return (
  <HeaderFull $isopen={showMenu ? true : false}>
    <LogoFull href='/'>
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
