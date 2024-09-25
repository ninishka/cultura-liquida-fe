import React, { useState, useContext } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
import { AirtableContext } from '@/app/contexts/airtableContext/airtableContext'
import { formDataSet } from '@/app/data'
import {
  FormItself,
  FormField,
  FormWrapper,
  FormGrid,
  ErrorMessage,
  WrapForErrorAndLabel
} from './styled'

// TODO: hover suggestion window is staying in one place when scrolling down 
const ModalForm = () => {
  const { handleUpdate } = useContext(AirtableContext); // WARNING // updating DB
    const { cartItems, setShowModal } = useContext(CartContext)
    const [errors, setErrors] = useState({});
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
      notes: '',
      agree: false
    });
  
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

    const validate = () => {
      const newErrors = {};
  
      // TODO: reduce duplicate - we have same values in formDataSet
      const fields = ['name', 'surnames', 'documentNumber', 'telephone', 'email', 'department', 'cityMunicipality', 'shippingAddress',  'agree'];
  
      fields.forEach(field => {
        if (field === 'agree' && !formData[field]) {
          newErrors[field] = "You must agree to the terms and conditions.";
        } else if (!formData[field].trim()) {
          newErrors[field] = "This field is required.";
        }
      });
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleBlur = e => {
      validateField(e.target.name, e.target.value);
    };

    const handleChange = e => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      // if (validate()) {
      //   console.log("Form data submitted:", formData);
      // }

      handleUpdate(cartItems) // WARNING // updating DB
    };

    return (
      <FormWrapper>
        <FormItself onSubmit={handleSubmit} noValidate>
          {/* <FormGrid>
            {formDataSet
              .filter(({ type }) => type !== 'checkbox') 
              .map(({ label, name, type, options = [] }) => (
                <FormField key={name}>
                  <WrapForErrorAndLabel>
                    <label htmlFor={name}>{label} *</label>
                    {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
                  </WrapForErrorAndLabel>
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
                </FormField>
              ))}
            <FormField>
              <label htmlFor="notes" style={{color:'black' }}>Notas (opcional)</label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
              />
            </FormField>
            {formDataSet
              .filter(({ type }) => type === 'checkbox')
              .map(({ label, name }) => (
                <FormField key={name}>
                  <WrapForErrorAndLabel>
                    <label htmlFor={name}>{label} *</label>
                    {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
                  </WrapForErrorAndLabel>
                  <input
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </FormField>
              ))}
          </FormGrid> */}
          <button type="submit">Submit</button>
        </FormItself>
      </FormWrapper>
    );  
  };

  export default ModalForm