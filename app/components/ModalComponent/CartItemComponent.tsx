import React, { FC } from 'react'
import Counter from '@/app/components/Counter/Counter'
import img6 from '@/app/icons/delete_good_from_cart.svg'
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
    InfoContainer2,
    ItemProductTypeText
  } from './styled'

const CartItemComponent: FC<CartItemType> = item => {
  const { iconSrc, title, ingredient, type, amount: tAmount, id, price, size } = item
  
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.cartItems)
  const modalProductTitle = title.includes('EXTRACTO') ? title.split(',')[0] : title 

  return (
    <CartItemWrap key={type}>
      <CartItem>
        <CartImg sizes='100vh' src={iconSrc} alt='cartitemcomponent'/>
        <CardInfoWrapper>
          <InfoContainer2>
            <Title style={{textTransform: 'uppercase'}}>{modalProductTitle}</Title>
            <Description>{ingredient}</Description>
          </InfoContainer2>
          <ItemProductTypeText>
            {type === 'capsules' ? 'Cápsulas': 'Extracto ' + size}
          </ItemProductTypeText>
        </CardInfoWrapper>
        <InfoContainer>
          <Counter amount={tAmount} item={item} isModal />
          <Price 
          style={{margin: '0px 20px'}}
          >{price * tAmount} COP</Price>
        </InfoContainer>
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
