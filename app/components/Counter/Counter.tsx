import React, { useState } from 'react'
import ArrowNext from '../ArrowNext/ArrowNext'
import ArrowPrev from '../ArrowPrev/ArrowPrev'
import {
  CounterWrapper,
  AmountItem,
  Number,
  ArrowButtons,
  BuyButton,
  Price,
} from'./styled'

import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/store/slices/cartSlice'


const Counter = ({ 
  amount = undefined, isModal = false, filterdContent = [], 
  preObj = undefined, isComplex = false, item = undefined 
}) => {
  const dispatch = useDispatch()
  const [ count, setCount ] = useState(amount || 1)

  return (                             
  <CounterWrapper>
    <AmountItem $bgc={isModal}>
      <ArrowButtons
      aria-label={`Disminuir la cantidad de elementos, recuento actual: ${count}`}
      onClick={() => {
          if(count > 1) setCount(count - 1)
        }}
      >
        <ArrowPrev aria-label="Disminuir artículos" color={isModal && 'black'} />
      </ArrowButtons>
      <Number>{count}</Number>
      <ArrowButtons 
        aria-label={`Obtenga más información sobre cómo aumentar la cantidad de artículos, recuento actual: ${count}`} 
        onClick={() => setCount(count + 1)}        
      >
        <ArrowNext aria-label="Aumentar artículos" color={isModal && 'black'} />
      </ArrowButtons>
    </AmountItem>  
    {/* condition rendering react */}
    {!isModal && 
      <BuyButton 
        aria-label="botón añadir al carrito" 
        onClick={() => dispatch(addToCart({...preObj, amount: count}))}
      >
        Comprar
      </BuyButton>
    }

    {/* here only amount + */}
    {isModal && 
      <BuyButton 
        aria-label="botón añadir al carrito" 
        style={{ width: '50px' }}
        onClick={() => dispatch(addToCart({...item, amount: count, isModal: true}))}
      >
        Edit
      </BuyButton>
    }
    {filterdContent?.[0]?.price && <Price style={{color:'white'}}>{filterdContent?.[0]?.price} COP</Price>}
    {isComplex && <Price style={{ textDecoration: 'line-through', fontSize: 24, color: '#9F9F9F'}}>{filterdContent?.[0]?.originalPrice} COP</Price>}
  </CounterWrapper>
)}

export default Counter