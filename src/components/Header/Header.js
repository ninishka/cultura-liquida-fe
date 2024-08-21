import {
  LogoFull,
  LogoItself,
  HeaderFull,
  UlItself,
  LiDiv,
  LiItself,
  Cart,
  CartWrap,
} from './styled'

import Logo from '../icons/logo_full 1.svg'
import CartIcon from '../icons/icon_cart.svg'


const navigation = [
  {
    id: '1',
    title: 'Melena de León',
    href: ''
  },

  {
    id: '2',
    title: 'Reishi',
    href: ''
  },
  {
    id: '3',
    title: 'Cola de Pavo',
    href: ''
  }
]

const Header= () => (
  <HeaderFull>
    <LogoFull>
      <LogoItself src={Logo} alt="Company Logo" />
    </LogoFull>
    <nav>
    <UlItself>
    {navigation.map(({ title, href}) => (
        <LiDiv>
          <a style={{textDecoration: 'none', color: 'inherit'}}href={href}>
            <LiItself>{title}</LiItself>
          </a>
        </LiDiv>
    ))} 
    </UlItself>
    </nav>
    <CartWrap>
      <Cart src={CartIcon} alt="cart logo" />
    </CartWrap>
  </HeaderFull>
)

export default Header;
