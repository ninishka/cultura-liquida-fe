import React, { Fragment } from 'react'

import { RootState } from '@/app/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowCart } from '@/app/store/slices/toggleSlice'

import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import { Form } from 'antd'
import img55 from '@/app/icons/modalbackgroung.png'
import {
  ModalStyled,
  ListItemsWrapper,
  ModalTitle,
  BuyButton,
} from './styled'

const ModalComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const { layoutData } = useSelector((state: RootState) => state.product);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { showCart } = useSelector((state: RootState) => state.toggling);

  // TODO: separate from here maybe?
  const productsToUpdate = cartItems.map(({ size, ingredient, amount }) => {
    const matchingItem = layoutData?.length && layoutData.find(dataItem => 
      dataItem?.size === size && 
      dataItem?.ingredient === ingredient
    );

    if (matchingItem) {
      const { _id, ...restOfValues } = matchingItem; 
      return {
          id: _id,          // id from data
          amount,  // amount from cartItems
          ...restOfValues,
      };
    }

    return null
  });

// Удаляем элементы с null
  const validPostsToUpdate = productsToUpdate.filter(item => item !== null);

  const updatedProductsData = validPostsToUpdate.map(({ id, stock, amount, ...restOfItem }) => {
    const updatedData = {
      stock: stock - amount,
      // stockSoftHold: stock - amount, // <- prepayment holding
      // stockHardHold: stock - amount, // <- postpayment holding
      ...restOfItem,
    };

    return { id, updatedData };
  });

  const handleSubmit = async (values) => {
    const updatePromises = updatedProductsData.map(async ({ id, updatedData }) => {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updatedData }),
        // REV 7
        // next: { revalidate: 30 },
      });

      if (!response.ok) {
        console.error('Error updating products with id:', id);
      }
    });

    await Promise.all(updatePromises);
    // fetchProducts(); 
  };

  const handleCancel = () => {
    dispatch(toggleShowCart(false)); 
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