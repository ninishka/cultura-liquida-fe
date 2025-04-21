import React, { FC } from 'react';
import BankingBox from '../BankingBox/BankingBox'
import type { OrderStyledProps } from '@/types/types'

import {
  BankingBoxesWrapper,
  TransferBoxWrapper,
} from './styled'

const TransferBox: FC<OrderStyledProps> = ({ isOrder }) => (
  <TransferBoxWrapper $isOrder={isOrder}>
    {!isOrder && (
      <p style={{ margin: '10px 13px', color: 'white' }}>
        Para completar tu pedido, puedes realizar una transferencia bancaria a cualquiera de las siguientes cuentas.
      </p> 
    )}
    <BankingBoxesWrapper $isOrder={isOrder}>
      <BankingBox title='Bancolombia Ahorros' num='11519071497' isOrder={isOrder}/>
      <BankingBox title='Davivienda Ahorros' num='086100233278' isOrder={isOrder}/>
      <BankingBox title='Nequi, Daviplata y Transfiya' num='3218669199' isOrder={isOrder}/>
    </BankingBoxesWrapper>
  </TransferBoxWrapper>
)

export default TransferBox
