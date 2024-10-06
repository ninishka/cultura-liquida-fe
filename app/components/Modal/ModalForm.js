import React, { useState } from 'react'
import { Button, Checkbox, Radio} from 'antd'
import {
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledFormItem
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

const ModalForm = () => { 
    const [validated, setValidated] = useState(false)
    const [formValues, setFormValues] = useState({})

    const onFinish = (values) => {
      setFormValues({
        ...values,
        // street_name: `${values.state}, ${values.city}, ${values.street_name}, ${values.street_number}, ${values.surname}, ${values.state}`
      })
      setValidated(true)
    } 

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
        {/* Tipo documento*/}
        <StyledFormItem
          label="Tipo documento"
          name="select"
          rules={[{ required: true, message: '¡Por favor seleccione una opción!' }]}
        >
          <StyledSelect
            placeholder="Please select"
            onChange={handleChange}
            allowClear 
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
          name="id_number"
          rules={[
            {
              required: false,
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
        {/* Número de documento*/}
        <StyledFormItem
          label="Something"
          name="id_number"
          rules={[
            {
              required: false,
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
        {/* Departamento select*/}
        <StyledFormItem
          label="Departamento"
          name="select"
          rules={[{ required: false, message: 'Please select an option!' }]}
        >
          <StyledSelect
            placeholder="Please select"
            onChange={handleChange}
            allowClear 
            style={{borderRadius: '16px'}}
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
          name="street_name"
          rules={[
            {
              required: false,
              message: 'Required!',
            },
          ]}
        >
          <StyledInput />
        </StyledFormItem>
        <StyledFormItem
          label="Celular / Teléfono *"
          name="phone_number"
          rules={[
            {
              required: false,
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
          name="select"
          rules={[{ required: true, message: 'Please select an option!' }]}
        >
          <StyledSelect
            placeholder="Elige una opción..."
            onChange={handleChange}
            allowClear 
            style={{borderRadius: '16px'}}
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
        {/* TODO: remake */}
        <StyledFormItem 
            label="Correo electrónico"
            name="select"
            rules={[{ required: true, message: 'Please select an option!' }]}
          >
            <StyledSelect
              placeholder="Elige una opción..."
              onChange={handleChange}
              allowClear 
              style={{borderRadius: '16px'}}
              // for now just disapiering
              // suffixIcon={<Image src={arrowBottom} alt="Elige una opción..." />} // think about naming alt
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

        <StyledFormItem style={{ width: '100%', marginTop: 15, borderRadius: '16px'}}>
          <StyledInput.TextArea rows={4} style={{ borderRadius: '16px'}} />
        </StyledFormItem>

        <StyledFormItem      
          name="remember" // need to change
          valuePropName="checked"
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

        <div style={{width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#252525', borderRadius: 16, margin: '20px', padding: 5}}>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <p style={{ color: 'white', fontSize: 48, margin: 0}}>Total:</p>
            <p style={{ color: '#4FDB40', fontSize: 36, margin: 0}}>420.000 COP</p>
          </div>  
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
        </div>

        <StyledFormItem style={{width: '100%'}}>
            <Button type="primary" htmlType="submit" style={{width: '100%', backgroundColor: '#4FDB40', borderRadius: 16, fontWeight: 600}}>
              {'Comprar'.toUpperCase()}
            </Button>
          </StyledFormItem>
        </div>
      </StyledForm>
    );
  };

export default ModalForm
