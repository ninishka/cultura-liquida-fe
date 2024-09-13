import React, { useState, useContext } from 'react'
import Counter from '../Counter/Counter'
import CartContext from '../../contexts/cartContext/cartContext'
import img6 from '../../assets/icons/delete_good_from_cart.png'
import {
    CartItem,
    CartItemWrap,
    CartImg,
    TextWrapper,
    Title,
    Description,
    DeleteButtonWrap,
    DeleteButtonItself,
    DeleteButtonIcon,
  } from './styled'
  
const CartItemComponent = ({ iconSrc, title, description, text, amount: tAmount, id }) => {
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
    // if (!cartItems?.length) setShowModal(false); // Close the modal if there are no items left
  }

  return (
    <CartItemWrap key={text}>
    <CartItem>
      <CartImg src={iconSrc}/>
      <TextWrapper>
        <Title>{title.toUpperCase()}</Title>
        <Description>{description}</Description>
      </TextWrapper>
      <p style={{color: 'red'}}>{text}</p>
      <Counter amount={amount} isModal />
    </CartItem>
    <DeleteButtonWrap>
      <DeleteButtonItself onClick={() => handleDelete(id)}>
        <DeleteButtonIcon src={img6} />
      </DeleteButtonItself>
    </DeleteButtonWrap>
  </CartItemWrap>

    //   <div className='cart-item-actions'>
    //     <Input type="number" value={amount} onChange={onChangeInput} />
    //     <Button variant="secondary" onClick={onRemoveBtn}>Remove all</Button>
    //     Total: {amount * item.price}
    //   </div>
  )
}

export default CartItemComponent