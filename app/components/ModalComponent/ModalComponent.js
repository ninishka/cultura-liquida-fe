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
  const [form] = Form.useForm();
  const { cartItems, showCart, setShowCart, data, fetchProducts, isLoading } = useContext(CartContext)
  console.log('datadatadata', data)

const postsToUpdate = cartItems.map(cartItem => {
  const { size, ingredient, amount } = cartItem;

  const matchingItem = data.find(dataItem => 
      dataItem.size === size && 
      dataItem.ingredient === ingredient
  );

  if (matchingItem) {
      const { _id, ...restOfValues } = matchingItem; 
      return {
          id: _id,         // id from data
          amount: amount,  // amount from cartItems
          ...restOfValues,
      };
  }

  return null
});

// Удаляем элементы с null
const validPostsToUpdate = postsToUpdate.filter(item => item !== null);

  const updatedPostsData = validPostsToUpdate.map(({ id, stock, amount, ...restOfItem }) => {
    const updatedData = {
        stock: stock - amount,
        ...restOfItem,
    };

    return { id, updatedData };
});

  const handleSubmit = async (values) => {
    const updatePromises = updatedPostsData.map(async ({ id, updatedData }) => {
        const response = await fetch('/api/products', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, updatedData }),
        });

        if (!response.ok) {
            console.error('Error updating post with id:', id);
        }
    });

    await Promise.all(updatePromises);
    fetchProducts(); 
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