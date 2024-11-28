import React, { FC } from 'react'
import Counter from '../Counter/Counter'
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
 
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import { removeFromCart } from '@/lib/redux/slices/cartSlice'
import type { CartItemType } from '@/types/types'

const CartItemComponent: FC<CartItemType> = item => {
  const { iconSrc, title, ingredient, type, amount: tAmount, id, price, size } = item
  
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.cartItems)

  const handleDelete = itemId => {
    const item = cartItems.filter(item => item?.id === itemId)
    dispatch(removeFromCart(...item, 0, true))
  }

  return (
    <CartItemWrap key={type}>
    <CartItem>
      <CartImg sizes='100vh' src={iconSrc} alt='cartitemcomponent'/>
      <CardInfoWrapper>
        <InfoContainer2>
          <Title>{title?.toUpperCase()}</Title>
          <Description>{ingredient}</Description>
        </InfoContainer2>
      </CardInfoWrapper>
      <InfoContainer>
        <p style={{
          color: 'red', 
          textAlign: 'center', margin: '0 2vw 2px', fontSize:'16px' }}>
          {type === 'capsules' ? 'Capsules': type + size}
        </p>
        <Price>{price * tAmount} COP</Price>
      </InfoContainer>
      <Counter amount={tAmount} item={item} isModal />
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
