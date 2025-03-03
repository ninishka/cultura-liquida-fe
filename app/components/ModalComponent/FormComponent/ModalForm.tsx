import React, { FC, useState } from 'react';
import { Radio, Tooltip } from 'antd'
import { useAppSelector } from '@/lib/redux/store/hooks'
import ModalFormFields from './ModalFormFields'
import TransferBox from './TransferBox'
import type { ModalFormProps } from '@/types/types'
import { getProductCost, getTotalCost } from '@/helpers/pricing'
import { formatPrice } from '@/helpers/formats'
import { Wallet } from '@mercadopago/sdk-react'
import { shippingCost } from '@/helpers/constants'
import {
  termsAndCondidtionsValidator
} from './formHelpers'

import {
  StyledForm,
  StyledFormItem,
  LeftSideWrap,
  SubtotalText,
  PriceTextBox,
  CheckboxInput,
} from './styled'

import {
  TotalBox,
  TotalWrap,
  CartPayButton,
} from '../styled'

// TODO: Add PSE, PayU, ePayco
// Debit, credit
// Allow crypto?

const ModalForm: FC<ModalFormProps> = ({ 
  onFinish, loading, initialValues, isOrder, paymentOption,
  setPaymentOption, preferenceId, shouldShowBuyButton
}) => {
  const [form] = StyledForm.useForm()
  const { cartItems } = useAppSelector(state => state.cart);
  const [isAgree, setIsAgree] = useState(false);
  const [isTransfer, setTransfer] = useState(false);

  const productCost = getProductCost(cartItems);
  // const shippingCost = getShippingCost(productCost)
  const totalCost = getTotalCost(cartItems);

  const styledTotalCost = formatPrice(totalCost)
  const displayProductCost = formatPrice(productCost, ' ')
  const displayShippingCost = formatPrice(shippingCost, ' ')

  const handleChange = (type) => {
    setPaymentOption(type)
    if (type === 'transfer') setTransfer(true)
    else setTransfer(false)
  }

  return (
    <StyledForm 
      form={form}
      onFinish={onFinish} 
      initialValues={initialValues}
      onFinishFailed={(errorInfo) => console.log('Form failed:', errorInfo)}
    >
      <ModalFormFields isOrder={isOrder} notes={initialValues?.notes || ''} form={form} />
      {!isOrder && (
        <StyledFormItem
          name="remember" 
          valuePropName="checked"
          style={{ width: '100%'}}
          rules={termsAndCondidtionsValidator}
        >
          <CheckboxInput onClick={() => setIsAgree(!isAgree)}>
            Tus datos personales serán usados para procesar tu pedido, mejorar tu experiencia en nuestra tienda, y para otros propósitos descritos en nuestra politica de privacidad.
          </CheckboxInput>
        </StyledFormItem>
      )}

      {!isOrder && (
        <TotalBox>
          <TotalWrap>
            <LeftSideWrap>
              <PriceTextBox>
                <SubtotalText>Subtotal: </SubtotalText>
                <SubtotalText>{displayProductCost}</SubtotalText>
              </PriceTextBox>
              <PriceTextBox>
                <SubtotalText>Envío: </SubtotalText>
                <SubtotalText>{displayShippingCost}</SubtotalText>
              </PriceTextBox>
              <PriceTextBox style={{ marginTop: 10 }} $isTotal='total'>
                <p style={{ fontSize: 36, margin: 0, color: '#4FDB40' }}>TOTAL: </p>
                <p style={{ fontSize: 36, margin: '0 0 0 15px', color: '#4FDB40' }}>{styledTotalCost} COP</p>
              </PriceTextBox>
            </LeftSideWrap>
            <StyledFormItem
              label={<p style={{ color: '#F2C94C'}}>Seleccione un método de pago:</p>}
              name="payment_method"
            >
              <Radio.Group style={{ display: 'flex', flexDirection: 'column', color: 'white'}}>
                <Radio value="mercado" style={{ color: 'white' }} onClick={() => handleChange('mercado')}> Mercado Pago </Radio>
                <Radio value="transfer" style={{ color: 'white' }} onClick={() => handleChange('transfer')}> Transferencia a cuenta bancaria </Radio>
              </Radio.Group>
            </StyledFormItem>
          </TotalWrap>
          {paymentOption === 'transfer' && <TransferBox />}
          <StyledFormItem style={{ width: '100%' }}>
            <Tooltip title={!paymentOption ? 'Por favor, elija el método de pago' : ''}>
              <>
                {(shouldShowBuyButton || isTransfer) && (
                  <CartPayButton htmlType="submit" loading={loading} disabled={!paymentOption || !isAgree}>
                    Comprar
                  </CartPayButton>
                )}
                {(preferenceId && paymentOption === 'mercado') && (
                  <Wallet
                    key={process.env.PUBLIC_KEY_BTN}
                    initialization={{ preferenceId }}
                    customization={{ texts:{ valueProp: 'smart_option'}}} 
                  />
                )}
              </>
            </Tooltip>
          </StyledFormItem>
        </TotalBox>
      )}
    </StyledForm>
  );
};

export default ModalForm
