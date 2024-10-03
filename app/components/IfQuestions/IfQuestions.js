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
          <ContactText>¿Aún tienes preguntas?</ContactText>
          <Text>¡Escríbenos por Telegram o Instagram!</Text>
        </TextWrapper>
        <ContactWrapper>
          <a href="https://t.me/nameless_berk" target="_blank"><Contacts sizes='100vw' src={telegram} alt="telegram"/></a>
          <a href="https://www.instagram.com/_culturaliquida" target="_blank"><Contacts sizes='100vw' src={instagram} alt="instagram"/></a>
        </ContactWrapper>   
      </Wrapper>
    </section>
)}


export default IfQuestions