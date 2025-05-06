"use client"

import React, { FC, useState, useEffect } from 'react'
import { toggleShowCart, toggleShowMenu } from '@/lib/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import type { NavigationProps } from '@/types/types'
import NavigationComponent from '@/app/components/NavigationComponent'

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
  Counter,
  BurgerWrap,
  BurgerImage,
  StickyWrapper,
} from './styled'

const HeaderComponent: FC<NavigationProps> = () => {
  const dispatch = useAppDispatch()
  const { cartItems, showMenu } = useAppSelector(state => state.cart);
  const { data } = useGetProductQuery('');
  const [isSticky, setIsSticky] = useState(false);
  const [highlightKey, setHighlightKey] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (totalAmount > 0) {
      setHighlightKey(prev => prev + 1);
    }
  }, [totalAmount]);

  return (
    <HeaderFull>
      <LogoFull href={data?.[0]?.slug ? `/product/${data?.[0]?.slug}` : '/'}>
        <LogoItself src={Logo} alt="El logotipo de Cultura Líquida" priority />
      </LogoFull>
      
      <NavigationComponent isSticky={isSticky} />
      
      <StickyWrapper $isSticky={isSticky}>
        <BurgerWrap onClick={() => dispatch(toggleShowMenu(!showMenu))}>
          <BurgerImage 
            sizes='50vh' 
            src={showMenu ? CloseBurgerIcon : BurgerIcon} 
            alt={`El icono del menú - ${showMenu ? "cerrar" : "abrir"}`}
          />
        </BurgerWrap>
        
        <CartWrap key={highlightKey} $highlight={highlightKey > 0} onClick={() => dispatch(toggleShowCart(true))}>
          <Cart src={CartIcon} alt="El icono del carrito" />
          <CounterCartWrap>
            <Counter>
              {totalAmount}
            </Counter>
          </CounterCartWrap>
        </CartWrap>
      </StickyWrapper>
    </HeaderFull>
)}

export default HeaderComponent;