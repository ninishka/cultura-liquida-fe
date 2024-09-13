import React, { useContext } from 'react'
import CartContext from '../../contexts/cartContext/cartContext'
import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import h from '../../assets/icons/bgModal.png'
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
  BuyButton
} from './styled'

const Modal = ({ showModal, setShowModal  }) => {
  const { cartItems } = useContext(CartContext)

  return (
    <FullModal showModal={showModal}>
      {!cartItems?.length ? (
          <ModalWrapper>
            <ContentWrapper setShowModal={setShowModal} src={h}>
              <ModalTitle>{'¡tu canasta esta vacía!'.toUpperCase()}</ModalTitle>
              <BuyButton onClick={() => setShowModal(false)}>
                {'volver a comprar'.toUpperCase()}
              </BuyButton>
            </ContentWrapper>
          </ModalWrapper>
      ) : (
        <ModalWrapper>
          <ContentWrapper setShowModal={setShowModal} src={h}>
            <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              <button onClick={() => setShowModal(false)}>Close</button>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm />
          </ContentWrapper>
        </ModalWrapper>
      )}
    </FullModal>
)}

export default Modal