import {
  LogoFull,
  LogoItself,
  FooterFull,
  TwoFooterWrap,
  UlItself,
  StyledButton,
  LiItself,
  Contacts,
  ContactWrapper,
  LastFooter,
  SomeText,
} from './styled'

import Logo from '../../assets/icons/logo_full 1.svg'
import CartIcon from '../../assets/icons/icon_cart.svg'
import data from './../data'

import telegram from '../../assets/icons/telegram.png'
import instagram from '../../assets/icons/instagram_1.png'
import phone from '../../assets/icons/phone_1.png'


const FooterComponent = ({ setDisplayingItem }) => (
  <FooterFull>
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
    {/* <LastFooter>
      <SomeText>2024 año. Cultura Liquida. Reservados todos los derechos.</SomeText>
      <SomeText>Designed by Energy Lynx</SomeText>
    </LastFooter> */}
  </FooterFull>
)

export default FooterComponent;
