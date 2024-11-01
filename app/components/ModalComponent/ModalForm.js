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
    {/* Nombre*/}
    <StyledFormItem
      label="Nombre"
      name="name"
      rules={nameSurnameValidator}
    >
      <StyledInput />
    </StyledFormItem>
    {/* Apellidos*/}
    <StyledFormItem
      label="Apellidos"
      name="surname"
      rules={nameSurnameValidator}
    >
      <StyledInput />
    </StyledFormItem>
    {/* Tipo documento select*/}
    <StyledFormItem
      label="Tipo documento"
      name="documentTipe"
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Please select"
        onChange={handleChange}
        allowClear 
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />
    </StyledFormItem>
    {/* Número de documento*/}
    <StyledFormItem
      label="Número de documento"
      name="DocumentNumber"
      rules={[
        {
          required: true,
          message: 'Por favor, ingrese un número de identificación.',
        },
        {
          validator: (rule, value) => {
            const numberRegex = /^\d*$/;

            if (!numberRegex.test(value)) {
              return Promise.reject(
                new Error('Solo se permiten números enteros sin decimales.')
              );
            }

            return Promise.resolve();
          },
        }
      ]}
    >
      <StyledInput />
    </StyledFormItem>
    {/*text in between*/}
    <StyledFormItem>
      <div style={{marginLeft:'10px'}}>
        <h4 style={{fontWeight:'400'}}>País *</h4>
        <h4 style={{fontWeight:'400'}}>Colombia</h4>
      </div>
    </StyledFormItem>
    {/* Departamento select*/}
    <StyledFormItem
      label="Departamento"
      name="Department"
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Please select"
        onChange={handleChange}
        allowClear 
        style={{borderRadius: '16px'}}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}       
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />

    </StyledFormItem>
    {/* Dirección de envío*/}
    <StyledFormItem
      label="Dirección de envío"
      name="MailingAddress"
      rules={[
        {
          required: true,
          message: '¡Necesario!',
        },
      ]}
    >
      <StyledInput />
    </StyledFormItem>
    {/*Celular / Teléfono */}
    <StyledFormItem
      label="Celular / Teléfono *"
      name="phoneNumber"
      rules={[
        {
          required: true,
          message: 'Por favor, ingrese un número de teléfono.',
        },
        {
          validator: (rule, value) => {
            const numberRegex = /^\d*$/;

            if (!numberRegex.test(value)) {
              return Promise.reject(
                new Error('Solo se permiten números enteros sin decimales.')
              );
            }

            return Promise.resolve();
          },
        }
      ]}
    >
      <StyledInput />
    </StyledFormItem>
    {/* Ciudad / Municipio * select*/}
    <StyledFormItem
      label="Ciudad / Municipio *"
      name="CityMunicipality"
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        onChange={handleChange}
        allowClear 
        style={{borderRadius: '16px'}}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />

    </StyledFormItem>
    {/* EMAIL */}
    <StyledFormItem
      label="Correo electrónico"
      name="email"
      rules={[
        { 
          required: true, 
          message: 'Por favor, ingresa un correo electrónico válido.' 
        },
        {
          type: 'email',
          message: 'Por favor, introduce un formato de dirección de correo electrónico válida.'
        }
      ]}
    >
      <StyledInput />
    </StyledFormItem>
    {/* textarea */}
    <StyledFormItem style={{ width: '100%', marginTop: 15, borderRadius: '16px'}}
      label="Notas (opcional)"
      name="notes">
      <StyledInput.TextArea   
        autoSize={{
        minRows: 2,
        maxRows: 6,
        }} 
      style={{ borderRadius: '16px'}} />
    </StyledFormItem>
    {/* checkbox */}
    <StyledFormItem      
      name="remember" 
      valuePropName="checked"
      rules={[
        {
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('Debes aceptar los términos y condiciones');
            }
            return Promise.resolve();
          },
        },
      ]}
      wrapperCol={{
        // offset: 8,
        // span: 16,
      }}
      style={{ width: '100%'}}
    >
      <Checkbox >
        Tus datos personales serán usados ​​para procesar tu pedido, mejorar tu experiencia en nuestra tienda, y para otros propósitos descritos en nuestra politica de privacidad.
      </Checkbox>
    </StyledFormItem>

      <TotalBox>
        <TotalWrap>
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
        </TotalWrap>
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
