import React, { FC, useState } from 'react';
import { Checkbox, Radio } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd'
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
import  {  Country ,  State ,  City  }   from  'country-state-city' ; 
// console.log( Country.getCountryByCode('CO') ) 
// console.log( State.getStatesOfCountry('CO') ) 

// console . log ( State . getAllStates ( ) )

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

interface ModalFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => Promise<void>;
}

const ModalForm: FC<ModalFormProps> = ({ onFinish }) => { 
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  // const [selectedDocumento, setSelectedDocumento] = useState<string>('');

  // const handleChange = (value: any, x?: string) => {
  //   // console.log('value', value)
  //   if(x) setSelectedDepartment(value);
  // };
  const states = State.getStatesOfCountry('CO')?.map(({name, isoCode}) => ({
    value: isoCode,
    label: name
  }))
  
  const cities = (x?: string) => City.getCitiesOfState('CO', x)?.map(({name}) => ({
    value: name,
    label: name
  }));
  // now if state and cityes choosen 
  // and u change state - we need to clear choosen city

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
        // onChange={(v: any) => setSelectedDocumento(v)}
        allowClear 
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={[
          {
            value: 'id',
            label: 'ID',
          },
          {
            value: 'pasaporte',
            label: 'Pasaporte',
          },
          {
            value: 'licencia-de-conducir',
            label: 'Licencia de conducir',
          },
          // {
          //   value: 'disabled',
          //   label: 'Disabled',
          //   disabled: true,
          // },
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
          },
        }
      ]}
    >
      <StyledInput />
    </StyledFormItem>
    {/*Country*/}
    <StyledFormItem
      label="País"
      name="pais"
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        style={{borderRadius: '16px'}}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={[{ value: 'colombia', label: 'Colombia' }]}
        defaultValue="colombia"
        // disabled
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
    {/* Departamento select*/}
    <StyledFormItem
      label="Departamento"
      name="Department"
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Please select"
        onChange={(v: any) => setSelectedDepartment(v)}
        allowClear 
        style={{borderRadius: '16px'}}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}       
        options={states}
      />

    </StyledFormItem>
    {/* Ciudad / Municipio * select*/}
    <StyledFormItem
      label="Ciudad / Municipio"
      name="CityMunicipality"
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        // onChange={handleChange}
        allowClear 
        style={{borderRadius: '16px'}}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={cities(selectedDepartment)}
      />

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
            const cleanedValue = value.replace(/\s+/g, '') // remove spaces
            .replace(/[+\-]/g, '') // remove all + and -

            if (!/^\d*$/.test(cleanedValue)) {
              return Promise.reject(
                new Error('Solo se permiten números enteros sin decimales.')
              );
            }

            if (cleanedValue.length < 11 || cleanedValue.length > 12) {
              console.log('if')
              // valid variands: 
              // 03107217798
              // +573107217798
              // + 573107217798
              // + 57 310 7217 798
              // + 57-310-7217-798
              return Promise.reject(
                new Error('El número de identificación debe tener entre 11 y 12 caracteres.')
              );
            }

            return Promise.resolve();
          },
        }
      ]}
    >
      <StyledInput />
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
            <Comprar htmlType="submit">
              {'Comprar'.toUpperCase()}
            </Comprar>
        </StyledFormItem>
      </TotalBox>
    </StyledForm>
  );
};

export default ModalForm
