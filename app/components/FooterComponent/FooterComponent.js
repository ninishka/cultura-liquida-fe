"use client"

import Logo from '@/app/icons/logo_full 1.svg'
import telegram from '@/app/icons/telegram.png'
import phone from '@/app/icons/phone_1.png'
import NavigationComponent from '@/app/components/NavigationComponent/NavigationComponent'
import Link from 'next/link'

import {
  LogoFull,
  LogoItself,
  FooterFull,
  HeaderLikeFooter,
  Contacts,
  ContactWrapper,
  LastFooter,
} from './styled'

const FooterComponent = () => (
  <FooterFull>
    <HeaderLikeFooter>
    <LogoFull href='/product/melena-de-leon-capsules'> 
      <LogoItself src={Logo} alt="Company Logo" />
    </LogoFull>
    <NavigationComponent />
    <ContactWrapper>
      <Link href="https://t.me/cultura_liquida" target="_blank">
        <Contacts src={telegram} alt="Telegram contact"/>
      </Link>
      <Link href="tel:+573107217798">
        <Contacts src={phone} alt="Phone number contact"/>
      </Link>
    </ContactWrapper>
    </HeaderLikeFooter>
    <LastFooter>
      <p>2024 año. Cultura Liquida. Reservados todos los derechos.</p>
      <p>Designed by Energy Lynx</p>
    </LastFooter>
  </FooterFull>
)

export default FooterComponent;
