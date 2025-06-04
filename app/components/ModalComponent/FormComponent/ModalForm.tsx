import React, { FC, useState } from 'react';
import { Radio, Tooltip } from 'antd'
import { useAppSelector } from '@/lib/redux/store/hooks'
import ModalFormFields from './ModalFormFields'
import TransferBox from './TransferBox'
import Contacts from '@/app/components/Contacts/Contacts'
import type { ModalFormProps } from '@/types/types'
import { getProductCost, getTotalCost } from '@/helpers/pricing'
import { formatPrice } from '@/helpers/formats'
import { Wallet } from '@mercadopago/sdk-react'
import { shippingCost } from '@/helpers/constants'
import { termsAndCondidtionsValidator } from './formHelpers'

import {
  StyledForm,
  StyledFormItem,
  LeftSideWrap,
  SubtotalText,
  PriceTextBox,
  CheckboxInput,
  WalletWrapper
} from './styled'

import {
  TotalBox,
  TotalWrap,
  CartPayButton,
} from '../styled'


// TODO: Add PSE, ePayco
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
  const totalCost = getTotalCost(cartItems);

  const styledTotalCost = formatPrice(totalCost)
  const displayProductCost = formatPrice(productCost, ' ')
  const displayShippingCost = formatPrice(shippingCost, ' ')

  const handleChange = (type) => {
    setPaymentOption(type)
    if (type === 'transfer') setTransfer(true)
    else setTransfer(false)
  }

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const onDepartmentChange = (value: string): void => {
    setSelectedDepartment(value);
    form.setFieldValue('city', undefined);
  }

  const isMercado = preferenceId && paymentOption === 'mercado'
  
  return (
    <div>
    <StyledForm 
      form={form}
      onFinish={onFinish} 
      initialValues={initialValues}
      onFinishFailed={(errorInfo) => console.log('Form failed:', errorInfo)}
    >
      <ModalFormFields 
        isOrder={isOrder}
        notes={initialValues?.notes || ''}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={onDepartmentChange}
      />
      {!isOrder && (
        <StyledFormItem
          name="remember" 
          valuePropName="checked"
          style={{ width: '100%'}}
          rules={termsAndCondidtionsValidator}
        >
          <CheckboxInput disabled={isAgree} onClick={() => !isAgree && setIsAgree(true)}>
            Tus datos personales serán usados para procesar tu pedido, mejorar tu experiencia en nuestra tienda, y para otros propósitos descritos en nuestra politica de privacidad.
          </CheckboxInput>
        </StyledFormItem>
      )}

      {!isOrder && (
        <TotalBox $isMercado={isMercado}>
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
              <Radio.Group 
                style={{ display: 'flex', flexDirection: 'column', color: 'white'}}
                value={paymentOption}
                onChange={e => handleChange(e.target.value)}
              >
                <Radio value="mercado" style={{ color: 'white' }}> Mercado Pago </Radio>
                <Radio value="transfer" style={{ color: 'white' }}> Transferencia a cuenta bancaria </Radio>
              </Radio.Group>
            </StyledFormItem>
          </TotalWrap>
          {paymentOption === 'transfer' && <TransferBox />}

          {!isOrder && (
            <Contacts paymentOption={paymentOption} />
          )}

          <StyledFormItem style={{ width: '100%' }}>
            <Tooltip title={!paymentOption ? 'Por favor, elija el método de pago' : ''}>
                {(shouldShowBuyButton || isTransfer) && (
                  <CartPayButton htmlType="submit" loading={loading} disabled={!paymentOption}>
                    Comprar
                  </CartPayButton>
                )}
            </Tooltip>
          </StyledFormItem>
        </TotalBox>
      )}
    </StyledForm>
      {isMercado && (
        <WalletWrapper>
          <Wallet
            key={process.env.PUBLIC_KEY_BTN}
            initialization={{ preferenceId }}
            customization={{ texts:{ valueProp: 'smart_option'}}} 
          />
        </WalletWrapper>
      )}
    </div>
  );
};

export default ModalForm
