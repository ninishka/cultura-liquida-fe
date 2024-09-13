import React, {useContext } from 'react'
import CartContext from '../../contexts/cartContext/cartContext'

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

import Logo from '../../assets/icons/logo_full 1.svg'
import CartIcon from '../../assets/icons/icon_cart.svg'
import data from './../data'

const HeaderComponent = ({ setDisplayingItem, setShowModal }) => {
  const { cartItems } = useContext(CartContext)

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
      <CounterCartWrap>
        <p style={{color: 'black', margin: '0 7px' }}>{cartItems?.length && cartItems.length}</p>
      </CounterCartWrap>
      <Cart src={CartIcon} alt="cart logo" />
    </CartWrap>
  </HeaderFull>
)}

export default HeaderComponent;
