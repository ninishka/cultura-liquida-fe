import React, { useState, useContext } from 'react'
import Counter from '../Counter/Counter'
import CartContext from '@/app/contexts/cartContext/cartContext'
import img6 from '@/app/icons/delete_good_from_cart.png'
import {
    CartItem,
    CartItemWrap,
    CartImg,
    CardInfoWrapper,
    Title,
    Description,
    DeleteButtonWrap,
    DeleteButtonItself,
    DeleteButtonIcon,
    Price,
    InfoContainer,
    InfoContainer2
  } from './styled'
  
const CartItemComponent = ({ iconSrc, title, ingredient, type, amount: tAmount, id }) => {
  const { setToCart, removeFromCart, cartItems } = useContext(CartContext)
  const [amount, setAmount] = useState(tAmount)

  // const onChangeInput = e => {
  //   let value = 0
  //   if (e?.target?.value) value = +e.target.value
    
  //   setToCart(item, value)
  //   setAmount(value)
  // }
  // k
  const handleDelete = itemId => {
    const item = cartItems.filter(item => item?.id === itemId)
    removeFromCart(...item, 0, true)

    // not working anymore
    // length shows 1 after emptying cart
    // if (!cartItems?.length) setShowCart(false); // Close the modal if there are no items left
  }

  return (
    <CartItemWrap key={type}>
    <CartItem>
      <CartImg sizes='100vh' src={iconSrc} alt='cartitemcomponent'/>
      <CardInfoWrapper>
        <InfoContainer2>
          <Title>{title.toUpperCase()}</Title>
          <Description>{ingredient}</Description>
        </InfoContainer2>
      </CardInfoWrapper>
        <InfoContainer>
          <p style={{color: 'red', textAlign: 'center', margin: '0 2vw' }}>{type}</p>
          <Price>90 000 COP</Price>
        </InfoContainer>
      <Counter amount={amount} isModal />
    </CartItem>
    <DeleteButtonWrap>
      <DeleteButtonItself onClick={() => handleDelete(id)}>
        <DeleteButtonIcon sizes='100vh' src={img6} alt='cartitemcomponent'/>
      </DeleteButtonItself>
    </DeleteButtonWrap>
  </CartItemWrap>
  )
}

export default CartItemComponent

  //   <div style={{display: 'flex', alignItems: 'center'}}>
  //   <CartImg src={iconSrc}/>
  //   <CardInfoWrapper>
  //     <Title>{title.toUpperCase()}</Title>
  //     <Description>{description}</Description>
  //   </CardInfoWrapper>
  // </div>
  
  // <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
  //   <div>
  //     <p style={{color: 'red', textAlign: 'center' }}>{type}</p>
  //     <Price>90 000 COP</Price>
  //   </div>
  //   <Counter amount={amount} isModal />
  // </div>