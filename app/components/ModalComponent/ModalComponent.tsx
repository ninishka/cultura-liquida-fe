import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Form } from 'antd'
import { RootState } from '@/lib/redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowCart } from '@/lib/redux/slices/cartSlice'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
// import { useRouter } from 'next/navigation';

import CartItemComponent from './CartItemComponent'
import img55 from '@/app/icons/modalbackgroung.png'
import ModalForm from './ModalForm'
import {
  ModalStyled,
  ListItemsWrapper,
  ModalTitle,
  TotalBox,
  Comprar
} from './styled'

const ModalComponent = ({data}) => {
  const [form] = Form.useForm();
  // const router = useRouter();
  const dispatch = useDispatch()
  const { showCart, cartItems } = useSelector((state: RootState) => state.cart);

  // TODO: separate from here maybe?
  const productsToUpdate = cartItems.map(({ size, ingredient, amount }) => {
    const matchingItem = data?.length && data.find(dataItem => 
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

  // UPDATE DATABASE
  // const onFinish = async (values) => {
  //   const updatePromises = updatedProductsData.map(async ({ id, updatedData }) => {
  //     const response = await fetch('/api/products', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id, updatedData }),
  //       // REV 7
  //       // next: { revalidate: 30 },
  //     });

  //     if (!response.ok) {
  //       console.error('Error updating products with id:', id);
  //     }
  //   });

  //   await Promise.all(updatePromises);
  // }
  // usePathname was on dif poject instead of router to define url of page

// ===========================================
// MERCADO PAGO LOGIC
const [formValues, setFormValues] = useState({})
const [preferenceId, setPreferenceId] = useState('')
const [loading, setLoading] = useState(false)

useEffect(() => {
  console.log('initMercadoPago')
  initMercadoPago(process.env.PUBLIC_KEY_BTN) // Public key
  // initMercadoPago(PUBLIC_KEY) // Public key
}, [])

  // PEYMENT SYSTEM
  const onFinish = async (values) => {
    await setFormValues({
      ...values,
      // street_name: `${values.state}, ${values.city}, ${values.street_name}, ${values.street_number}`
      street_name: `${values.state}, ${values.city}, ${values.mail_address}`
    })
    setLoading(true)
    try {
      const response = await fetch('/api/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, formValues }),
      });
  
      if (!response.ok) {
        console.error('Error creating preference');
        return;
      }
      const { preferenceId } = await response.json()
      if (preferenceId) {
        setPreferenceId(preferenceId)
      } else {
        console.error('id as preferenceId is missing in response');
      }
    } catch (e) {
      console.error('Error processing preference:', e);
    } finally {
      setLoading(false)
    }
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
              <Image 
                src={img55} 
                fill={true} 
                alt='the modal background image' 
                priority // hight loading priority
                style={{
                  objectFit: "cover",
                  zIndex: -5
                }} 
              />
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
              <Image 
                src={img55} 
                fill={true} 
                alt='the modal background image' 
                style={{
                  objectFit: "cover",
                  zIndex: -5,
                  // marginLeft: 95
                }} 
                priority // hight loading priority
              />
            <>
              <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              <ListItemsWrapper>
                {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              </ListItemsWrapper>
              
            </>
            <>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm form={form} onFinish={onFinish} loading={loading} />
            </>
              {/* Public key */}
              {preferenceId && <Wallet
                key={process.env.PUBLIC_KEY_BTN}
                initialization={{ preferenceId }}
                customization={{ texts:{ valueProp: 'smart_option'}}} 
              />}
          </>
        )}
      </ModalStyled>
    </main>
)}

export default ModalComponent