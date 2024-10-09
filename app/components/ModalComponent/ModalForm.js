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
      <TotalBox>
        {/* <TotalWrap>
          <LeftSideWrap>
            <p style={{ color: 'white', fontSize: 48, margin: 0}}>Total:</p>
            <p style={{ color: '#4FDB40', fontSize: 36, margin: 0}}>420.000 COP</p>
          </LeftSideWrap>  
          <StyledFormItem 
            label={<p style={{ color: '#F2C94C'}}>Seleccione un método de pago:</p>} 
            // style={{ width: '33%'}}
          >
            <Radio.Group style={{ display: 'flex', flexDirection: 'column', color: 'white'}}>
              <Radio value="apple" style={{ color: 'white'}} > Mercado Pago </Radio>
              <Radio value="pear" style={{ color: 'white'}}> Mercado Pago - Tarjeta de Crédito, PSE y otros medios de pago </Radio>
              <Radio value="pear2" style={{ color: 'white'}}> Transferencia a cuenta Bancolombia </Radio>
            </Radio.Group>
          </StyledFormItem>
        </TotalWrap> */}
        <StyledFormItem style={{width: '100%'}}>
          <Comprar type="primary" htmltype="submit">
            {'Comprar'.toUpperCase()}
          </Comprar>
        </StyledFormItem>
      </TotalBox>
    </StyledForm>
  );
};

export default ModalForm
