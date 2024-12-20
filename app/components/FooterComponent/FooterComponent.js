"use client"

import Link from 'next/link'
import NavigationComponent from '@/app/components/NavigationComponent/NavigationComponent'
import Tg from '@/app/components/IconComponents/TgIcon'
import Wa from '@/app/components/IconComponents/WaIcon'
import Ph from '@/app/components/IconComponents/PhIcon'
import Logo from '@/app/icons/logo_full 1.svg'
import {
  LogoFull,
  LogoItself,
  FooterFull,
  HeaderLikeFooter,
  ContactWrapper,
  LastFooter,
} from './styled'

const FooterComponent = () => (
  <FooterFull>
    <HeaderLikeFooter>
    <LogoFull href='/product/melena-de-leon-capsules'> 
      <LogoItself src={Logo} alt="El logo de Cultura Líquida" />
    </LogoFull>
    <NavigationComponent />
    <ContactWrapper>
      <Link href="https://t.me/cultura_liquida" target="_blank" aria-label="Telegram" style={{ margin: '0 8px' }}><Tg  isDark /></Link>
      <Link href="https://wa.me/573117662419" target="_blank" aria-label="WhatsApp" style={{ margin: '0 8px' }}><Wa isDark /></Link>
      <Link href="tel:+573117662419" target="_blank" aria-label="Teléfono" style={{ margin: '0 8px' }}><Ph isDark /></Link>
    </ContactWrapper>
    </HeaderLikeFooter>
    <LastFooter>
      <p>2024 año. Cultura Liquida. Todos los derechos reservados.</p>
      <p>Designed by Energy Lynx</p>
    </LastFooter>
  </FooterFull>
)

export default FooterComponent;
