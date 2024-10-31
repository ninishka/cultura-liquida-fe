import { Checkbox, Radio } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons';
import {
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledFormItem,
  TotalBox,
  TotalWrap,
  LeftSideWrap,
  Comprar
} from './styled'

const nameSurnameValidator = [
  {
    required: true,
    message: 'Este campo es obligatorio',
  },
  {
    // allows only letters and spaces
    validator: (rule, value) => { 
      const letterAndSpaceRegex = /^[a-zA-Z\s]+$/;
      
      if (!letterAndSpaceRegex.test(value)) {
        return Promise.reject(
          new Error('Solo se permiten letras y espacios.')
        );
      }
      
      
      return Promise.resolve();
    },
  },
]

const ModalForm = ({ onFinish }) => { 
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <StyledForm 
    onFinish={onFinish} 
    onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
  >
         <StyledFormItem style={{width: '100%'}}>
            <Comprar type="primary" htmltype="submit">
              {'Comprar'.toUpperCase()}
            </Comprar>
        </StyledFormItem>
    </StyledForm>
  );
};

export default ModalForm
