"use client"

import React, { useContext, useState } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import NavigationComponent from '../NavigationComponent/NavigationComponent'
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

const HeaderComponent = () => {
  const { cartItems, setShowCart, setDisplayingItem, showMenu, setShowMenu } = useContext(CartContext)

  return (
  <HeaderFull>
    <LogoFull>
      <LogoItself src={Logo} alt="Company Logo" />
    </LogoFull>
    
    <NavigationComponent isopen={showMenu? "Show":""} />
    <BurgerWrap onClick={() => {setShowMenu(!showMenu)}}>
      <BurgerImage sizes='50vh' src={showMenu ? CloseBurgerIcon : BurgerIcon} alt="burger-icon"/>
    </BurgerWrap>

    <CartWrap type="primary"  onClick={() => {setShowCart(true)}}>
      <CounterCartWrap>
        <p style={{color: 'black', margin: '0 7px' }}>
          {cartItems?.length}
        </p>
      </CounterCartWrap>
      <Cart src={CartIcon} alt="cart logo" />
    </CartWrap>
  </HeaderFull>
)}

export default HeaderComponent;
