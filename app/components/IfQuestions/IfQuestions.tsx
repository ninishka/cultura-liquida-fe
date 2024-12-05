import React, { FC } from 'react'
import Link from 'next/link'
import Tg from '@/app/components/IconComponents/TgIcon'
import Wa from '@/app/components/IconComponents/WaIcon'
import {
  ContactWrapper,
  Wrapper,
  TextWrapper,
  ContactText,
  Text
} from './styled'

const IfQuestions: FC = () => (
  <section >
    <Wrapper>
      <TextWrapper>
        <ContactText>¿Tienes preguntas?</ContactText>
        <Text>Contáctanos en Telegram o WhatsApp y te responderemos rápidamente.</Text>
        {/* TODO add whatsapp link and icon */}
      </TextWrapper>
      <ContactWrapper>
        <Link href="https://t.me/cultura_liquida" target="_blank" aria-label="Contacto en Telegram"><Tg /></Link>
        <Link href="https://t.me/cultura_liquida" target="_blank" aria-label="Contacto en WhatsApp"><Wa /></Link>
      </ContactWrapper>   
    </Wrapper>
  </section>
)

export default IfQuestions
