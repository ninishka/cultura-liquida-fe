import React, { useState, useContext } from 'react'
import { DataContext } from '../../App.js'
import CartItemComponent from './CartItemComponent'
import ModalForm from './ModalForm'
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
} from './styled'

const Modal = ({ showModal, setShowModal  }) => {
  const { choosedGood } = useContext(DataContext); // Assuming you have a way to update choosedGood
  const [displayingItem, setDisplayingItem] = useState('1');

  return (
    <FullModal showModal={showModal} displayingItem={displayingItem}>
      <ModalWrapper>
        <ContentWrapper  setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} >
          <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
            {choosedGood.map(props => <CartItemComponent key={props?.text} {...props} setShowModal={setShowModal} /> )}
            <button onClick={() => setShowModal(false)}>Close</button>
            <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
            <ModalForm />
        </ContentWrapper>
      </ModalWrapper>
    </FullModal>
)}

export default Modal