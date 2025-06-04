import React, { FC } from 'react';
import type { ContactsProps } from '@/types/types'

import Wa from '@/app/components/IconComponents/WaIcon'
import Image from 'next/image'
import payArrow from '@/app/icons/icon_arrow_email.svg'

import {
  MailLink,
  MailWrapper,
  MailDescription,
  MailContent,
  MailImgWrapper,
  StyledLink,
  TransferNote
} from './styled'

const Contacts: FC<ContactsProps> = ({ paymentOption, isColumn }) => (
  <>
    <MailWrapper isColumn={isColumn}>
      <MailDescription isColumn={isColumn}>
        {paymentOption === 'mercado' 
          ? 'Si completas el pago y no regresas a la página del pedido, o ves tu pedido como pendiente, comunícate con nosotros y lo verificaremos manualmente.'
          : 'Después de realizar el pago, envía el comprobante junto con el número de tu pedido al correo para confirmar la transacción.'
        }              
      </MailDescription>
      <MailContent>
        {!isColumn && (
        <MailImgWrapper>
          <Image src={payArrow} alt='Después del pago envíe una captura de pantalla al correo electrónico' />
        </MailImgWrapper>
        )}

        <MailLink href='mailto:culturaliquidacol@gmail.com'>culturaliquidacol@gmail.com</MailLink>  
        <StyledLink href="https://wa.me/573117662419" target="_blank" aria-label="WhatsApp"><Wa width={30} height={30} isDark /></StyledLink>
      </MailContent>
    </MailWrapper>
    {paymentOption === 'transfer' && (
      <TransferNote>
        Tu pedido será procesado y enviado tan pronto validemos el pago.
      </TransferNote>
    )}
  </>
)

export default Contacts
