'use client'

import React, { FC, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link';
import { Radio, Tooltip, Button } from 'antd'
import { formatPrice } from '@/helpers/formats'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import TransferBox from '@/app/components/ModalComponent/FormComponent/TransferBox'
import approvedIcon from '@/app/icons/icon_paid_true.svg'
import pendingIcon from '@/app/icons/icon_paid_error.svg'
import falseIcon from '@/app/icons/icon_paid_false.svg'
import { shippingCost } from '@/helpers/constants'
import { fetcher } from '@/helpers/network'
import { handlePayment } from '@/helpers/data';

import { useAppSelector, useAppDispatch } from '@/lib/redux/store/hooks'
import { toggleSetMercado } from '@/lib/redux/slices/cartSlice'

import {
  RightPanel,
  StatusPanel,
  SubtotalText,
  PriceTextBoxCheckout,
} from './styled'
import { StyledForm, StyledFormItem } from '@/app/components/ModalComponent/FormComponent/styled'
import { CartPayButton } from '@/app/components/ModalComponent/styled'


interface RightPanelInterface {
  [key: string]: any; // TODO
}

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

const RightPanelComponent: FC<RightPanelInterface> = ({ data, respStatus, refetch }) => {
  const [form] = StyledForm.useForm()
  const router = useRouter()
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id')
  const { isMercadoInit } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch()
  
  const [preferenceId, setPreferenceId] = useState('') //mp
  const [paymentOption, setPaymentOption] = useState('')
  const [showBuyButton, setShowBuyButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [initializing, setInitializing] = useState(true)
  
  const walletContainerRef = useRef(null);
  const switchingRef = useRef(false); // Для отслеживания быстрых переключений
  
  // Установка начального способа оплаты из данных заказа
  useEffect(() => {
    if (!data) return;
    
    const paymentMethod = data?.form_data?.payment_method;
    setPaymentOption(paymentMethod);
    
    if (paymentMethod === 'mercado') {
      // Если Mercado Pago выбран, инициализируем SDK
      if (!isMercadoInit && typeof window !== 'undefined') {
        // console.log('Инициализация SDK Mercado Pago');
        dispatch(toggleSetMercado(true));
        initMercadoPago(process.env.PUBLIC_KEY_BTN || '');
      }
      
      // Если заказ еще не оплачен и мы инициализируемся
      if (respStatus !== 'approved' && initializing) {
        // Запускаем процесс получения preferenceId
        setProcessingPayment(true);
        handleMercadoPayment();
        setInitializing(false);
      }
    }
  }, [data, initializing]);
  // 107:6 TODO  Warning: React Hook useEffect has missing dependencies: 'dispatch', 'handleMercadoPayment', 'isMercadoInit', and 'respStatus'. Either include them or remove the dependency array.  react-hooks/exhaustive-deps

  // Отображаем Wallet при получении preferenceId
  useEffect(() => {
    if (preferenceId && paymentOption === 'mercado') {
      // Небольшая задержка для гарантии корректного отображения
      setTimeout(() => {
        setShowWallet(true);
      }, 300);
    }
  }, [preferenceId, paymentOption]);
  
  // Функция для инициализации Mercado Pago, если необходимо
  const initMercadoIfNeeded = () => {
    if (!isMercadoInit && typeof window !== 'undefined') {
      // console.log('Инициализация SDK Mercado Pago');
      dispatch(toggleSetMercado(true));
      initMercadoPago(process.env.PUBLIC_KEY_BTN || '');
    }
  };

  // Обработчик переключения метода оплаты
  const changePaymentOptionHandler = type => {
    if (type === paymentOption || loading) return;
    
    // Сбрасываем состояние загрузки
    setLoading(false);
    setProcessingPayment(false);
    
    // Устанавливаем флаг переключения и скрываем wallet
    switchingRef.current = true;
    setShowWallet(false);
    
    // Используем более безопасный подход: сначала обновим состояние
    // затем очистим preferenceId, что вызовет перемонтирование компонента
    setTimeout(() => {
      // Обновляем состояние UI
      setShowBuyButton(data?.form_data?.payment_method !== type);
      setPaymentOption(type);
      setPreferenceId(''); // Сбрасываем preferenceId
      
      if (type === 'mercado') {
        initMercadoIfNeeded();
      }
      
      // Сбрасываем флаг переключения через небольшую задержку
      setTimeout(() => {
        switchingRef.current = false;
      }, 300);
    }, 100);
  }

  const updateOrderPaymentMethod = async () => {
    await fetcher('PUT', `/api/orders?orderId=${orderIdParam}`, bodyToUpdate, 'update order payment method')
  }

  const handleMercadoPayment = async () => {
    // Если уже идет процесс обработки, не запускаем новый
    if (processingPayment && !initializing) return;
    
    setProcessingPayment(true);
    setShowWallet(false);
    
    try {
      // Инициализируем Mercado Pago если необходимо
      initMercadoIfNeeded();
      
      // Сначала сбрасываем preferenceId, чтобы гарантировать размонтирование Wallet
      setPreferenceId('');
      
      // Короткая задержка перед получением нового preferenceId
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Получаем preferenceId через API
      const result = await handlePayment(data, data?.products, data?.form_data, 'mercado', router, setPreferenceId);
      // console.log('Получен preferenceId:', result);
      
      // Показываем Wallet после получения preferenceId
      // Дополнительная проверка, что не произошло переключение в процессе
      if (!switchingRef.current && paymentOption === 'mercado') {
        setTimeout(() => {
          setShowWallet(true);
        }, 300);
      }
    } catch (error) {
      console.error('Error in Mercado Pago payment:', error);
      
      // В случае ошибки показываем кнопку снова
      if (paymentOption === 'mercado') {
        setShowBuyButton(true);
      }
    } finally {
      setProcessingPayment(false);
    }
  }

  const handleChangePayment = async () => {
    if (paymentOption === 'transfer') {
      setLoading(false);
      setShowBuyButton(false);
      refetch();
      return;
    }
    
    if (paymentOption === 'mercado') {
      await handleMercadoPayment();
      refetch();
    }
    
    setLoading(false);
    setShowBuyButton(false);
  }

  const onFinish = () => {
    if (data && typeof data === 'object') {
      setLoading(true);
      
      if (data?.form_data?.payment_method !== paymentOption) {
        updateOrderPaymentMethod();
        handleChangePayment();
      } else if (paymentOption === 'mercado') {
        // Если метод оплаты уже Mercado Pago, просто получаем preferenceId
        handleMercadoPayment();
      }
    }
  };

  // in_process - is for MP payment status BUT pending - is for order record status
  const isPending = (respStatus === 'in_process' || respStatus === 'pending')
  const coloring = (respStatus === 'approved' && '#4FDB40') || (isPending && '#F2C94C') 
  const iconing = (respStatus === 'approved' && approvedIcon) || (isPending && pendingIcon) || falseIcon 
  const wording = (respStatus === 'approved' && 'pagado') || (isPending && 'pendiente') || 'no pagado'

  const beforeDelivery = formatPrice(data?.totalCost - shippingCost, ' ')
  const displayTotal = formatPrice(data?.totalCost, ' ')
  const displayShippingCost = formatPrice(shippingCost, ' ')

  const bodyToUpdate = JSON.stringify({
    orderId: orderIdParam,
    updatedData: {
      form_data: {
        ...data?.form_data,
        payment_method: paymentOption
      },
    },
  })

  // Проверка, показывать ли Wallet или кнопку получения preferenceId
  const displayWallet = paymentOption === 'mercado' && !showBuyButton && preferenceId;
  const displayComprarButton = paymentOption === 'mercado' && !showBuyButton && !preferenceId;

  return (
    <RightPanel>
      <Tooltip
        title={
          (respStatus !== 'approved' && paymentOption === 'transfer') ? (
            <div style={{ textAlign: 'center'}}>
              Por favor, asegúrese de haber enviado el comprobante de pago al correo electrónico{' '}
              <Link style={{ color: '#F2C94C'}} href="mailto:culturaliquidacol@gmail.com">
                culturaliquidacol@gmail.com
              </Link>
            </div>
          ) : (
          ''
          )
        }
      >
        <StatusPanel $status={coloring}>
          <div style={{display: 'flex', padding: 27}}>
            <Image
              sizes="100vw"
              src={iconing}
              alt="El pago fue exitoso"
              width={40}
              height={40}
            />
            <div style={{margin: '0 15px'}}>
              <p style={{margin: 0, fontWeight: 400}}>Estado de pago:</p>
              <p style={{margin: 0, fontWeight: 700}}>{wording}</p>
            </div>
          </div>
        </StatusPanel>
      </Tooltip>

      <div style={{ margin: 15 }}>
        <PriceTextBoxCheckout>
          <SubtotalText>Subtotal: </SubtotalText>
          <SubtotalText>{beforeDelivery}</SubtotalText>
        </PriceTextBoxCheckout>
        <PriceTextBoxCheckout>
          <SubtotalText>Envío: </SubtotalText>
          <SubtotalText>{displayShippingCost}</SubtotalText>
        </PriceTextBoxCheckout>
        <PriceTextBoxCheckout style={{ marginTop: 10 }}>
          <p style={{ fontSize: 36, margin: 0, color: '#4FDB40' }}>TOTAL: </p>
          <p style={{ fontSize: 36, margin: '0 0 0 15px', color: '#4FDB40' }}>{displayTotal} COP</p>
        </PriceTextBoxCheckout>
      </div>

      <div style={{ margin: 15 }}>
        {respStatus !== 'approved' && 
          <>
            <p style={{ margin: '20px 0 0', fontSize: '18px'}}>Paga ahora o elige otro método de pago:</p>
            <StyledForm form={form} onFinish={onFinish} initialValues={{ payment_method: data?.form_data?.payment_method }}>
              <StyledFormItem
                name="payment_method"
                style={{ width: '100%', padding: 0, margin: '5px 0'}}
              >
                <Radio.Group 
                  style={{ display: 'flex', flexDirection: 'column', color: 'white'}}
                  onChange={(e) => changePaymentOptionHandler(e.target.value)}
                  value={paymentOption}
                >
                  <Radio value="mercado" style={{ color: 'white' }}> Mercado Pago </Radio>
                  <Radio value="transfer" style={{ color: 'white' }}> Transferencia a cuenta bancaria </Radio>
                </Radio.Group>
              </StyledFormItem>
              {showBuyButton && (
                <CartPayButton 
                  htmlType="submit" 
                  loading={loading}
                >
                  Comprar
                </CartPayButton>
              )}
            </StyledForm>
            
            {/* Стандартная кнопка для получения preferenceId, если его нет */}
            {displayComprarButton && (
              <CartPayButton 
                onClick={handleMercadoPayment} 
                loading={processingPayment}
                style={{ marginTop: '10px' }}
              >
                Comprar
              </CartPayButton>
            )}
            
            {/* Контейнер для Wallet компонента Mercado Pago */}
            {displayWallet && (
              <div 
                ref={walletContainerRef} 
                style={{ 
                  minHeight: '80px', 
                  marginTop: '15px', 
                  position: 'relative' 
                }}
              >
                {showWallet && preferenceId && (
                  <ControlledWallet 
                    preferenceId={preferenceId} 
                    walletContainerRef={walletContainerRef} 
                  />
                )}
              </div>
            )}
            
            {(paymentOption === 'transfer' && !showBuyButton) && <TransferBox isOrder />}
          </>
        }
      </div>
    </RightPanel>
  );
}

export default RightPanelComponent

