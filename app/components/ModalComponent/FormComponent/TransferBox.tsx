import React, { FC } from 'react';
import Image from 'next/image'
import BankingBox from '../BankingBox/BankingBox'
import payArrow from '@/app/icons/icon_arrow_email.svg'
import type { OrderStyledProps } from '@/types/types'

import {
    MailLink,
    MailWrapper,
    MailDescription,
    MailImgWrapper,
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
      <BankingBox title='BBVA Ahorros' num='0640002991' isOrder={isOrder}/>
      <BankingBox title='Nequi' num='3218669199' isOrder={isOrder}/>
    </BankingBoxesWrapper>
    {!isOrder && (
      <>
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
      </>
    )}
  </TransferBoxWrapper>
)

export default TransferBox
