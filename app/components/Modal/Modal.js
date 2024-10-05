"use client"

import React, { useContext } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import bgModal from '@/app/icons/bgModal.png'
import {
  ModalWrapper,
  ContentWrapper,
  ListItemsWrapper,
  ModalTitle,
  FullModal,
  BuyButton
} from './styled'

const Modal = () => {
  const { cartItems, setShowCart, data } = useContext(CartContext)
//   {
//     _id: '65e355eb6c7591e9d9cd6dff',
//     title: 'Extracto doble de Melena de Leon',
//     image: '/img/Hericium_white.png',
//     description: 'Extractos de Hericium Erinaceus',
//     categoryId: 'extracts',
//     stock: 20,
//     price: 35000,
//     size: '30 ml',
//     itemId: 'hericium-erinaceus'
//   },
// {
//   "id": "1",
//   "amount": 1,
//   "idCart": "MELENA DE LEON1",
//   "icon": {},
//   "type": "Cápsulas",
//   "src": {},
//   "price": 6000,
//   "iconSrc": {},
//   "title": "MELENA DE LEON",
//   "description": "Cuerpo fructífero de hongos y micelio de Hericium erinaceus.",
//   "ingredient": "Hericium erinaceus"
// }
const adaptedData = data.map(product => {
  return {
    id: product._id,
    amount: product.stock,
    idCart: product._id,
    type: product.categoryId === 'extracts' ? 'Extractos' : 'Cápsulas',
    price: product.price,
    iconSrc: cartItems[0].iconSrc,
    title: product.title,
    description: product.description,
    ingredient: product.itemId.replace(/-/g, ' ').replace(/\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
  };
})









  
  return (
    <FullModal>
      <ModalWrapper>
        {!cartItems?.length ? (
          <ContentWrapper src={bgModal} style={{ alignItems: 'center' }}>
            <ModalTitle>{'¡tu canasta esta vacía!'.toUpperCase()}</ModalTitle>
            <BuyButton onClick={() => setShowCart(false)}>
              {'volver a comprar'.toUpperCase()}
            </BuyButton>
          </ContentWrapper>
        ) : (
          <ContentWrapper src={bgModal}>
            <>
              <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              <ListItemsWrapper>
                {adaptedData.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              </ListItemsWrapper>
              <ListItemsWrapper>
                {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              </ListItemsWrapper>
              <button onClick={() => setShowCart(false)}>Close</button>
            </>
            <>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm />
            </>
          </ContentWrapper>
        )}
      </ModalWrapper>
    </FullModal>
)}

export default Modal