import React, { FC, useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { 
  states,
  cities,
  nameSurnameValidator,
  IdNumberValidator,
  phoneNumberValidator
} from './formHelpers'

import {
  StyledInput,
  StyledSelect,
  StyledFormItem,
  StyledTextarea
} from './styled'

export interface ModalFormFieldsProps {
  isOrder?: boolean;
  notes?: string;
  form?: {
    setFieldValue: Function
  };
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
}

const documentOptions = [
  { label: 'CC', value: 'cc' },
  { label: 'CE', value: 'ce' },
  { label: 'NIT', value: 'nit' },
  { label: 'Pasaporte', value: 'passport' },
  { label: 'Otro', value: 'other' },
]

const ModalFormFields: FC<ModalFormFieldsProps> = ({ isOrder, notes, selectedDepartment, onDepartmentChange }) => (
  <>
    <StyledFormItem
      label="Nombres"
      name="name"
      $isOrder={isOrder}
      rules={nameSurnameValidator}
    >
      <StyledInput disabled={isOrder} />
    </StyledFormItem>
    
    <StyledFormItem
      label="Apellidos"
      name="surname"
      $isOrder={isOrder}
      rules={nameSurnameValidator}
    >
      <StyledInput disabled={isOrder} />
    </StyledFormItem>
    
    <StyledFormItem
      label="Tipo de documento"
      name="document_type"
      $isOrder={isOrder}
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        disabled={isOrder}
        $isOrder={isOrder}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={documentOptions}
      />
    </StyledFormItem>
    
    <StyledFormItem
      label="Número de documento"
      name="id_number"
      $isOrder={isOrder}
      rules={IdNumberValidator}
    >
      <StyledInput disabled={isOrder} />
    </StyledFormItem>
    
    <StyledFormItem
      label="País"
      name="country"
      $isOrder={isOrder}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        suffixIcon={<></>}
        options={[{ value: 'colombia', label: 'Colombia' }]}
        $isOrder={isOrder}
        disabled
      />
    </StyledFormItem>
    
    <StyledFormItem
      label="Dirección de envío"
      name="address"
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

    <StyledFormItem
      label="Departamento"
      name="state"
      $isOrder={isOrder}
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        showSearch
        onChange={(v: string) => onDepartmentChange(v)}
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}       
        options={states}
        disabled={isOrder}
        $isOrder={isOrder}
      />

    </StyledFormItem>
    
    <StyledFormItem
      label="Ciudad / Municipio"
      name="city"
      $isOrder={isOrder}
      rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
    >
      <StyledSelect
        placeholder="Elige una opción..."
        showSearch
        suffixIcon={<CaretDownOutlined style={{fontSize:'20px', color:'black'}} />}
        options={cities(selectedDepartment)}
        disabled={isOrder || !selectedDepartment}
        $isOrder={isOrder}  
      />

    </StyledFormItem>
    
    <StyledFormItem
      label="Celular / Teléfono"
      name="phone"
      $isOrder={isOrder}
      rules={phoneNumberValidator}
    >
      <StyledInput disabled={isOrder} />
    </StyledFormItem>

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

  </>
);

export default ModalFormFields
