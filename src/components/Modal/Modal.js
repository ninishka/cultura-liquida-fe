import React, { useContext } from 'react'
import CartContext from '../../contexts/cartContext/cartContext'
import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
} from './styled'

const Modal = ({ showModal, setShowModal  }) => {
  const { cartItems } = useContext(CartContext)

  return (
    <FullModal showModal={showModal}>
      <ModalWrapper>
        <ContentWrapper setShowModal={setShowModal} >
          <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
            {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
            <button onClick={() => setShowModal(false)}>Close</button>
            <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
            <ModalForm />
        </ContentWrapper>
      </ModalWrapper>
    </FullModal>
)}

export default Modal