import {
  ContactWrapper,
  Contacts,
  Wrapper,
  TextWrapper,
  ContactText,
  Text
} from './styled'

import telegram from '@/app/icons/Frame121.png'
import instagram from '@/app/icons/Frame121(1).png'


const IfQuestions = ({something}) => {

  return (
    <section >
      <Wrapper>
        <TextWrapper>
          <ContactText>¿Tienes preguntas?</ContactText>
          <Text>Contáctanos en Telegram o Whatsapp y te responderemos rápidamente.</Text>
          {/* TODO add whatsapp link and icon */}
        </TextWrapper>
        <ContactWrapper>
          <a href="https://t.me/nameless_berk" target="_blank"><Contacts sizes='100vw' src={telegram} alt="telegram"/></a>
          <a href="https://www.instagram.com/_culturaliquida" target="_blank"><Contacts sizes='100vw' src={instagram} alt="instagram"/></a>
        </ContactWrapper>   
      </Wrapper>
    </section>
)}


export default IfQuestions