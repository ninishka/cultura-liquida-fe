import React, { useState } from 'react'
// import { formDataSet } from '@/app/data'
import { Field, Form, Formik, FormikProps, useFormik} from 'formik';
import CartContext from '@/app/contexts/cartContext/cartContext'
import validationSchema from './validationSchema';
import { AirtableContext } from '@/app/contexts/airtableContext/airtableContext'
import {
  FormItself,
  FormField,
  FormGrid,
  ErrorMessage,
  WrapForErrorAndLabel,
  BelowSelectText
} from './styled'


const ModalForm = () => { 
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
      validationSchema,
      onSubmit: values => {
        alert(JSON.stringify(values, null, 2));
      },
    });
    const [selectedValue, setSelectedValue] = useState('');
    const documentType = ['CC', 'Option 2', 'Option 3'];
    const department = ['Elige una opción...', 'Option 2', 'Option 3','Option 4'];
    const cityMunicipality = ['Elige una opción...', 'Option 2', 'Option 3','Option 4','Option 5'];

    const handleChange = (event) => {
       if (validate()) {
           console.log("Form data submitted:", formData);
           }
    };
    return (
        <section>
          <FormGrid onSubmit={formik.handleSubmit} noValidate>
    {/* NAME */}        
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="name">Nombre *</label>
                {formik.touched.name && formik.errors.name ? 
                <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...formik.getFieldProps('name')}
                  />
            </FormField>
    {/* SURNAMES */}        
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="surnames">Apellidos *</label>
                {formik.touched.surnames && formik.errors.surnames ? 
                <ErrorMessage>{formik.errors.surnames}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="surnames"
                    name="surnames"
                    type="text"
                    {...formik.getFieldProps('surnames')}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.surnames}
                  />
            </FormField>
    {/* SELECT documentType */}  
           <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="documentType">Tipo documento *</label>
                {formik.touched.documentType && formik.errors.documentType ? 
                <ErrorMessage>{formik.errors.documentType}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <select 
                    type="select"
                    value={selectedValue.documentType} 
                    onChange={handleChange}
                    name="documentType"
                  >
                   {documentType.map((documentType, index) => (
                     <option key={index} value={documentType}>{documentType}</option>
                    ))} 
                  </select>
                  <div style={{marginLeft:'20px'}}>
                    <BelowSelectText>djddnin *</BelowSelectText>
                    <BelowSelectText>djddnin *</BelowSelectText>
                  </div>
            </FormField>           
    {/* DOCUMENT NUMBER */}        
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="documentNumber">Número de documento *</label>
                {formik.touched.documentNumber && formik.errors.documentNumber ? 
                <ErrorMessage>{formik.errors.documentNumber}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="documentNumber"
                    name="documentNumber"
                    type={"number"}
                    {...formik.getFieldProps('documentNumber')}
                  />
            </FormField>
    {/* ADDRESS */}
            <FormField >
              <WrapForErrorAndLabel>
                <label htmlFor="shippingAddress">Dirección de envío *</label>
                {formik.touched.shippingAddress && formik.errors.shippingAddress ? 
                <ErrorMessage>{formik.errors.shippingAddress}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="shippingAddress"
                    name="shippingAddress"
                    type="address"
                    {...formik.getFieldProps('shippingAddress')}
                  />
            </FormField>
    {/* SELECT DEPARTMENT */}
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="department">Ciudad / Municipio *</label>
                {formik.touched.department && formik.errors.department ? 
                <ErrorMessage>{formik.errors.department}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <select 
                    type="select"
                    value={selectedValue.department} 
                    onChange={handleChange}
                    name="department"
                  >
                   {department.map((department, index) => (
                     <option key={index} value={department}>{department}</option>
                    ))} 
                  </select>
            </FormField>  
   {/* SELECT cityMunicipality */}   
             <FormField style={{marginTop:'0px'}}>
              <WrapForErrorAndLabel>
                <label htmlFor="cityMunicipality">Ciudad / Municipio *</label>
                {formik.touched.cityMunicipality && formik.errors.cityMunicipality ? 
                <ErrorMessage>{formik.errors.cityMunicipality}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <select 
                    type="select"
                    value={selectedValue.cityMunicipality} 
                    onChange={handleChange}
                    name="documentType"
                  >
                   {cityMunicipality.map((cityMunicipality, index) => (
                     <option key={index} value={cityMunicipality}>{cityMunicipality}</option>
                    ))} 
                  </select>
            </FormField>  
    {/* TELEPHONE */}
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="telephone">Dirección de envío *</label>
                {formik.touched.telephone && formik.errors.telephone ? 
                <ErrorMessage>{formik.errors.surnames}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="telephone"
                    name="telephone"
                    type="number"
                    {...formik.getFieldProps('telephone')}
                  />
            </FormField>
    {/* EMAIL */}
            <FormField>
              <WrapForErrorAndLabel>
                <label htmlFor="email" >Correo electrónico *</label>
                {formik.touched.email && formik.errors.email ? 
                <ErrorMessage>{formik.errors.email}</ErrorMessage> : null}
              </WrapForErrorAndLabel>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                  />
            </FormField>
          </FormGrid>
      {/* NOTES */}
            <FormField>
              <label htmlFor="notes">Notas (opcional)</label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    {...formik.getFieldProps('notes')}
                  />
            </FormField>
            <button type="submit">Submit</button>
        </section>
      
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