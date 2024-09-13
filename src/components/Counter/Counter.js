import React, { useState, useContext } from 'react'
import ArrowNext from '../ArrowNext/ArrowNext'
import CartContext from '../../contexts/cartContext/cartContext'
import ArrowPrev from '../ArrowPrev/ArrowPrev'
import {
  BuyWrap,
  AmountItem,
  Number,
  ArrowButtons,
  BuyButton,
  Price,
} from'./styled'

const Counter = ({ amount, isModal, temporalChoise }) => {
  const { cartItems, addToCart } = useContext(CartContext)
  const [ count, setCount ] = useState(amount || 1)

  return (                             
  <BuyWrap>
      <AmountItem $bgc={isModal}>
        <ArrowButtons onClick={() => {
            if(count > 1)  setCount(count - 1)
          }}
        >
          <ArrowPrev color={isModal && 'black'} />
        </ArrowButtons>
        {/* invisible button is still working around img, maybe fix later */}
        <Number>{count}</Number>
        <ArrowButtons  onClick={() => setCount(count + 1)}>
          <ArrowNext color={isModal && 'black'} />
        </ArrowButtons>
      </AmountItem>  
      {!isModal && 
      // <BuyButton onClick={() => {
        // setChoosedGood(temporalChoise)
        // setChoosedGood(prevTemporalChoise => {
        //   // const hasDuplicate = prevTemporalChoise.some(({text}) => text === temporalChoise[0].text)

        //   const hasDuplicate = prevTemporalChoise.some(({text, title}) => {
        //     const isHaveProductDuplicate = title === temporalChoise[0].title
        //     const isHaveTypeDuplicate = text === temporalChoise[0].text
            
        //     return isHaveTypeDuplicate && isHaveProductDuplicate
        //   })
        
        //   if (!hasDuplicate) {
        //     return [...prevTemporalChoise, ...temporalChoise]
        //   } else {
        //     return prevTemporalChoise
        //   }
        // })
      // }}>
        <BuyButton onClick={() => addToCart(temporalChoise[0], count)}>
          Comprar
        </BuyButton>
      }
    <Price>90 000 COP</Price>
  </BuyWrap>
)}

export default Counter