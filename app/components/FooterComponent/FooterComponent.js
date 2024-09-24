"use client"

import { useContext } from 'react';

import {
  LogoFull,
  LogoItself,
  FooterFull,
  HeaderLikeFooter,
  TwoFooterWrap,
  UlItself,
  StyledButton,
  LiItself,
  Contacts,
  ContactWrapper,
  LastFooter,
} from './styled'

import Logo from '@/app/icons/logo_full 1.svg'
import data from '../data'
import CartContext from '@/app/contexts/cartContext/cartContext'

import telegram from '@/app/icons/telegram.png'
import instagram from '@/app/icons/instagram_1.png'
import phone from '@/app/icons/phone_1.png'


const FooterComponent = () => {
  const { setDisplayingItem } = useContext(CartContext)

  return (
    <FooterFull>
      <HeaderLikeFooter>
      <LogoFull>
        <LogoItself src={Logo} alt="Company Logo" />
      </LogoFull>
      <nav>
        <UlItself>
          {data.map(({ title }, index) => {
            const id = index + 1
            return (
              <LiItself key={title}>
                <StyledButton onClick={() => setDisplayingItem(id.toString())}>
                    {title}
                </StyledButton>
              </LiItself>
            )
          })} 
        </UlItself>
      </nav>
      <ContactWrapper>
        <a href="https://t.me/nameless_berk" target="_blank"><Contacts src={telegram} alt="telegram"/></a>
        <a href="https://www.instagram.com/_culturaliquida" target="_blank"><Contacts src={instagram} alt="instagram"/></a>
        <a href="tel:+573218669199"><Contacts src={phone} alt="phonenumber"/></a>
      </ContactWrapper>
      </HeaderLikeFooter>
      <LastFooter>
        <p>2024 año. Cultura Liquida. Reservados todos los derechos.</p>
        <p>Designed by Energy Lynx</p>
      </LastFooter>
    </FooterFull>
  )
}
export default FooterComponent;
