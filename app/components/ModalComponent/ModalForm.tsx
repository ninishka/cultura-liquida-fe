import React, { FC } from 'react';
import { Radio, Tooltip } from 'antd'
import { useAppSelector } from '@/lib/redux/store/hooks'
import ModalFormFields from './ModalFormFields'
import type { ModalFormProps } from '@/types/types'
import { calculateTotalSum, totalSumStyledByDot } from '@/app/components/helpers'
import BankingBox from './BankingBox'

import {
  StyledForm,
  StyledFormItem,
  TotalBox,
  TotalWrap,
  LeftSideWrap,
  CartPayButton,
  BankInfoText,
} from './styled'

// TODO: Add PSE, PayU, ePayco
// Debit, credit
// Allow crypto?

const ModalForm: FC<ModalFormProps> = ({ onFinish, loading, initialValues, isOrder, paymentOption, setPaymentOption }) => {
  const { cartItems } = useAppSelector(state => state.cart);
  const totalSum = calculateTotalSum(cartItems);
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
              {/* TODO design ?? */}
              <p style={{ color: 'gray', fontSize: 24, margin: 0}}>delivery 15.000</p>
              <p style={{ color: 'white', fontSize: 48, margin: 0}}>Total:</p>
              <p style={{ color: '#4FDB40', fontSize: 36, margin: 0}}>{styledTotalSum}</p>
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
            <div style={{ margin: 10 }}>
              <BankInfoText style={{ margin: '10px 13px' }}>
                Para completar tu pedido, puedes realizar una transferencia bancaria a cualquiera de las siguientes cuentas.
              </BankInfoText>
              <div style={{ display: 'flex' }}>
                <BankingBox title='Bancolombia Ahorros' num='11519071497' />
                <BankingBox title='BBVA Ahorros' num='0640002991' />
                <BankingBox title='Nequi' num='3218669199' />
              </div>
              <div style={{ backgroundColor: '#F2C94C', borderRadius: 16, width: '-webkit-fill-available', margin: 10, display: 'flex', justifyContent: 'space-around' }}>
                <p style={{ maxWidth: '50%', margin: '7px 0', lineHeight: 1.2 }}>
                  Después de realizar el pago, envía el comprobante junto con el número de tu pedido al correo para confirmar la transacción.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ textTransform: 'uppercase', fontWeight: 700, margin: 10}}>llorar:</p>
                  <p style={{ fontWeight: 700, margin: 10 }}>culturaliquidacol@gmail.com:</p>  
                </div>
              </div>
              <BankInfoText style={{ margin: 10 }}>
                Tu pedido será procesado y enviado tan pronto validemos el pago.
              </BankInfoText>
            </div>
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
