import React, { useState, useContext } from 'react'
import CartContext from '@/app/contexts/cartContext/cartContext'
// import { formDataSet } from '@/app/data'
import { Field, Form, Formik, FormikProps, useFormik} from 'formik';
// import CartContext from '@/app/contexts/cartContext/cartContext'
// import validationSchema from './validationSchema';
// import { AirtableContext } from '@/app/contexts/airtableContext/airtableContext'
// import {
//   FormItself,
//   FormField,
//   FormGrid,
//   ErrorMessage,
//   WrapForErrorAndLabel,
//   BelowSelectText
// } from './styled'


const ModalForm = () => { 
  const { adaptedDataForBe, data } = useContext(CartContext)
  const [loading, setLoading] = useState(false);
  const { _id, stock, ...restOfValues } = data[0]
  const testPostObj = [{
    id: _id,
    amount: adaptedDataForBe[0].amount, 
    ...restOfValues, 
  }]

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`/api/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'update',
        cartItems: testPostObj,
      }),
    });
    
    const result = await response.json();
    console.log('Result:', result);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
      <form onSubmit={handleSubmit}>
        <button type='submit'>Submit</button>
      </form>
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