import React, { useState, useContext } from 'react'
import { DataContext } from '../../App.js'
import Counter from '../Counter/Counter'
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
  CartItemsWrap,
  CountAndAmountWrap,
  CartItem,
  CartImg,
  TextWrapper,
  Title,
  Description,
  FormField,
  FormWrapper,
  FormGrid
} from './styled'



const ModalForm = () => {
  const departments = [
    { label: "departments 1", value: "option1" },
    { label: "departments 2", value: "option2" },
  ];

  const municipalities = [
    { label: "municipalities 1", value: "option11" },
    { label: "municipalities 2", value: "option22" },
  ];
  return (
    <FormWrapper>
      <form>
        <FormGrid>
        <FormField>
            <label htmlFor="name">Nombre *</label>
            <input type="text" id="name" name="name" required />
          </FormField>
          <FormField>
            <label htmlFor="surnames">Apellidos *</label>
            <input type="text" id="surnames" name="surnames" required />
          </FormField>
          <FormField>
            <label htmlFor="documentType">Tipo documento *</label>
            <select id="documentType" name="documentType" required>
              <option value="">Select</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
            </select>
          </FormField>
          <FormField>
            <label htmlFor="name">Nombre *</label>
            <input type="text" id="name" name="name" required />
          </FormField>
          <FormField>
            <label htmlFor="surnames">Apellidos *</label>
            <input type="text" id="surnames" name="surnames" required />
          </FormField>
          <FormField>
            <label htmlFor="documentType">Tipo documento *</label>
            <select id="documentType" name="documentType" required>
              <option value="">Select</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
            </select>
          </FormField>


          <FormField>
            <label htmlFor="name">Nombre *</label>
            <input type="text" id="name" name="name" required />
          </FormField>
          <FormField>
            <label htmlFor="surnames">Apellidos *</label>
            <input type="text" id="surnames" name="surnames" required />
          </FormField>
          <FormField>
            <label htmlFor="documentType">Tipo documento *</label>
            <select id="documentType" name="documentType" required>
              <option value="">Select</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
            </select>
          </FormField>
          <FormField>
            <label htmlFor="documentNumber">Número de documento *</label>
            <input type="text" id="documentNumber" name="documentNumber" required />
          </FormField>
          <FormField>
            <label htmlFor="shippingAddress">Dirección de envío *</label>
            <textarea id="shippingAddress" name="shippingAddress" rows="3" required />
          </FormField>
          <FormField>
            <label htmlFor="department">Departamento *</label>
            <select id="department" name="department" required>
              <option value="">Select</option>
              {departments.map(({label}) => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
          </FormField>
          <FormField>
            <label htmlFor="cityMunicipality">Ciudad / Municipio *</label>
            <select id="cityMunicipality" name="cityMunicipality" required>
              <option value="">Select</option>
              {municipalities.map(({label}) => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
          </FormField>
          <FormField>
            <label htmlFor="telephone">Celular / Teléfono *</label>
            <input type="tel" id="telephone" name="telephone" required />
          </FormField>
          <FormField>
            <label htmlFor="email">Correo electrónico *</label>
            <input type="email" id="email" name="email" required />
          </FormField>
          <FormField>
            <label htmlFor="notes">Notas (opcional)</label>
            <textarea id="notes" name="notes" rows="4" />
          </FormField>
          <button type="submit">Submit</button>
        </FormGrid>
      </form>
    </FormWrapper>
)}


const Modal = ({ showModal, setShowModal  }) => {
  const { count, setCount, choosedGood } = useContext(DataContext)
  const [displayingItem, setDisplayingItem] = useState('1')
    
  return (
    <FullModal showModal={showModal} displayingItem={displayingItem}>
      <ModalWrapper>
        <ContentWrapper  setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} >
          <ModalTitle>Tu carrito de la compra</ModalTitle>
                {choosedGood.map(({src, iconSrc, title, description, text}) => (
                  <CartItem key={text}>
                    <CartImg src={iconSrc}/>
                    <TextWrapper>
                      <Title>{title.toUpperCase()}</Title>
                      <Description>{description}</Description>
                    </TextWrapper>
                    <CountAndAmountWrap>
                      <p style={{color: 'red'}}>{text}</p>
                      <Counter count={count} setCount={setCount} isModal />
                    </CountAndAmountWrap>
                  </CartItem>
                ))}
            <button onClick={() => setShowModal(false)}>Close</button>
            <ModalForm />
        </ContentWrapper>
      </ModalWrapper>
    </FullModal>
)}


export default Modal