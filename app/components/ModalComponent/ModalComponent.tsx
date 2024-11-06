import React from 'react'
import Image from 'next/image'
import { RootState } from '@/lib/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowCart } from '@/lib/store/slices/cartSlice'

import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import { Form } from 'antd'
import img55 from '@/app/icons/modalbackgroung.png'
import {
  ModalStyled,
  ListItemsWrapper,
  ModalTitle,

  TotalBox,
  Comprar
} from './styled'

const ModalComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const { layoutData } = useSelector((state: RootState) => state.product);
  const { showCart, cartItems } = useSelector((state: RootState) => state.cart);

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


  const isEmpty = !cartItems?.length

  return (
    <main style={{ backgroundColor: '#F2C94CCC' }}>
      <ModalStyled 
        $isEmpty={isEmpty}
        width={1000}  
        open={showCart} 
        onCancel={() => dispatch(toggleShowCart(false))}
        footer={null}
        closable={isEmpty}
        style={{ 
          // backgroundImage: `url(${img55.src})`, 
          // backgroundSize: 'cover', 
          marginTop: isEmpty ? '160px' : '' 
        }}
      >
        {isEmpty ? (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
              <Image src={img55} fill={true} alt='the modal background image' style={{
                objectFit: "cover",
                zIndex: -5
              }} />
              <TotalBox>
                <ModalTitle style={{color: 'white'}}>{'¡tu canasta esta vacía!'.toUpperCase()}</ModalTitle>
                <div style={{marginBottom: 0, padding: 10}}>
                  <Comprar onClick={() => dispatch(toggleShowCart(false))} style={{color: 'white'}}>
                    {'volver a comprar'.toUpperCase()}
                  </Comprar>
                </div>
              </TotalBox>
            </div>
          </>
        ) : (
          <>
              <Image src={img55} fill={true} alt='the modal background image' style={{
                objectFit: "cover",
                zIndex: -5,
                // marginLeft: 95
              }} />
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