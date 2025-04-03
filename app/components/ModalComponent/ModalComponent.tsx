import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/redux/store/hooks'
import { toggleShowCart, toggleSetMercado } from '@/lib/redux/slices/cartSlice'
import img55 from '@/app/icons/modalbackgroung.png'
import { initMercadoPago } from '@mercadopago/sdk-react'
import { updateExistingProduct, createNewOrder, handlePayment } from '@/helpers/data';
import CartItemComponent from './CartItemComponent/CartItemComponent'
import ModalForm from './FormComponent/ModalForm'

import {
  ModalStyled,
  ListItemsWrapper,
  ModalTitle,
  TotalBox,
  CartPayButton
} from './styled'


const ModalComponent = ({data}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { showCart, cartItems, isMercadoInit } = useAppSelector(state => state.cart);

  const [paymentOption, setPaymentOption] = useState('')
  const [preferenceId, setPreferenceId] = useState('') //mp
  const [loading, setLoading] = useState(false) // mp
  const [shouldShowBuyButton, setShouldShowBuyButton] = useState(true)

  // TODO check is everything encopsulated here
  const onFinish = async formValues => {
    setLoading(true);
    try {
      // Инициализируем Mercado Pago при нажатии кнопки
      if (paymentOption === 'mercado' && !isMercadoInit) {
        console.log('initMercadoPago MMM on button click')
        dispatch(toggleSetMercado(true))
        initMercadoPago(process.env.PUBLIC_KEY_BTN || '')
      }

      // 1. UPDATE EXISTING PRODUCT BD
      await updateExistingProduct(cartItems, data)

      // 2. CREATE NEW ORDER BD
      const {orderData, filteredArray} = await createNewOrder(cartItems, formValues)

      // 3. PAYMENT
      await handlePayment(orderData, filteredArray, formValues, paymentOption, router, setPreferenceId)
    } catch (error) {
      console.error('Error processing:', error);
    } finally {
      setLoading(false);
      setShouldShowBuyButton(false)
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
                sizes='100vh'
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
            <div>
              <Image 
                src={img55} 
                fill={true}
                alt='la imagen de fondo modal' 
                style={{
                  objectFit: "cover",
                  zIndex: -5,
                  // marginLeft: 95
                }} 
                priority // hight loading priority
              />
            </div>
            <>
              <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              <ListItemsWrapper>
                {cartItems.map(props => <CartItemComponent key={props?.idCart || ''} {...props} /> )}
              </ListItemsWrapper>
              
            </>
            <>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm
                onFinish={onFinish} 
                loading={loading} 
                preferenceId={preferenceId}
                paymentOption={paymentOption}
                setPaymentOption={setPaymentOption}
                shouldShowBuyButton={shouldShowBuyButton}
                initialValues={{ country: 'colombia', document_type: 'cc' }} 
              />
            </>
          </>
        )}
      </ModalStyled>
    </main>
)}

export default ModalComponent
