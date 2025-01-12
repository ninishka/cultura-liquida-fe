import React, { FC } from 'react';
import { Radio, Tooltip } from 'antd'
import { useAppSelector } from '@/lib/redux/store/hooks'
import ModalFormFields from './ModalFormFields'
import type { ModalFormProps } from '@/types/types'
import { calculateSum, enivoPrice, totalSumStyledByDot } from '@/app/components/helpers'
import BankingBox from './BankingBox'

import {
  StyledForm,
  StyledFormItem,
  TotalBox,
  TotalWrap,
  LeftSideWrap,
  CartPayButton,
  BankInfoText,
  MailLink,
  BankingBoxesWrapper,
  TransferBoxWrapper,
  MailWrapper,
  MailDescription,
  MailLorar
} from './styled'

import {
  SubtotalText,
  PriceTextBox,
} from '@/app/check-out/[status]/styled'

// TODO: Add PSE, PayU, ePayco
// Debit, credit
// Allow crypto?

const ModalForm: FC<ModalFormProps> = ({ onFinish, loading, initialValues, isOrder, paymentOption, setPaymentOption }) => {
  const { cartItems } = useAppSelector(state => state.cart);
  const subtotalSum = calculateSum(cartItems);
  const totalSum = calculateSum(cartItems, enivoPrice);
  const styledTotalSum = totalSumStyledByDot(totalSum)

  return (
    <StyledForm 
      onFinish={onFinish} 
      onFinishFailed={(errorInfo) => console.log('Form failed:', errorInfo)}
      initialValues={initialValues}
    >
      <ModalFormFields isOrder={isOrder} notes={initialValues?.notes || ''} />
      {!isOrder && (
        <TotalBox>
          <TotalWrap>
            <LeftSideWrap>
              {/* <div style={{ margin: 15, width: '100%' }}> */}
                <PriceTextBox>
                  <SubtotalText>Subtotal: </SubtotalText>
                  <SubtotalText>{subtotalSum} cop</SubtotalText>
                </PriceTextBox>
                <PriceTextBox>
                  <SubtotalText>Envío: </SubtotalText>
                  <SubtotalText>15 000 cop</SubtotalText>
                </PriceTextBox>
                <PriceTextBox style={{ marginTop: 10 }}>
                  <p style={{ fontSize: 36, margin: 0, color: '#4FDB40' }}>TOTAL: </p>
                  <p style={{ fontSize: 36, margin: '0 0 0 15px', color: '#4FDB40' }}>{styledTotalSum} COP</p>
                </PriceTextBox>
              {/* </div> */}
            </LeftSideWrap>  
            <StyledFormItem 
              label={<p style={{ color: '#F2C94C'}}>Seleccione un método de pago:</p>} 
              // style={{ width: '33%'}}
            >
              <Radio.Group style={{ display: 'flex', flexDirection: 'column', color: 'white'}}>
                <Radio value="apple" style={{ color: 'white' }} onClick={() => setPaymentOption('mercado')}> Mercado Pago </Radio>
                {/* <Radio value="pear" style={{ color: 'white'}}> Mercado Pago - Tarjeta de Crédito, PSE y otros medios de pago </Radio> */}
                <Radio value="pear2" style={{ color: 'white' }} onClick={() => setPaymentOption('transfer')}> Transferencia a cuenta bancaria </Radio>
              </Radio.Group>
            </StyledFormItem>
          </TotalWrap>
          {paymentOption === 'transfer' && (
            <TransferBoxWrapper>
              <BankInfoText style={{ margin: '10px 13px' }}>
                Para completar tu pedido, puedes realizar una transferencia bancaria a cualquiera de las siguientes cuentas.
              </BankInfoText>
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
                  <MailLorar>LLORAR:</MailLorar>
                  <MailLink href='mailto:culturaliquidacol@gmail.com'>culturaliquidacol@gmail.com</MailLink>  
                </div>
              </MailWrapper>
              <BankInfoText style={{ margin: '18px 13px 0', fontSize: 16 }}>
                Tu pedido será procesado y enviado tan pronto validemos el pago.
              </BankInfoText>
            </TransferBoxWrapper>
          )}
          <StyledFormItem style={{ width: '100%' }}>
            <Tooltip title={!paymentOption ? 'Por favor, elija el método de pago' : ''}>
              <>
                <CartPayButton htmlType="submit" loading={loading} disabled={!paymentOption}>
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
