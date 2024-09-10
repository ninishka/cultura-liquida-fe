import React, { useState, useContext } from 'react'
import { DataContext } from '../../App.js'
import Counter from '../Counter/Counter'
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
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

  const [formData, setFormData] = useState({
    name: '',
    surnames: '',
    documentType: '',
    documentNumber: '',
    shippingAddress: '',
    department: '',
    cityMunicipality: '',
    telephone: '',
    email: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.name)) newErrors.name = "Name must contain only letters and spaces.";
    if (!nameRegex.test(formData.surnames)) newErrors.surnames = "Surname must contain only letters and spaces.";
    if (!phoneRegex.test(formData.telephone)) newErrors.telephone = "Telephone must contain only numbers.";
    if (!phoneRegex.test(formData.documentNumber)) newErrors.documentNumber = "Document number must contain only numbers.";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} noValidate>
        <FormGrid>
          <FormField>
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
          </FormField>
          <FormField>
            <label htmlFor="surnames">Apellidos *</label>
            <input
              type="text"
              id="surnames"
              name="surnames"
              value={formData.surnames}
              onChange={handleChange}
              required
            />
            {errors.surnames && <p style={{color: 'red'}}>{errors.surnames}</p>}
          </FormField>
          <FormField>
            <label htmlFor="documentType">Tipo documento *</label>
            <select
              id="documentType"
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="ID">ID</option>
              <option value="Passport">Passport</option>
              <option value="Driver's License">Driver's License</option>
            </select>
          </FormField>
          <FormField>
            <label htmlFor="documentNumber">Número de documento *</label>
            <input
              type="text"
              id="documentNumber"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              required
            />
            {errors.documentNumber && <p style={{color: 'red'}}>{errors.documentNumber}</p>}
          </FormField>
          <FormField>
            <label htmlFor="shippingAddress">Dirección de envío *</label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              rows="3"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <label htmlFor="department">Departamento *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {departments.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </FormField>
          <FormField>
            <label htmlFor="cityMunicipality">Ciudad / Municipio *</label>
            <select
              id="cityMunicipality"
              name="cityMunicipality"
              value={formData.cityMunicipality}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {municipalities.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </FormField>
          <FormField>
            <label htmlFor="telephone">Celular / Teléfono *</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
            {errors.telephone && <p style={{color: 'red'}}>{errors.telephone}</p>}
          </FormField>
          <FormField>
            <label htmlFor="email">Correo electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
          </FormField>
          <button type="submit">Submit</button>
        </FormGrid>
        <FormField>
          <label htmlFor="notes">Notas (opcional)</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            value={formData.notes}
            onChange={handleChange}
          />
        </FormField>
      </form>
    </FormWrapper>
  );
};

const Modal = ({ showModal, setShowModal  }) => {
  const { count, setCount, choosedGood } = useContext(DataContext)
  const [displayingItem, setDisplayingItem] = useState('1')
    
  return (
    <FullModal showModal={showModal} displayingItem={displayingItem}>
      <ModalWrapper>
        <ContentWrapper  setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} >
          <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
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
            <ModalTitle>
              {'Detalles de facturación'.toUpperCase()}
            </ModalTitle>
            <ModalForm />
        </ContentWrapper>
      </ModalWrapper>
    </FullModal>
)}


export default Modal