import React, { useState, useContext, values, setValues } from 'react'
// import { formDataSet } from '@/app/data'
import { Field, Form, Formik, FormikProps, useFormik} from 'formik';
import CartContext from '@/app/contexts/cartContext/cartContext'
import { AirtableContext } from '@/app/contexts/airtableContext/airtableContext'
// import * as Yup from 'yup';
import {
  FormItself,
  FormField,
  FormWrapper,
  FormGrid,
  ErrorMessage,
  WrapForErrorAndLabel
} from './styled'

    ///////// validation

    const validate = values => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Required';
      } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less';
      } else if (!/^[A-Za-z]+$/.test(values)) {
        errors.name = 'Must contain only letters';
      }
    

      if (!values.surnames) {
        errors.surnames = 'Required';
      } else if (values.surnames.length > 20) {
        errors.surnames = 'Must be 20 characters or less';
      } else if (!/^[A-Za-z\s]+$/.test(values.surnames)) {
        errors.surnames = 'Must contain only letters and spaces';
      }
      

      
      if (!values.documentNumber) {
        errors.documentNumber = 'Required';
      } else if (!/^\d+$/.test(values)) {
        return 'Please enter only numbers';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    
      return errors;
    };





// TODO: hover suggestion window is staying in one place when scrolling down 
const ModalForm = () => {
//    const [values, setValues] = React.useState({});
 
//  const handleChange = event => {
//    setValues(prevValues => ({
//      ...prevValues,
//      // we use the name to tell Formik which key of `values` to update
//      [event.target.name]: event.target.value
//    }));
//  }
    const formik = useFormik({
      initialValues: {
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
        agree: false,
      },
      validate,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });


    
    return (
        <FormWrapper>
          <FormGrid onSubmit={formik.handleSubmit} noValidate>
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="name">Nombre *</label>
                {formik.errors.name ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
              
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
            </FormField>
            
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="surnames">Apellidos *</label>
                {formik.errors.surnames ? <ErrorMessage>{formik.errors.surnames}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="surnames"
                    name="surnames"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.surnames}
                  />
            </FormField>
              
              {/* <div>
                <label htmlFor="department"></label>
                  <input
                    id="department"
                    name="department"
                    type="department"
                    onChange={formik.handleChange}
                    value={formik.values.shippingAddress}
                  />
              </div> */}
            
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="documentNumber">Número de documento *</label>
                {formik.errors.documentNumber ? <ErrorMessage>{formik.errors.documentNumber}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="documentNumber"
                    name="documentNumber"
                    type={"number"}
                    onChange={formik.handleChange}
                    value={formik.values.documentNumber}
                  />
            </FormField>

            <FormField >
              <WrapForErrorAndLabel>
                <label htmlFor="shippingAddress">Dirección de envío *</label>
                {formik.errors.surnames ? <ErrorMessage>{formik.errors.surnames}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="shippingAddress"
                    name="shippingAddress"
                    type="address"
                    onChange={formik.handleChange}
                    value={formik.values.shippingAddress}
                  />
            </FormField>
          

            {/* <label htmlFor="department"></label>
                <input
                  id="department"
                  name="department"
                  type="department"
                  onChange={formik.handleChange}
                  value={formik.values.shippingAddress}
                /> */}

            {/* <label htmlFor="shippingAddress">Dirección de envío *</label>
                <input
                  id="shippingAddress"
                  name="shippingAddress"
                  type="address"
                  onChange={formik.handleChange}
                  value={formik.values.shippingAddress}
                /> */}

            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="telephone">Dirección de envío *</label>
                {formik.errors.surnames ? <ErrorMessage>{formik.errors.surnames}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="telephone"
                    name="telephone"
                    type="number"
                    placeholder="Enter phone number"
                    onChange={formik.handleChange}
                    value={formik.values.telephone}
                  />
            </FormField>

            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="email" >Correo electrónico *</label>
                {formik.errors.email ? <ErrorMessage>{formik.errors.email}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
            </FormField>
            
            <FormField>
              <label htmlFor="notes">Notas (opcional)</label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.notes}
                  />
            </FormField>
            <button type="submit">Submit</button>
          </FormGrid>
        </FormWrapper>
      
  );
  };

  export default ModalForm

































      // const { handleUpdate } = useContext(AirtableContext); // WARNING // updating DB
    // const { cartItems, setShowModal } = useContext(CartContext)
    // const [errors, setErrors] = useState({});
    // TODO: need to use formData API ?

 
    // const handleChange = e => {
    //   const { name, value, type, checked } = e.target;
    //   setFormData({
    //     ...formData,
    //     [name]: type === 'checkbox' ? checked : value
    //   });
    // };
  
    // const handleSubmit = e => {
    //   e.preventDefault();
    //   // if (validate()) {
    //   //   console.log("Form data submitted:", formData);
    //   // }

    //   handleUpdate(cartItems) // WARNING // updating DB
    // };


  //   const MyInput = ({ field, form, ...props }) => {
  //     return <input {...field} {...props} />;
  //   };
    
  //   const formik = useFormik({
  //     initialValues: {
  //       name: '',
  //       surnames: '',
  //       documentType: '',
  //       documentNumber: '',
  //       shippingAddress: '',
  //       department: '',
  //       cityMunicipality: '',
  //       telephone: '',
  //       email: '',
  //       notes: '',
  //       agree: false,
  //      },
  //     onSubmit: values => {
  //       console.log('values', values)
  //     },
  //     onReset: values => {

  //       console.log('onReset')
  //     }
  //   });


  //   return (
  //     <FormWrapper>
  //       <Form  onSubmit={formik.handleSubmit}>
  //         <label htmlFor="name">Nombre *</label>
  //           <input
  //            id="name"
  //            name="name"
  //            type="text"
  //            onChange={formik.handleChange}
  //            value={formik.values.name}
  //           />
  //         <label htmlFor="surnames">Apellidos *</label>
  //           <input
  //             id="surnames"
  //             name="surnames"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.surnames}
  //           />
  //         <label htmlFor="documentType">Apellidos *</label>
  //           <input
  //             id="documentType"
  //             name="documentType"
  //             type="text"
  //             onChange={formik.handleChange}
  //             value={formik.values.surnames}
  //           />
  //         <label htmlFor="documentType">documentNumber *</label>
  //           <input
  //             id="documentNumber"
  //             name="documentNumber"
  //             type="number"
  //             onChange={formik.handleChange}
  //             value={formik.values.documentNumber}
  //           />
  //         {/* <FormGrid>
  //           {formDataSet
  //             .filter(({ type }) => type !== 'checkbox') 
  //             .map(({ label, name, type, options = [] }) => (
  //               <FormField key={name}>
  //                 <WrapForErrorAndLabel>
  //                   <label htmlFor={name}>{label} *</label>
  //                   {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
  //                 </WrapForErrorAndLabel>
  //                 {type === 'select' ? (
  //                   <select
  //                     id={name}
  //                     name={name}
  //                     value={formData[name]}
  //                     onChange={handleChange}
  //                     onBlur={handleBlur}
  //                     required
  //                   >
  //                     <option value="">Select</option>
  //                     {options.map(({ label, value }) => (
  //                       <option key={value} value={value}>{label}</option>
  //                     ))}
  //                   </select>
  //                 ) : (
  //                   <input
  //                     type={type}
  //                     id={name}
  //                     name={name}
  //                     value={formData[name]}
  //                     onChange={handleChange}
  //                     onBlur={handleBlur}
  //                     required
  //                   />
  //                 )}
  //               </FormField>
  //             ))}
  //           <FormField>
  //             <label htmlFor="notes" style={{color:'black' }}>Notas (opcional)</label>
  //             <textarea
  //               id="notes"
  //               name="notes"
  //               rows="4"
  //               value={formData.notes}
  //               onChange={handleChange}
  //             />
  //           </FormField>
  //           {formDataSet
  //             .filter(({ type }) => type === 'checkbox')
  //             .map(({ label, name }) => (
  //               <FormField key={name}>
  //                 <WrapForErrorAndLabel>
  //                   <label htmlFor={name}>{label} *</label>
  //                   {errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
  //                 </WrapForErrorAndLabel>
  //                 <input
  //                   type="checkbox"
  //                   id={name}
  //                   name={name}
  //                   checked={formData[name]}
  //                   onChange={handleChange}
  //                   onBlur={handleBlur}
  //                   required
  //                 />
  //               </FormField>
  //             ))}
  //         </FormGrid> */}
  //         {/* <button type="submit">Submit</button> */}
  //         <button type="reset">Reset</button>
  //       </Form>
  //     </FormWrapper>
  //   );  