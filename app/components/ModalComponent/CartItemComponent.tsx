import React, { FC } from 'react'
import Counter from '@/app/components/Counter/Counter'
import img6 from '@/app/icons/delete_good_from_cart.svg'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import type { CartItemType } from '@/types/types'
import { handleDelete } from '@/app/components/helpers'
import { totalSumStyledByDot } from '@/app/components/helpers'
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

import melenaCapsulsSrc from '@/app/icons/icon_caps_melena_cart.png'
import melenaExtractSrc from'@/app/icons/icon_melena_cart.png'
import colaSrc from '@/app/icons/icon_cola_cart.png'
import reishiSrc from '@/app/icons/icon_reishi_cart.png'

const CartItemComponent: FC<CartItemType> = ( item ) => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.cartItems)
  
  const { title, ingredient, type, displayingType, amount: tAmount, id, price, size, idCart, isOrder } = item

  const isMelena = title === 'Melena de León'
  const isCapsulesMelena = isMelena && id?.includes('capsules') && melenaCapsulsSrc
  // const isCapsulesMelena = isMelena && idCart?.includes('capsules') && melenaCapsulsSrc
  const isExtractsMelena = isMelena && id?.includes('extracts') && melenaExtractSrc
  // const isExtractsMelena = isMelena && idCart?.includes('extracts') && melenaExtractSrc
  const isReishi = title === 'Reishi' && reishiSrc
  const isCola = title === 'Cola de Pavo' && colaSrc
  const isComplex = title?.includes('complejo') && colaSrc
  // TODO complex cart icon

  const cartIcon = isCapsulesMelena || isExtractsMelena || isReishi || isCola || isComplex

  const totalSum = price * tAmount
  const styledAmount = totalSumStyledByDot(totalSum, ' ')

  return (
    <CartItemWrap key={type}>
      <CartItem>
        <CartImg sizes='100vh' src={cartIcon} alt='El artículo del producto elegido'/>
        <CardInfoWrapper>
          <InfoContainer2>
            <Title style={{textTransform: 'uppercase'}}>{title}</Title>
            <Description>{ingredient}</Description>
          </InfoContainer2>
          <ItemProductTypeText>
            {displayingType}{size ? ` ${size}` : ''}
          </ItemProductTypeText>
        </CardInfoWrapper>
        <InfoContainer>
          {!isOrder ? (
              <Counter amount={tAmount} item={item} isModal />
            ) : (
              <b style={{color: 'black', margin: 20}}>x{tAmount}</b>)
          }
          <Price style={{margin: '0px 20px'}}>{styledAmount} COP</Price>
        </InfoContainer>
      </CartItem>
      {!isOrder && (
        <DeleteButtonWrap>
          <DeleteButtonItself onClick={() => handleDelete(id, cartItems, dispatch)}>
            <DeleteButtonIcon sizes='100vh' src={img6} alt='Eliminar el artículo del producto seleccionado'/>
          </DeleteButtonItself>
        </DeleteButtonWrap>
      )}
    </CartItemWrap>
  )
}

export default CartItemComponent
