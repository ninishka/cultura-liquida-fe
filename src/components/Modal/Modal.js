import React, { Fragment, useState, useContext } from 'react'
import { DataContext } from '../../App.js'
import Counter from '../Counter/Counter'
import {
  ModalWrapper,
  ContentWrapper,
  ModalTitle,
  FullModal,
  CartItem,
  CartItemWrap,
  CartImg,
  TextWrapper,
  Title,
  Description,
  FormField,
  FormWrapper,
  FormGrid,
  ErrorMessage,
  DeleteButtonWrap,
  DeleteButtonItself,
  DeleteButtonIcon
} from './styled'

import img6 from '../../assets/icons/delete_good_from_cart.png'


// TODO: hover suggestion window is staying in one place when scrolling down 
const ModalForm = () => {
  const departments = [
    { label: "departments 1", value: "option1" },
    { label: "departments 2", value: "option2" },
  ];

  const municipalities = [
    { label: "municipalities 1", value: "option11" },
    { label: "municipalities 2", value: "option22" },
  ];

  // TODO: need to use formData API ?
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

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const validators = {
      name: /^[A-Za-z\s]+$/,
      surnames: /^[A-Za-z\s]+$/,
      telephone: /^\d+$/,
      documentNumber: /^\d+$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    if (!value.trim()) {
      newErrors[name] = "This field is required.";
    } else if (validators[name] && !validators[name].test(value)) {
      newErrors[name] = {
        name: "Name must contain only letters and spaces.",
        surnames: "Surname must contain only letters and spaces.",
        telephone: "Telephone must contain only numbers.",
        documentNumber: "Document number must contain only numbers.",
        email: "Invalid email address."
      }[name];
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const dataSet = [
    { label: 'Nombre', name: 'name', type: 'text' },
    { label: 'Apellidos', name: 'surnames', type: 'text' },
    { label: 'Tipo documento', name: 'documentType', type: 'select', options: [
        { label: 'ID', value: 'ID' },
        { label: 'Passport', value: 'Passport' },
        { label: 'Driver\'s License', value: 'Driver\'s License' }
      ]
    },
    { label: 'Número de documento', name: 'documentNumber', type: 'text' },
    { label: 'Dirección de envío', name: 'shippingAddress', type: 'textarea' },
    { label: 'Departamento', name: 'department', type: 'select', options: departments },
    { label: 'Ciudad / Municipio', name: 'cityMunicipality', type: 'select', options: municipalities },
    { label: 'Celular / Teléfono', name: 'telephone', type: 'tel' },
    { label: 'Correo electrónico', name: 'email', type: 'email' },
    { label: 'Notas (opcional)', name: 'notes', type: 'textarea' }
  ];

  const validate = () => {
    const newErrors = {};

    // TODO: reduce duplicate - we have same values in dataSet
    const fields = ['name', 'surnames', 'documentNumber', 'telephone', 'email', 'department', 'cityMunicipality', 'shippingAddress'];

    fields.forEach(field => {
      if (!formData[field].trim()) newErrors[field] = "This field is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data submitted:", formData);
    }
  };




  return (
    <FormWrapper>
      <form onSubmit={handleSubmit} noValidate>
        <FormGrid>
          {dataSet.map(({ label, name, type, options = [] }) => (
            <FormField key={name}>
                <label htmlFor={name}>{label} *</label>
                {type === 'select' ? (
                  <select
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">Select</option>
                    {options.map(({ label, value }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                )}
                {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
            </FormField>
          ))}
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

// <> </> read about fragment
// <Fragment> </Fragment> read about fragment
// and know the differents


const Modal = ({ showModal, setShowModal  }) => {
  const { count, setCount, choosedGood } = useContext(DataContext)
  const [displayingItem, setDisplayingItem] = useState('1')
    
  return (
    <FullModal showModal={showModal} displayingItem={displayingItem}>
      <ModalWrapper>
        <ContentWrapper  setDisplayingItem={setDisplayingItem} setShowModal={setShowModal} >
          <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
                {choosedGood.map(({src, iconSrc, title, description, text}) => (
                    <CartItemWrap key={text}>
                      <CartItem>
                        <CartImg src={iconSrc}/>
                        <TextWrapper>
                          <Title>{title.toUpperCase()}</Title>
                          <Description>{description}</Description>
                        </TextWrapper>
                        <p style={{color: 'red'}}>{text}</p>
                        <Counter count={999999} setCount={setCount} isModal />
                      </CartItem>
                      <DeleteButtonWrap>
                        <DeleteButtonItself>
                          <DeleteButtonIcon src={img6} />
                        </DeleteButtonItself>
                      </DeleteButtonWrap>
                    </CartItemWrap>
                ))}
            {/* <button onClick={() => setShowModal(false)}>Close</button> */}
            <ModalTitle>
              {'Detalles de facturación'.toUpperCase()}
            </ModalTitle>
            <ModalForm />
        </ContentWrapper>
      </ModalWrapper>
    </FullModal>
)}


export default Modal