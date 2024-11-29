import React, { FC } from 'react'
import Counter from '@/app/components/Counter/Counter'
import img6 from '@/app/icons/delete_good_from_cart.png'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import type { CartItemType } from '@/types/types'
import { handleDelete } from '@/app/components/helpers'
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

const CartItemComponent: FC<CartItemType> = item => {
  const { iconSrc, title, ingredient, type, amount: tAmount, id, price, size } = item
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.cartItems)

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
          textAlign: 'center',
          margin: '0 2vw 2px',
          fontSize:'16px'
          }}
        >
          {type === 'capsules' ? 'Capsules': type + size}
        </p>
        <Counter amount={tAmount} item={item} isModal />
        </InfoContainer>
      <Price style={{margin: '0px 20px'}}>{price * tAmount} COP</Price>
    </CartItem>
    <DeleteButtonWrap>
      <DeleteButtonItself onClick={() => handleDelete(id, cartItems, dispatch)}>
        <DeleteButtonIcon sizes='100vh' src={img6} alt='cartitemcomponent'/>
      </DeleteButtonItself>
    </DeleteButtonWrap>
  </CartItemWrap>
  )
}

export default CartItemComponent
