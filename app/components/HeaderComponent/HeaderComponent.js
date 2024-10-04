"use client"

import React, { useContext, useEffect, useState } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import NavigationComponent from '../NavigationComponent/NavigationComponent'
import Logo from '@/app/icons/logo_full 1.svg'
import CartIcon from '@/app/icons/icon_cart.svg'
import BurgerIcon from '@/app/icons/icon_burger.svg'
import CloseBurgerIcon from '@/app/icons/icon_close_burger.svg'
import getFn from '@/app/api/get';



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

const HeaderComponent = ({initialData}) => {
  const { cartItems, setShowCart, setDisplayingItem, showMenu, setShowMenu } = useContext(CartContext)

  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!initialData) {
      setIsLoading(true);
      getFn({ url: 'getAllItems' })
        .then(response => {
          setData(response);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [initialData]);
  
  return (
  <HeaderFull>
    <LogoFull>
      <LogoItself src={Logo} alt="Company Logo" />
    </LogoFull>
    
    <NavigationComponent isopen={showMenu? "Show":""} />
    <BurgerWrap onClick={() => {setShowMenu(!showMenu)}}>
      <BurgerImage sizes='50vh' src={showMenu ? CloseBurgerIcon : BurgerIcon} alt="burger-icon"/>
    </BurgerWrap>

    <CartWrap onClick={() => {setShowCart(true)}}>
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
