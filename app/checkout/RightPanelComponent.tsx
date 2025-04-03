'use client'

import React, { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';
import { Radio, Tooltip } from 'antd'
import { formatPrice } from '@/helpers/formats'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import TransferBox from '@/app/components/ModalComponent/FormComponent/TransferBox'
import approvedIcon from '@/app/icons/icon_paid_true.svg'
import pendingIcon from '@/app/icons/icon_paid_error.svg'
import falseIcon from '@/app/icons/icon_paid_false.svg'
import { shippingCost } from '@/helpers/constants'
import { fetcher } from '@/helpers/network'
import { handlePayment } from '@/helpers/data';

import { useAppSelector } from '@/lib/redux/store/hooks'
import { toggleSetMercado } from '@/lib/redux/slices/cartSlice'

import {
  RightPanel,
  StatusPanel,
  SubtotalText,
  PriceTextBoxCheckout,
} from './styled'
import { StyledForm, StyledFormItem } from '@/app/components/ModalComponent/FormComponent/styled'
import { CartPayButton } from '@/app/components/ModalComponent/styled'


interface RightPanelInterface {
  [key: string]: any; // TODO
}

const RightPanelComponent: FC<RightPanelInterface> = ({ data, respStatus, refetch }) => {
  const [form] = StyledForm.useForm()
  const router = useRouter()
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id')
  const { isMercadoInit } = useAppSelector(state => state.cart);
  
  const [preferenceId, setPreferenceId] = useState('') //mp
  const [paymentOption, setPaymentOption] = useState('')

  const [showBuyButton, setShowBuyButton] = useState(false)
  const [showWallet, setShowWallet] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPaymentOption(data?.form_data?.payment_method)
  }, [data]); 

  useEffect(() => {
    if (paymentOption === 'mercado' && preferenceId) {
      setShowWallet(true);
    } else {
      setShowWallet(false);
    }
  }, [paymentOption, preferenceId]);

  // in_process - is for MP payment status BUT pending - is for order record status
  const isPending = (respStatus === 'in_process' || respStatus === 'pending')
  const coloring = (respStatus === 'approved' && '#4FDB40') || (isPending && '#F2C94C') 
  const iconing = (respStatus === 'approved' && approvedIcon) || (isPending && pendingIcon) || falseIcon 
  const wording = (respStatus === 'approved' && 'pagado') || (isPending && 'pendiente') || 'no pagado'

  const beforeDelivery = formatPrice(data.totalCost - shippingCost, ' ')
  const displayTotal = formatPrice(data?.totalCost, ' ')
  const displayShippingCost = formatPrice(shippingCost, ' ')

  const bodyToUpdate = JSON.stringify({
    orderId: orderIdParam,
    updatedData: {
      form_data: {
        ...data?.form_data,
        payment_method: paymentOption
      },
    },
  })

  const changePaymentOptionHandler = type => {
    setShowBuyButton(data?.form_data?.payment_method !== type)
    setPaymentOption(type)
  }

  const updateOrderPaymentMethod = async () => {
    await fetcher('PUT', `/api/orders?orderId=${orderIdParam}`, bodyToUpdate, 'update order payment method')
  }

  const handleChangePayment = async () => {
    await handlePayment(data, data?.products, data?.form_data, paymentOption, router, setPreferenceId)
    setLoading(false)
    setShowBuyButton(false)
    refetch()
  }

  const onFinish = () => {
    if (data && typeof data === 'object') {
      setLoading(true)
      
      if (data?.form_data?.payment_method !== paymentOption) {
        updateOrderPaymentMethod()

        if (paymentOption === 'mercado') {
          if(!isMercadoInit) {
              console.log('initMercadoPago RRR')
              toggleSetMercado(true)
              initMercadoPago(process.env.PUBLIC_KEY_BTN)
            } // Public key
        }  
        else if (paymentOption === 'transfer') {
          setPreferenceId('')
          setLoading(false)
          setShowBuyButton(false)
        }

        handleChangePayment()
      }
    }
  }; 

  return (
    <RightPanel>
      <Tooltip
        title={
          (respStatus !== 'approved' && paymentOption === 'transfer') ? (
            <div style={{ textAlign: 'center'}}>
              Por favor, asegúrese de haber enviado el comprobante de pago al correo electrónico{' '}
              <Link style={{ color: '#F2C94C'}} href="mailto:culturaliquidacol@gmail.com">
                culturaliquidacol@gmail.com
              </Link>
            </div>
          ) : (
          ''
          )
        }
      >
        <StatusPanel $status={coloring}>
          <div style={{display: 'flex', padding: 27}}>
            <Image
              sizes="100vw"
              src={iconing}
              alt="El pago fue exitoso"
              width={40}
              height={40}
            />
            <div style={{margin: '0 15px'}}>
              <p style={{margin: 0, fontWeight: 400}}>Estado de pago:</p>
              <p style={{margin: 0, fontWeight: 700}}>{wording}</p>
            </div>
          </div>
        </StatusPanel>
      </Tooltip>

      <div style={{ margin: 15 }}>
        <PriceTextBoxCheckout>
          <SubtotalText>Subtotal: </SubtotalText>
          <SubtotalText>{beforeDelivery}</SubtotalText>
        </PriceTextBoxCheckout>
        <PriceTextBoxCheckout>
          <SubtotalText>Envío: </SubtotalText>
          <SubtotalText>{displayShippingCost}</SubtotalText>
        </PriceTextBoxCheckout>
        <PriceTextBoxCheckout style={{ marginTop: 10 }}>
          <p style={{ fontSize: 36, margin: 0, color: '#4FDB40' }}>TOTAL: </p>
          <p style={{ fontSize: 36, margin: '0 0 0 15px', color: '#4FDB40' }}>{displayTotal} COP</p>
        </PriceTextBoxCheckout>
      </div>

      <div style={{ margin: 15 }}>
        {respStatus !== 'approved' && 
          <>
            <p style={{ margin: '20px 0 0', fontSize: '18px'}}>Paga ahora o elige otro método de pago:</p>
            <StyledForm form={form} onFinish={onFinish} initialValues={{ payment_method: data?.form_data?.payment_method }}>
              <StyledFormItem
                name="payment_method"
                style={{ width: '100%', padding: 0, margin: '5px 0'}}
              >
                <Radio.Group 
                  style={{ display: 'flex', flexDirection: 'column', color: 'white'}}
                  onChange={(e) => changePaymentOptionHandler(e.target.value)}
                >
                  <Radio value="mercado" style={{ color: 'white' }}> Mercado Pago </Radio>
                  <Radio value="transfer" style={{ color: 'white' }}> Transferencia a cuenta bancaria </Radio>
                </Radio.Group>
              </StyledFormItem>
              {showBuyButton && <CartPayButton htmlType="submit" loading={loading}>Comprar</CartPayButton>}
            </StyledForm>
            {showWallet && (
              <Wallet
                key={process.env.PUBLIC_KEY_BTN}
                c={console.log('showWallet RRR', preferenceId)}
                initialization={{ preferenceId }}
                customization={{ texts:{ valueProp: 'smart_option'}}} 
              />
            )}
            {(paymentOption === 'transfer' && !showBuyButton) && <TransferBox isOrder />}
          </>
        }
      </div>
    </RightPanel>
  );
}

export default RightPanelComponent
