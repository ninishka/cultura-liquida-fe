import { object, string, number, boolean, required, max, test, regex } from 'yup';

const validationSchema = object({
  name: string()
    .required('Necesario')
    .max(15, 'Must be 15 characters or less')
    .test('name-format', 'Must contain only letters', (value) => {
      const regex = /^[A-Za-z]+$/;
      return regex.test(value);
    }),
  surnames: string()
    .required('Necesario')
    .max(20, 'Must be 20 characters or less')
    .test('surname-format', 'Must contain only letters and spaces', (value) => {
      const regex = /^[A-Za-z\s]+$/i;
      return regex.test(value);
    }),

  documentType: string()
    .required('Necesario'),
    
  // TODO: ALL NUMBER INPUTS CAN TYPE ONLY NUMBERS BUT ALSO 'e' LETTER
  documentNumber: number()
    .required('Necesario')
    .typeError('Please enter only numbers'), 
  shippingAddress: string(),
  department: string()
  .required('Necesario')
  .max(50, 'Must be 50 characters or less'),
  cityMunicipality: string()
  .required('Necesario'),
  telephone: number()
  .required('Necesario')
  .typeError('Please enter only numbers'),
  email: string()
    .email('Invalid email address')
    .required('Necesario'),
  notes: string(),
  agree: boolean()
    .isTrue('You must agree to the terms'),
});

export default validationSchema;