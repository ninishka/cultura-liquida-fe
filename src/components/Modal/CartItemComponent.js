import React, { useState, useContext } from 'react'
// import PropTypes from 'prop-types'
import { DataContext } from '../../App.js'
// import { Image, Button, Input } from 'antd'
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
  
const CartItemComponent = ({ item, 
  setShowModal,
  src, iconSrc, title, description, text
 }) => {
  const { setToCart, removeFromCart } = useContext(CartContext)
  const [amount, setAmount] = useState(item.amount)

  // const onChangeInput = e => {
  //   let value = 0
  //   if (e?.target?.value) value = +e.target.value
    
  //   setToCart(item, value)
  //   setAmount(value)
  // }
  // const onRemoveBtn = () => removeFromCart(item, 0, true)


  // k

  const { count, setCount, choosedGood, setChoosedGood } = useContext(DataContext); // Assuming you have a way to update choosedGood

  const handleDelete = (itemText) => {
    setChoosedGood((prevChoosedGood) => {
      const updatedItems = prevChoosedGood.filter((item) => item.text !== itemText); // Replace `item.text` with a unique identifier if needed
      
      if (updatedItems.length === 0) {
        setShowModal(false); // Close the modal if there are no items left
      }
      
      return updatedItems;
    });
  };

  return (

    <CartItemWrap key={text}>
    <CartItem>
      <CartImg src={iconSrc}/>
      <TextWrapper>
        <Title>{title.toUpperCase()}</Title>
        <Description>{description}</Description>
      </TextWrapper>
      <p style={{color: 'red'}}>{text}</p>
      <Counter count={amount} setCount={setCount} isModal />
    </CartItem>
    <DeleteButtonWrap>
      <DeleteButtonItself onClick={() => handleDelete(text)}>
        <DeleteButtonIcon src={img6} />
      </DeleteButtonItself>
    </DeleteButtonWrap>
  </CartItemWrap>

    // <div className="cart-item-wrap">
    //   <div className='cart-item-image'>
    //     <Image src={item.image} alt={item.title} />
    //   </div>
    //   <div className='cart-item-info'>
    //     <div>
    //       {item.title}
    //     </div>
    //     <div>
    //       {item.size}
    //     </div>
    //     <div>
    //       {item.price} COP
    //     </div>
    //   </div>
    //   <div className='cart-item-actions'>
    //     <Input type="number" value={amount} onChange={onChangeInput} />
    //     <Button variant="secondary" onClick={onRemoveBtn}>Remove all</Button>
    //     Total: {amount * item.price}
    //   </div>
    // </div>
  )
}

// CartItemComponent.propTypes = {
  // item: PropTypes.object.isRequired
// }

export default CartItemComponent