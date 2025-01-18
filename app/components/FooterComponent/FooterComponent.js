"use client"

import NavigationComponent from '@/app/components/NavigationComponent/NavigationComponent'
import Tg from '@/app/components/IconComponents/TgIcon'
import Wa from '@/app/components/IconComponents/WaIcon'
import Ph from '@/app/components/IconComponents/PhIcon'
import Inst from '@/app/components/IconComponents/InstIcon'
import Logo from '@/app/icons/logo_full 1.svg'
import { useGetProductQuery } from "@/lib/redux/slices/api";
import {
  LogoFull,
  LogoItself,
  FooterFull,
  HeaderLikeFooter,
  ContactWrapper,
  LastFooter,
  StyledLink
} from './styled'

const FooterComponent = () => {
  const { data } = useGetProductQuery('');

  return (
    <FooterFull>
      <HeaderLikeFooter>
      <LogoFull href={data?.[0]?.slug ? `/product/${data?.[0]?.slug}` : '/'} > 
        <LogoItself src={Logo} alt="El logo de Cultura Líquida" priority />
      </LogoFull>
      <NavigationComponent isFooter />
      <ContactWrapper>
        <StyledLink href="https://t.me/cultura_liquida" target="_blank" aria-label="Telegram"><Tg  isDark /></StyledLink>
        <StyledLink href="https://wa.me/573117662419" target="_blank" aria-label="WhatsApp"><Wa isDark /></StyledLink>
        <StyledLink href="https://www.instagram.com/cult.liq.co" target="_blank" aria-label="Instagram"><Inst isDark /></StyledLink>
        <StyledLink href="tel:+573117662419" target="_blank" aria-label="Teléfono"><Ph isDark /></StyledLink>
      </ContactWrapper>
      </HeaderLikeFooter>
      <LastFooter>
        <p>2024 año. Cultura Liquida. Todos los derechos reservados.</p>
        <p>Designed by Energy Lynx</p>
      </LastFooter>
    </FooterFull>
)}

export default FooterComponent;
