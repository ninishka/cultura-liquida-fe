import {
  LogoFull,
  LogoItself,
  HeaderFull,
  UlItself,
  StyledButton,
  // LiDiv,
  LiItself,
  Cart,
  CartWrap,
} from './styled'

import Logo from '../icons/logo_full 1.svg'
import CartIcon from '../icons/icon_cart.svg'
import data from './../data'

const HeaderComponent = ({ setDisplayingItem }) => (
  <HeaderFull>
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
    <CartWrap>
      <Cart src={CartIcon} alt="cart logo" />
    </CartWrap>
  </HeaderFull>
)

export default HeaderComponent;
