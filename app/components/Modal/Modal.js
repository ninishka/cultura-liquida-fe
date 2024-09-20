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
  const { cartItems, setShowModal } = useContext(CartContext)

  return (
    <FullModal>
      {!cartItems?.length ? (
          <ModalWrapper>
            <ContentWrapper setShowModal={setShowModal} src={bgModal} style={{ alignItems: 'center' }}>
              <ModalTitle>{'¡tu canasta esta vacía!'.toUpperCase()}</ModalTitle>
              <BuyButton onClick={() => setShowModal(false)}>
                {'volver a comprar'.toUpperCase()}
              </BuyButton>
            </ContentWrapper>
          </ModalWrapper>
      ) : (
        <ModalWrapper>
          <ContentWrapper setShowModal={setShowModal} src={bgModal}>
            <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              <ListItemsWrapper>
                {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              </ListItemsWrapper>
              <button onClick={() => setShowModal(false)}>Close</button>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
            <ModalForm />
          </ContentWrapper>
        </ModalWrapper>
      )}
    </FullModal>
)}

export default Modal