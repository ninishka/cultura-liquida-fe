import React, { FC, useState, useEffect, useRef } from 'react';
import { Radio, Tooltip, Button } from 'antd'
import { useAppSelector } from '@/lib/redux/store/hooks'
import ModalFormFields from './ModalFormFields'
import TransferBox from './TransferBox'
import type { ModalFormProps } from '@/types/types'
import { getProductCost, getTotalCost } from '@/helpers/pricing'
import { formatPrice } from '@/helpers/formats'
import { Wallet } from '@mercadopago/sdk-react'
import { shippingCost } from '@/helpers/constants'
import {
  termsAndCondidtionsValidator
} from './formHelpers'

import {
  StyledForm,
  StyledFormItem,
  LeftSideWrap,
  SubtotalText,
  PriceTextBox,
  CheckboxInput,
} from './styled'

import {
  TotalBox,
  TotalWrap,
  CartPayButton,
} from '../styled'

// Компонент-обертка для контроля над Mercado Pago Wallet
const ControlledWallet = ({ preferenceId, walletContainerRef }) => {
  const [render, setRender] = useState(false);
  const instanceKey = useRef(Date.now().toString());

  // Задержка для гарантии корректного рендеринга
  useEffect(() => {
    // Безопасная очистка контейнера - просто устанавливаем флаг рендеринга
    const timer = setTimeout(() => {
      setRender(true);
    }, 200);
    
    return () => {
      clearTimeout(timer);
      setRender(false);
    };
  }, [preferenceId]);

  if (!render) return null;

  return (
    <Wallet
      key={`mp-wallet-${instanceKey.current}-${preferenceId}`}
      initialization={{ preferenceId: preferenceId }}
      customization={{ texts:{ valueProp: 'smart_option'}}} 
    />
  );
};

// TODO: Add PSE, PayU, ePayco
// Debit, credit
// Allow crypto?

const ModalForm: FC<ModalFormProps> = ({ 
  onFinish, loading, initialValues, isOrder, paymentOption,
  setPaymentOption, preferenceId, shouldShowBuyButton
}) => {
  const [form] = StyledForm.useForm()
  const { cartItems } = useAppSelector(state => state.cart);
  const [isAgree, setIsAgree] = useState(false);
  const [isTransfer, setTransfer] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [localPreferenceId, setLocalPreferenceId] = useState(preferenceId);
  
  const walletContainerRef = useRef(null);
  const switchingRef = useRef(false);

  const productCost = getProductCost(cartItems);
  // const shippingCost = getShippingCost(productCost)
  const totalCost = getTotalCost(cartItems);

  const styledTotalCost = formatPrice(totalCost)
  const displayProductCost = formatPrice(productCost, ' ')
  const displayShippingCost = formatPrice(shippingCost, ' ')

  // Инициализация при монтировании компонента
  useEffect(() => {
    // Устанавливаем initialValues в форму, если они предоставлены
    if (initialValues) {
      form.setFieldsValue(initialValues);
      
      // Если начальный метод оплаты - mercado, устанавливаем соответствующее состояние
      if (initialValues.payment_method === 'mercado') {
        setTransfer(false);
      } else if (initialValues.payment_method === 'transfer') {
        setTransfer(true);
      }
    }
    
    setInitialized(true);
  }, []);

  // Обработка новых preferenceId из пропсов
  useEffect(() => {
    if (preferenceId) {
      setLocalPreferenceId(preferenceId);
    }
  }, [preferenceId]);

  // Обработка начального состояния и автоматического получения preferenceId
  useEffect(() => {
    // Автоматически запускаем onFinish только если:
    // 1. Выбран Mercado Pago
    // 2. Еще нет preferenceId
    // 3. Не показывается кнопка "Comprar"
    // 4. Не идет загрузка
    // 5. Пользователь согласился с условиями (для новых заказов)
    // 6. Компонент полностью инициализирован
    if (paymentOption === 'mercado' && !preferenceId && !shouldShowBuyButton && !loading && 
        (isAgree || isOrder) && initialized && !switchingRef.current) {
      // Получаем текущие значения формы для передачи в onFinish
      const formValues = form.getFieldsValue();
      onFinish(formValues);
    }
  }, [paymentOption, preferenceId, shouldShowBuyButton, isAgree, isOrder, initialized]);

  // Отображаем Wallet когда получили preferenceId
  useEffect(() => {
    if (localPreferenceId && paymentOption === 'mercado') {
      // Небольшая задержка для избежания конфликтов
      if (!switchingRef.current) {
        setTimeout(() => {
          setShowWallet(true);
        }, 300);
      }
    } else {
      setShowWallet(false);
    }
  }, [localPreferenceId, paymentOption]);

  const handleChange = (type) => {
    if (type === paymentOption || loading) return;
    
    // Устанавливаем флаг переключения и скрываем текущий wallet
    switchingRef.current = true;
    setShowWallet(false);
    
    // Сбрасываем localPreferenceId, чтобы гарантировать размонтирование компонента
    setLocalPreferenceId('');
    
    // Сбрасываем состояние загрузки
    form.setFieldsValue({ payment_method: type });
    
    // Обновляем состояние с небольшой задержкой
    setTimeout(() => {
      setPaymentOption(type);
      
      if (type === 'transfer') setTransfer(true)
      else setTransfer(false);
      
      // Сбрасываем флаг переключения через небольшую задержку
      setTimeout(() => {
        switchingRef.current = false;
      }, 300);
    }, 100);
  }

  // Проверка, следует ли показывать стандартную кнопку Comprar
  const showComprarButton = shouldShowBuyButton || isTransfer || (paymentOption === 'mercado' && !localPreferenceId);
  
  // Проверка, следует ли показывать Wallet
  const showMercadoWallet = !shouldShowBuyButton && paymentOption === 'mercado' && localPreferenceId;

  return (
    <StyledForm 
      form={form}
      onFinish={onFinish} 
      initialValues={initialValues}
      onFinishFailed={(errorInfo) => console.log('Form failed:', errorInfo)}
    >
      <ModalFormFields isOrder={isOrder} notes={initialValues?.notes || ''} form={form} />
      {!isOrder && (
        <StyledFormItem
          name="remember" 
          valuePropName="checked"
          style={{ width: '100%'}}
          rules={termsAndCondidtionsValidator}
        >
          <CheckboxInput onClick={() => setIsAgree(!isAgree)}>
            Tus datos personales serán usados para procesar tu pedido, mejorar tu experiencia en nuestra tienda, y para otros propósitos descritos en nuestra politica de privacidad.
          </CheckboxInput>
        </StyledFormItem>
      )}

      {!isOrder && (
        <TotalBox>
          <TotalWrap>
            <LeftSideWrap>
              <PriceTextBox>
                <SubtotalText>Subtotal: </SubtotalText>
                <SubtotalText>{displayProductCost}</SubtotalText>
              </PriceTextBox>
              <PriceTextBox>
                <SubtotalText>Envío: </SubtotalText>
                <SubtotalText>{displayShippingCost}</SubtotalText>
              </PriceTextBox>
              <PriceTextBox style={{ marginTop: 10 }} $isTotal='total'>
                <p style={{ fontSize: 36, margin: 0, color: '#4FDB40' }}>TOTAL: </p>
                <p style={{ fontSize: 36, margin: '0 0 0 15px', color: '#4FDB40' }}>{styledTotalCost} COP</p>
              </PriceTextBox>
            </LeftSideWrap>
            <StyledFormItem
              label={<p style={{ color: '#F2C94C'}}>Seleccione un método de pago:</p>}
              name="payment_method"
            >
              <Radio.Group 
                style={{ display: 'flex', flexDirection: 'column', color: 'white'}}
                value={paymentOption}
                onChange={(e) => handleChange(e.target.value)}
              >
                <Radio value="mercado" style={{ color: 'white' }}> Mercado Pago </Radio>
                <Radio value="transfer" style={{ color: 'white' }}> Transferencia a cuenta bancaria </Radio>
              </Radio.Group>
            </StyledFormItem>
          </TotalWrap>
          {paymentOption === 'transfer' && <TransferBox />}
          <StyledFormItem style={{ width: '100%' }}>
            <Tooltip title={!paymentOption ? 'Por favor, elija el método de pago' : ''}>
              <>
                {/* Стандартная кнопка Comprar */}
                {showComprarButton && (
                  <CartPayButton htmlType="submit" loading={loading} disabled={!paymentOption || !isAgree}>
                    Comprar
                  </CartPayButton>
                )}
                
                {/* Контейнер для Wallet компонента Mercado Pago */}
                {showMercadoWallet && (
                  <div 
                    ref={walletContainerRef} 
                    style={{ 
                      minHeight: '80px', 
                      marginTop: '10px',
                      position: 'relative'
                    }}
                  >
                    {showWallet && localPreferenceId && (
                      <ControlledWallet 
                        preferenceId={localPreferenceId} 
                        walletContainerRef={walletContainerRef} 
                      />
                    )}
                  </div>
                )}
              </>
            </Tooltip>
          </StyledFormItem>
        </TotalBox>
      )}
    </StyledForm>
  );
};

export default ModalForm
