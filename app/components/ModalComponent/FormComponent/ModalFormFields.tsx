import React, { FC, useState } from 'react';
import { Checkbox } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons';
import {
  StyledInput,
  StyledSelect,
  StyledFormItem,
  CheckboxInput,
  StyledTextarea
} from './styled'
import  {  Country ,  State ,  City  }   from  'country-state-city' ; 
import { nameSurnameValidator } from '../../helpers'
// console.log( Country.getCountryByCode('CO') ) 
// console.log( State.getStatesOfCountry('CO') ) 
// console . log ( State . getAllStates ( ) )

const states = State.getStatesOfCountry('CO')?.map(({name, isoCode}) => ({
  value: isoCode,
  label: name
}))

  
const cities = (x?: string) => City.getCitiesOfState('CO', x)?.map(({name}) => ({
  value: name,
  label: name
})); // now if state and cityes choosen and u change state - we need to clear choosen city

export interface ModalFormFieldsProps {
  isOrder?: boolean;
  notes?: string
}

const ModalFormFields: FC<ModalFormFieldsProps> = ({ isOrder, notes }) => { 
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  return (
    <>
      {/* Nombres*/}
      <StyledFormItem
        label="Nombres"
        name="name"
        $isOrder={isOrder}
        rules={nameSurnameValidator}
      >
        <StyledInput disabled={isOrder} />
      </StyledFormItem>
      {/* Apellidos*/}
      <StyledFormItem
        label="Apellidos"
        name="surname"
        $isOrder={isOrder}
        rules={nameSurnameValidator}
      >
        <StyledInput disabled={isOrder} />
      </StyledFormItem>
      {/* Tipo de documento select*/}
      <StyledFormItem
        label="Tipo de documento"
        name="document_type"
        $isOrder={isOrder}
        rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
      >
        <StyledSelect
          placeholder="Elige una opción..."
          // onChange={(v: any) => setSelectedDocumento(v)}
          allowClear
          disabled={isOrder}
          $isOrder={isOrder}
          suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
          options={[
            { label: 'CC', value: 'cc' },
            { label: 'CE', value: 'ce' },
            { label: 'NIT', value: 'nit' },
            { label: 'Pasaporte', value: 'passport' },
            { label: 'Otro', value: 'other' },
          ]}

        />
      </StyledFormItem>
      {/* Número de documento*/}
      <StyledFormItem
        label="Número de documento"
        name="id_number"
        $isOrder={isOrder}
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
        <StyledInput disabled={isOrder} />
      </StyledFormItem>
      {/*Country*/}
      <StyledFormItem
        label="País"
        name="country"
        $isOrder={isOrder}
      >
        <StyledSelect
          placeholder="Elige una opción..."
          suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
          options={[{ value: 'colombia', label: 'Colombia' }]}
          $isOrder={isOrder}
          disabled
        />
      </StyledFormItem>
      {/* Dirección de envío*/}
      <StyledFormItem
        label="Dirección de envío"
        name="mail_address"
        $isOrder={isOrder}
        rules={[
          {
            required: true,
            message: '¡Necesario!',
          },
        ]}
      >
        <StyledInput disabled={isOrder} />
      </StyledFormItem>
      {/* Departamento select*/}
      <StyledFormItem
        label="Departamento"
        name="state"
        $isOrder={isOrder}
        rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
      >
        <StyledSelect
          placeholder="Elige una opción..."
          onChange={(v: any) => setSelectedDepartment(v)}
          allowClear 
          suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}       
          options={states}
          disabled={isOrder}
          $isOrder={isOrder}
        />

      </StyledFormItem>
      {/* Ciudad / Municipio * select*/}
      <StyledFormItem
        label="Ciudad / Municipio"
        name="city"
        $isOrder={isOrder}
        rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
      >
        <StyledSelect
          placeholder="Elige una opción..."
          allowClear 
          suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
          options={cities(selectedDepartment)}
          disabled={isOrder || !selectedDepartment}
          $isOrder={isOrder}  
        />

      </StyledFormItem>
      {/*Celular / Teléfono */}
      <StyledFormItem
        label="Celular / Teléfono"
        name="phone_number"
        $isOrder={isOrder}
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

              if (cleanedValue.length < 10 || cleanedValue.length > 12) {
                console.log('if')
                // valid variands: 
                // 3107217798
                // 03107217798
                // +573107217798
                // + 573107217798
                // + 57 310 7217 798
                // + 57-310-7217-798
                return Promise.reject(
                  new Error('El número de identificación debe tener entre 10 y 12 caracteres.')
                );
              }

              return Promise.resolve();
            },
          }
        ]}
      >
        <StyledInput disabled={isOrder} />
      </StyledFormItem>

      {/* EMAIL */}
      <StyledFormItem
        label="Correo electrónico"
        name="email"
        $isOrder={isOrder}
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
        <StyledInput disabled={isOrder} />
      </StyledFormItem>
      {/* textarea */}
      {(!isOrder || notes) && (
        <StyledFormItem style={{ width: '100%', marginTop: 15, borderRadius: '16px'}}
          label={`Notas ${!isOrder ? '(opcional)' : ''}`}
          $isOrder={isOrder}
          name="notes"
        >
          <StyledTextarea   
            style={{ borderRadius: '16px'}}
            disabled={isOrder}
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }} 
          />
        </StyledFormItem>
      )}
      {/* checkbox */}
      {!isOrder && (
        <StyledFormItem      
          name="remember" 
          valuePropName="checked"
          style={{ width: '100%'}}
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
        >
          <CheckboxInput>
            Tus datos personales serán usados ​​para procesar tu pedido, mejorar tu experiencia en nuestra tienda, y para otros propósitos descritos en nuestra politica de privacidad.
          </CheckboxInput>
        </StyledFormItem>
      )}
    </>
  );
};

export default ModalFormFields
