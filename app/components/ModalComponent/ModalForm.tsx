import React, { FC } from 'react';
import { Radio } from 'antd'
import { FormInstance } from 'antd'
import ModalFormFields from './ModalFormFields'
import {
  StyledForm,
  StyledFormItem,
  TotalBox,
  TotalWrap,
  LeftSideWrap,
  Comprar
} from './styled'
interface ModalFormProps {
  form: FormInstance<any>;
  onFinish: (values: any) => Promise<void>;
}

const ModalForm: FC<ModalFormProps> = ({ onFinish }) => { 
  return (
    <StyledForm 
      onFinish={onFinish} 
      onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
    >
      <ModalFormFields />
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
            <Comprar htmltype="submit">
              {'Comprar'.toUpperCase()}
            </Comprar>
        </StyledFormItem>
      </TotalBox>
    </StyledForm>
  );
};

export default ModalForm
