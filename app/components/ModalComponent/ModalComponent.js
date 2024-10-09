"use client"

import React, { useContext, Fragment } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import { Form } from 'antd'

import img55 from '@/app/icons/modalbackgroung.png'


import {
  ModalStyled,
  ContentWrapper,
  ListItemsWrapper,
  ModalTitle,
  BuyButton,
  CloseButton
} from './styled'

const ModalComponent = () => {
  const { cartItems, showCart, setShowCart } = useContext(CartContext)
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);
    setShowCart(false);
  };
  const handleCancel = () => {
    setShowCart(false);
  };

  const isEmpty = !cartItems?.length

  return (
    <main style={{backgroundColor: '#F2C94CCC'}}>
      <ModalStyled 
        width={1000}  
        open={showCart} 
        onCancel={handleCancel}
        footer={null}
        closable={isEmpty}
        style={{ backgroundImage: `url(${img55.src})`, backgroundSize: 'cover' }}
      >
        {isEmpty ? (
          <Fragment style={{ alignItems: 'center' }}>
            <ModalTitle>{'¡tu canasta esta vacía!'.toUpperCase()}</ModalTitle>
            <div>
              <BuyButton onClick={handleCancel}>
                {'volver a comprar'.toUpperCase()}
              </BuyButton>
            </div>
          </Fragment>
        ) : (
          <>
            <>
              <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              <ListItemsWrapper>
                {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              </ListItemsWrapper>
              
            </>
            <>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm form={form} onFinish={handleSubmit} />
            </>
          </>
        )}
      </ModalStyled>
    </main>
)}

export default ModalComponent