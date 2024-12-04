import React, { FC } from 'react'
import Tg from './TgIcon'
// import WhatsApp from './WhatsAppIcon'

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
        <a href="https://t.me/cultura_liquida" target="_blank" aria-label="Contacto en Telegram"><Tg /></a>
        {/* <a href="https://t.me/cultura_liquida" target="_blank" aria-label="Contacto en WhatsApp"><WhatsApp /></a> */}
      </ContactWrapper>   
    </Wrapper>
  </section>
)


export default IfQuestions