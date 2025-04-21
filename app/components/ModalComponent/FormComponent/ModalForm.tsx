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
import { termsAndCondidtionsValidator } from './formHelpers'

import {
  StyledForm,
  StyledFormItem,
  LeftSideWrap,
  SubtotalText,
  PriceTextBox,
  CheckboxInput,

  MailLink,
  MailWrapper,
  MailDescription,
  MailImgWrapper,
  StyledLink,
} from './styled'
import Wa from '@/app/components/IconComponents/WaIcon'
import Image from 'next/image'
import payArrow from '@/app/icons/icon_arrow_email.svg'

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

  console.log('preferenceId', preferenceId)
  
  return (
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
            <>
              <MailWrapper>
                <MailDescription>
                  {paymentOption === 'mercado' 
                    ? 'Si completas el pago y no regresas a la página del pedido, o ves tu pedido como pendiente, comunícate con nosotros y lo verificaremos manualmente.'
                    : 'Después de realizar el pago, envía el comprobante junto con el número de tu pedido al correo para confirmar la transacción.'
                  }              
                </MailDescription>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MailImgWrapper>
                    <Image src={payArrow} alt='Después del pago envíe una captura de pantalla al correo electrónico' />
                  </MailImgWrapper>
                  <MailLink href='mailto:culturaliquidacol@gmail.com'>culturaliquidacol@gmail.com</MailLink>  
                  <StyledLink href="https://wa.me/573117662419" target="_blank" aria-label="WhatsApp"><Wa width={30} height={30} isDark /></StyledLink>
                </div>
              </MailWrapper>
              {paymentOption === 'transfer' && (
                <p style={{ margin: '18px 13px 0', fontSize: 16, color: 'white' }}>
                  Tu pedido será procesado y enviado tan pronto validemos el pago.
                </p>
              )}
            </>
          )}

          <StyledFormItem style={{ width: '100%' }}>
            <Tooltip title={!paymentOption ? 'Por favor, elija el método de pago' : ''}>
              <>
                {(shouldShowBuyButton || isTransfer) && (
                  <CartPayButton htmlType="submit" loading={loading} disabled={!paymentOption}>
                    Comprar
                  </CartPayButton>
                )}
                
                 {(preferenceId && paymentOption === 'mercado') && (
                    <Wallet
                      key={process.env.PUBLIC_KEY_BTN}
                      c={console.log('showWallet MMM', preferenceId)}
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
