"use client"

import React, { useContext } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import Logo from '@/app/icons/logo_full 1.svg'
import CartIcon from '@/app/icons/icon_cart.svg'
import data from '../data'
import {
  LogoFull,
  LogoItself,
  HeaderFull,
  UlItself,
  StyledButton,
  LiItself,
  Cart,
  CartWrap,
  CounterCartWrap,
} from './styled'

const HeaderComponent = () => {
  const { cartItems, setShowModal, setDisplayingItem } = useContext(CartContext)


  return (
  <HeaderFull>
    <LogoFull>
      <LogoItself src={Logo} alt="Company Logo" />
    </LogoFull>
    <nav>
      <UlItself>
        {data.map(({ title }, index) => {
          const id = index + 1
          return (
            <LiItself key={title}>
              <StyledButton onClick={() => setDisplayingItem(id.toString())}>
                {title}
              </StyledButton>
            </LiItself>
          )
        })} 
      </UlItself>
    </nav>
    <CartWrap onClick={() => {setShowModal(true)}}>
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
