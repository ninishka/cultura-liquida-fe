import React, { useState, useContext, useId } from 'react'
import ArrowNext from '../ArrowNext/ArrowNext'
import CartContext from '@/app/contexts/cartContext/cartContext'
import ArrowPrev from '../ArrowPrev/ArrowPrev'
import {
  CounterWrapper,
  AmountItem,
  Number,
  ArrowButtons,
  BuyButton,
  Price,
} from'./styled'

const Counter = ({ amount, isModal, filterdContent, isHowTo, preObj }) => {
  console.log('preObj', preObj)
  // const idCart = useId()
  const { cartItems, addToCart } = useContext(CartContext)
  const [ count, setCount ] = useState(amount || 1)

  // id probleb

  // const isFirst = !!filterdContent?.[0] ? {...filterdContent?.[0]} : {...filterdContent}
  // const preObj = {...filterdContent?.[0], idCart}
  // console.log('preObj', preObj)

  return (                             
  <CounterWrapper>
      <AmountItem $bgc={isModal}>
        <ArrowButtons onClick={() => {
            if(count > 1)  setCount(count - 1)
          }}
        >
          <ArrowPrev color={isModal && 'black'} />
        </ArrowButtons>
        <Number>{count}</Number>
        <ArrowButtons  onClick={() => setCount(count + 1)}>
          <ArrowNext color={isModal && 'black'} />
        </ArrowButtons>
      </AmountItem>  
      {/* condition rendering react */}
      {!isModal && 
        <BuyButton onClick={() => addToCart(preObj, count)} isHowTo={isHowTo}>
          Comprar
        </BuyButton>
      }
      {filterdContent?.[0]?.price && <Price style={{color:'white'}}>{filterdContent?.[0]?.price} COP</Price>}
  </CounterWrapper>
)}

export default Counter