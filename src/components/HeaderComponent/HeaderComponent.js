import React, { useState } from 'react';


import {
  LogoFull,
  LogoItself,
  HeaderFull,
  UlItself,
  StyledButton,
  LiItself,
  Cart,
  CartWrap,
} from './styled'

import Logo from '../../assets/icons/logo_full 1.svg'
import CartIcon from '../../assets/icons/icon_cart.svg'
import data from './../data'

const HeaderComponent = ({ setDisplayingItem, setShowModal }) => {
  const handleIconClick = () => {
    setShowModal(true);
  };

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
    <CartWrap onClick={handleIconClick}>
      <Cart src={CartIcon} alt="cart logo" />
    </CartWrap>
  </HeaderFull>
)}

export default HeaderComponent;
