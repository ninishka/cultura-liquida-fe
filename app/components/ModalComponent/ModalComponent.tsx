import React, { useState, useEffect } from 'react'
import Image from 'next/image'
// import { useRouter } from 'next/navigation';
import { Button, Form } from 'antd'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import { toggleShowCart } from '@/lib/redux/slices/cartSlice'
import CartItemComponent from './CartItemComponent'
import img55 from '@/app/icons/modalbackgroung.png'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

import ModalForm from './ModalForm'
import {
  ModalStyled,
  ListItemsWrapper,
  ModalTitle,
  TotalBox,
  CartPayButton
} from './styled'

const ModalComponent = ({data}) => {
  // const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const { showCart, cartItems } = useAppSelector(state => state.cart);

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

// ===========================================
// MERCADO PAGO LOGIC
// const [formValues, setFormValues] = useState({})
const [preferenceId, setPreferenceId] = useState('')
const [loading, setLoading] = useState(false)

useEffect(() => {
  console.log('initMercadoPago')
  initMercadoPago(process.env.PUBLIC_KEY_BTN) // Public key
}, [])

  // PEYMENT SYSTEM
  const onFinish = async (values) => {
    // await setFormValues({
    //   ...values,
    //   street_name: `${values.state}, ${values.city}, ${values.mail_address}`
    // })
    setLoading(true)
    try {
      const response = await fetch('/api/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems, formValues: {
          ...values,
          street_name: `${values.state}, ${values.city}, ${values.mail_address}`
        } }),
      });
  
      if (!response.ok) {
        console.error('Error creating preference ONFINISH');
        return;
      }
      const { preferenceId } = await response.json()
      if (preferenceId) {
        console.log('preferenceId', preferenceId)
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



// PAY U
// const [payUurl, setPayUurl] = useState('')
// const onFinish = async (values) => {
//   setLoading(true);
//   const mockedFormValues = {
//       name: "One",
//       surname: "One",
//       document_type: "cc",
//       id_number: "123456789",
//       mail_address: "123",
//       state: "ANT",
//       city: "Abejorral",
//       phone_number: "3107883758",
//       email: "first@gmail.com",
//       remember: true,

//       // fields from FORM PAYU example
//       merchantId: process.env.PAYU_API_MERCHANT,
//       accountId: process.env.PAYU_ACCOUNT_ID,
//       referenceCode: 'TestPayU',
//       amount: 1,
//       signature: 'dc950c409aed0cfc440400650bef8ec2360fcc779638ed5a2b400f48a9471eaa',
//       taxReturnBase: 16806,
//       responseUrl: `${process.env.PATH_TO_API}/check-out/success`,
//       confirmationUrl: `${process.env.PATH_TO_API}/check-out/pending`,
//       shippingAddress: 'ANT',
//       shippingCity: 'Abejorral',
//       shippingCountry: 'CO',
//       currency: 'COP',
//       buyerEmail: "first@gmail.com"
//   }
//   try {
//     const response = await fetch('/api/payu', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 
//         // 'Accept': 'application/json', // anyway 
//       },
//       body: JSON.stringify({ cartItems, formValues: mockedFormValues }),
//     });

//     // const data = await response.json();
//     // console.log('data', data)
//     // if (data.paymentUrl) {
//     //   setPayUurl(data.paymentUrl)
//     //   // router.push(data.paymentUrl);
//     // } else {
//     //   console.error('Missing paymentUrl in PayU response');
//     // }

//     // madness below
//     // if (response.headers.get('content-type')?.includes('text/html')) {
//     //   const html = await response.text();
//     //   document.body.innerHTML = html; // Вставить HTML прямо в DOM
//     // }

//     // auto sendind data form
//     if (response.ok) {
//       const { redirectUrl, formData } = await response.json();
    
//       // Создаем и отправляем форму
//       const form = document.createElement('form');
//       form.method = 'POST';
//       form.action = redirectUrl;
    
//       // Добавляем данные в форму
//       Object.keys(formData).forEach(key => {
//         const input = document.createElement('input');
//         input.type = 'hidden';
//         input.name = key;
//         input.value = formData[key];
//         form.appendChild(input);
//       });
    
//       document.body.appendChild(form);
//       form.submit(); // Отправляем форму
//     } else {
//       console.error('Error processing PayU transaction:', await response.json());
//     }
//   } catch (error) {
//     console.error('Error processing PayU preference:', error);
//   } finally {
//     setLoading(false);
//   }
// };
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
                <ModalTitle style={{color: 'white'}}>¡tu canasta esta vacía!</ModalTitle>
                <div style={{marginBottom: 0, padding: 10}}>
                  <CartPayButton 
                    onClick={() => dispatch(toggleShowCart(false))} 
                    style={{color: 'white', textTransform: 'uppercase'}}
                  >
                    volver a comprar
                  </CartPayButton>
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
              {/* {payUurl && 
                <Button onClick={() => router.push(data.paymentUrl)} />
              } */}
          </>
        )}
      </ModalStyled>
    </main>
)}

export default ModalComponent