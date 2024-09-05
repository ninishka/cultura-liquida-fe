import {  useState } from 'react';
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
  CartItemsWrap,
  CartItem,
  CartImg,
  TextWrapper,
  Title,
  Description
} from './styled'
import Counter from '../Counter/Counter'

import icon1 from '../../assets/icons/icon_caps.svg'
import melenacaps from '../../assets/icons/Frame_878.png'
import icon3 from '../../assets/icons/icon_ex30.svg'
import reishiextract from '../../assets/icons/Frame_87R.png'
import icon2 from '../../assets/icons/icon_ex100.svg'
import colaextract from '../../assets/icons/Frame_87C.png'

// ./ - inside current folder
// ../ - outside current folder


const cartProductData = [
  {
    id: '1',
    icon: icon1,
    text: 'Cápsulas',
    title: 'Melena de leon',
    description: 'Hericium erinaceus',
    src: melenacaps,
  },
  {
    id: '2',
    icon: icon3,
    text: 'Extracto 30ml',
    title: 'reishi',
    description: 'Ganoderma lucidum',
    src: reishiextract,
  },
  {
    id: '1',
    icon: icon2,
    text: 'Extracto 100ml',
    title: 'cola de pave',
    description: 'Trametes Versicolor',
    src: colaextract,
  },
]

const Modal = ({ showModal, setShowModal  }) => {
  const [displayingItem, setDisplayingItem] = useState('1');
  const [ count, setCount ] = useState(1)
  
  return (
    <FullModal showModal={showModal} displayingItem={displayingItem}>
      <ModalWrapper>
        <ContentWrapper  setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} >
          <ModalTitle>Tu carrito de la compra</ModalTitle>
             <CartItemsWrap>
                {cartProductData.map(({id, icon,title, description, text, src}) => (
                  <CartItem>
                    <CartImg src={src}/>
                    <TextWrapper>
                      <Title>{title.toUpperCase()}</Title>
                      <Description>{description}</Description>
                    </TextWrapper>
                    <p style={{color: 'red'}}>{text}</p>
                    <Counter count={count} setCount={setCount} noBtn />

                  </CartItem>
                ))}
            </CartItemsWrap>
            <button onClick={() => setShowModal(false)}>Close</button>
        </ContentWrapper>
      </ModalWrapper>
    </FullModal>
)};


export default Modal
