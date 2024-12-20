import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Form } from 'antd'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import { toggleShowCart } from '@/lib/redux/slices/cartSlice'
import CartItemComponent from './CartItemComponent'
import img55 from '@/app/icons/modalbackgroung.png'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import ModalForm from './ModalForm'
import { calculateTotalSum } from '@/app/components/helpers'
import {
  ModalStyled,
  ListItemsWrapper,
  ModalTitle,
  TotalBox,
  CartPayButton
} from './styled'

  const mockedFormValues = {
      name: "One",
      surname: "One",
      document_type: "id",
      id_number: "1234",
      mail_address: "123",
      state: "ANT",
      city: "Abejorral",
      country: "Colombia",
      phone_number: "3107883758",
      email: "first@gmail.com",
      notes: 'notesnotesnotesnotes'
  }

const ModalComponent = ({data}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const { showCart, cartItems } = useAppSelector(state => state.cart);
  const [paymentOption, setPaymentOption] = useState('')

  const [preferenceId, setPreferenceId] = useState('') //mp
  const [loading, setLoading] = useState(false) // mp

  useEffect(() => {
    console.log('initMercadoPago')
    initMercadoPago(process.env.PUBLIC_KEY_BTN) // Public key
  }, [])


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

  const validPostsToUpdate = productsToUpdate.filter(item => item !== null);
  const updatedProductsData = validPostsToUpdate.map(({ id, amount, availableStock, reservedStock, ...restOfItem }) => {
    const updatedData = {
      availableStock: availableStock - amount,
      reservedStock: reservedStock + amount,
      ...restOfItem,
    };

    return { id, updatedData };
  });

  const isEmpty = !cartItems?.length

  const onFinish = async (values) => {
    console.log('values', values)
    setLoading(true);

    try {
      // UPDATE EXISTING PRODUCT BD
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates: updatedProductsData }),
      });
  
      if (!response.ok) {
        console.error('Error updating products');
      }


      // CREATE NEW ORDER BD
      const totalPrice = calculateTotalSum(cartItems);
      const filteredArray = cartItems.map(obj => ({
        title: obj.title,
        ingredient: obj.ingredient,
        type: obj.type,
        displayingType: obj.displayingType,
        amount: obj.amount,
        price: obj.price,
        idCart: obj.idCart,
        id: obj.idCart, //mb remove?
        size: obj.size,
      }));
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'mockedUserId',
          totalPrice,
          products: filteredArray,
          // products: cartItems.map(({ idCart, amount }) => ({ productId: idCart, quantity: amount })),
          form_data: mockedFormValues,
        }),
      });

      if (!orderResponse.ok) {
        console.error('Error creating order');
        return;
      }

      console.log('Order created successfully');


      if (paymentOption === 'mercado') {
        // Mercado Pago
        const paymentResponse = await fetch('/api/preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartItems: filteredArray,
            formValues: {
              ...mockedFormValues,
              street_name: `${mockedFormValues.state}, ${mockedFormValues.city}, ${mockedFormValues.mail_address}`,
            },
          }),
        });

        if (!paymentResponse.ok) {
          console.error('Error creating MercadoPago preference');
          return;
        }

        const { preferenceId } = await paymentResponse.json();
        setPreferenceId(preferenceId);
      }
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#F2C94CCC' }}>
      <ModalStyled 
        $isEmpty={isEmpty}
        width={1000}  
        open={showCart} 
        onCancel={() => dispatch(toggleShowCart(false))}
        footer={null}
        closable={isEmpty}
        style={{ marginTop: isEmpty ? '160px' : '' }}
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
                alt='Imagen de fondo del carrito' 
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
                {cartItems.map(props => <CartItemComponent key={props?.idCart || ''} {...props} /> )}
              </ListItemsWrapper>
              
            </>
            <>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm 
                form={form} 
                onFinish={onFinish} 
                loading={loading} 
                initialValues={{ country: 'colombia' }} 
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
              />
            </>
              {/* Public key */}
              {preferenceId && (
                <Wallet
                  key={process.env.PUBLIC_KEY_BTN}
                  initialization={{ preferenceId }}
                  customization={{ texts:{ valueProp: 'smart_option'}}} 
                />
              )}
          </>
        )}
      </ModalStyled>
    </main>
)}

export default ModalComponent