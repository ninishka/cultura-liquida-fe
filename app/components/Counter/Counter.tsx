import React, { useState } from 'react'
import ArrowNext from '@/app/components/ArrowNext/ArrowNext'
import ArrowPrev from '@/app/components/ArrowPrev/ArrowPrev'
import { addToCart } from '@/lib/redux/slices/cartSlice'
import { useAppDispatch } from '@/lib/redux/store/hooks'
import { decrease, increase } from '@/app/components/helpers'
import {
  CounterWrapper,
  AmountItem,
  Number,
  ArrowButtons,
  BuyButton,
  Price,
  PriceWithoutDiscount
} from'./styled'

const Counter = ({ 
  amount = undefined, isModal = false, filterdContent = [], 
  preObj = undefined, isComplex = false, item = undefined 
}) => {
  const dispatch = useAppDispatch()
  const [ count, setCount ] = useState(amount || 1)

  return (                             
    <CounterWrapper $isModal={isModal}>
      <AmountItem $isModal={isModal}>
        <ArrowButtons
          aria-label={`Disminuir la cantidad de elementos, recuento actual: ${count}`}
          onClick={() => decrease(count, setCount, isModal, dispatch, addToCart, item)}
        >
          <ArrowPrev aria-label="Disminuir artículos" color={isModal && 'black'} />
        </ArrowButtons>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '3rem' }}>
          <Number>{count}</Number>
        </div>

        <ArrowButtons 
          aria-label={`Obtenga más información sobre cómo aumentar la cantidad de artículos, recuento actual: ${count}`} 
          onClick={() => increase(count, setCount, isModal, dispatch, addToCart, item)}        
        >
          <ArrowNext aria-label="Aumentar artículos" color={isModal && 'black'} />
        </ArrowButtons>
      </AmountItem>

      {/* rendering options */}
      {!isModal && 
        <BuyButton 
          aria-label="botón añadir al carrito" 
          onClick={() => dispatch(addToCart({...preObj, amount: count}))}
        >
          Comprar
        </BuyButton>
      }
      {filterdContent?.[0]?.price && <Price $isModal={isModal} style={{color:'white'}}>{filterdContent?.[0]?.price} COP</Price>}
      {isComplex && (
        <PriceWithoutDiscount $isModal={false}>
          {filterdContent?.[0]?.originalPrice} COP
        </PriceWithoutDiscount>
      )}
    </CounterWrapper>
)}

export default Counter