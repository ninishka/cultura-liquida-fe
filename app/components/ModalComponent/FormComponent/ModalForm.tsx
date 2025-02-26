import React, { FC, useState } from 'react';
import { Radio, Tooltip } from 'antd'
import Image from 'next/image'
import { useAppSelector } from '@/lib/redux/store/hooks'
import ModalFormFields from './ModalFormFields'
import type { ModalFormProps } from '@/types/types'
import { getShippingCost, getProductCost, getTotalCost } from '@/helpers/pricing'
import { formatPrice } from '@/helpers/formats'

import BankingBox from '../BankingBox/BankingBox'
import payArrow from '@/app/icons/icon_arrow_email.svg'

import {
  termsAndCondidtionsValidator
} from './formHelpers'

import {
  StyledForm,
  StyledFormItem,
  LeftSideWrap,
  MailLink,
  MailWrapper,
  MailDescription,
  MailImgWrapper,
  SubtotalText,
  PriceTextBox,
  BankingBoxesWrapper,
  TransferBoxWrapper,
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

const ModalForm: FC<ModalFormProps> = ({ onFinish, loading, initialValues, isOrder, paymentOption, setPaymentOption }) => {
  const { cartItems } = useAppSelector(state => state.cart);
  const [isAgree, setIsAgree] = useState(false);
  const [form] = StyledForm.useForm()

  const productCost = getProductCost(cartItems);
  const shippingCost = getShippingCost(productCost)
  const totalCost = getTotalCost(cartItems);

  const styledTotalCost = formatPrice(totalCost)
  const displayProductCost = formatPrice(productCost, ' ')
  const displayShippingCost = formatPrice(shippingCost, ' ')

  return (
    <StyledForm 
      form={form}
      onFinish={onFinish} 
      onFinishFailed={(errorInfo) => console.log('Form failed:', errorInfo)}
      initialValues={initialValues}
    >
      <ModalFormFields isOrder={isOrder} notes={initialValues?.notes || ''} form={form} />
      {/* checkbox */}
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
                <Radio value="mercado" style={{ color: 'white' }} onClick={() => setPaymentOption('mercado')}> Mercado Pago </Radio>
                <Radio value="transfer" style={{ color: 'white' }} onClick={() => setPaymentOption('transfer')}> Transferencia a cuenta bancaria </Radio>
              </Radio.Group>
            </StyledFormItem>
          </TotalWrap>
          {paymentOption === 'transfer' && (
            <TransferBoxWrapper>
              <p style={{ margin: '10px 13px', color: 'white' }}>
                Para completar tu pedido, puedes realizar una transferencia bancaria a cualquiera de las siguientes cuentas.
              </p>
              <BankingBoxesWrapper>
                <BankingBox title='Bancolombia Ahorros' num='11519071497' />
                <BankingBox title='BBVA Ahorros' num='0640002991' />
                <BankingBox title='Nequi' num='3218669199' />
              </BankingBoxesWrapper>
              <MailWrapper>
                <MailDescription>
                  Después de realizar el pago, envía el comprobante junto con el número de tu pedido al correo para confirmar la transacción.
                </MailDescription>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <MailImgWrapper>
                    <Image src={payArrow} alt='Después del pago envíe una captura de pantalla al correo electrónico' />
                  </MailImgWrapper>
                  <MailLink href='mailto:culturaliquidacol@gmail.com'>culturaliquidacol@gmail.com</MailLink>  
                </div>
              </MailWrapper>
              <p style={{ margin: '18px 13px 0', fontSize: 16, color: 'white' }}>
                Tu pedido será procesado y enviado tan pronto validemos el pago.
              </p>
            </TransferBoxWrapper>
          )}

          <StyledFormItem style={{ width: '100%' }}>
            <Tooltip title={!paymentOption ? 'Por favor, elija el método de pago' : ''}>
              <>
                <CartPayButton htmlType="submit" loading={loading} disabled={!paymentOption || !isAgree}>
                  Comprar
                </CartPayButton>
              </>
            </Tooltip>
          </StyledFormItem>
        </TotalBox>
      )}
    </StyledForm>
  );
};

export default ModalForm
