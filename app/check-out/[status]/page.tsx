'use client'
import React, { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { Space, Form } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { useGetOrderQuery } from "@/lib/redux/slices/orderApi";
import CartItemComponent from '@/app/components/ModalComponent/CartItemComponent'
import ModalForm from '@/app/components/ModalComponent/ModalForm'
import { ListItemsWrapper, ModalTitle } from '@/app/components/ModalComponent/styled'
import { totalSumStyledByDot } from '@/app/components/helpers'
import {
  StyledLink,
  TitleH1,
  CheckoutWrapper,
  CheckoutWrapperContent,
  RightPanel,
  StatusPanel,
  MPinfoItemsWrapper,
  MPinfoItem,
  SubtotalText,
  PriceTextBox,
  ScrolableZone
} from './styled'




// На этой странице должно быть:
// - инфа о номере заказа и его содержимом.
// - дата, сумма, метод оплаты
// - инфа о покупателе что он сам ввел
// - данные о платеже что тебе вернет система ////////


// http://localhost:3000/check-out/success?collection_id=1328920339&collection_status=approved&payment_id=1328920339&status=approved&external_reference=null&payment_type=prepaid_card&merchant_order_id=26126457150&preference_id=1700322474-4de302ce-0947-4ae7-ad7e-776efece53a3&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
// collection_id: 1328778667
// collection_status: approved
// payment_id: 1328778667
// status: approved   
// payment_type: prepaid_card
// merchant_order_id: 25920426760
// preference_id: 1700322474-0c961e86-e450-4eb7-ab35-0c93834e5ba0
// site_id: MCO
// processing_mode: aggregator
// merchant_account_id: null
 
const keysFromMP = ['collection_id', 'collection_status', 'payment_id', 'status', 'payment_type',
  'merchant_order_id', 'preference_id', 'site_id', 'processing_mode', 'merchant_account_id']


const CheckoutPage: FC = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useGetOrderQuery('mockedUserId');
  const userId = 'mockedUserId'

  useEffect(() => {
    console.log('useEffect')
      const fetchData = async () => {
        try {
          const mp_data = keysFromMP.reduce((acc, key) => {
            acc[key] = searchParams?.get(key) || "Not provided";
            return acc;
          }, {} as Record<string, string>);         
        
          const response = await fetch(`/api/orders`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              updatedData: {
                mp_data,
                status: mp_data?.status
              },
            }),
          });

          if (!response.ok) throw new Error(`Failed to update order: ${response.status}`);

          const updatedOrder = await response.json();
          console.log('Updated Order:', updatedOrder);
        } catch (error) {
          console.error('Error updating order:', error);
        }
      };
      
      // if data exist, but mp_data absent or status mismatched
      // PS I am not sure about status
      // TODO - need to check Buisness logic about status
      if (data && Array.isArray(data)) {
        const hasNoMercadoPagoData = !data.some((order) => order.mp_data);
        const isStatusMismatched = data[0]?.status !== data[0]?.mp_data?.status;
        
        if (hasNoMercadoPagoData || isStatusMismatched) {
          fetchData()
        }
      }
  }, [data]); 
  // searchParams is not dynamic, so no need to put it in dependencies



  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading orders: {error.message}</div>;

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: 'numeric',
      // minute: 'numeric',
      // second: 'numeric',
      // timeZoneName: 'short',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const displayTotal = totalSumStyledByDot(data?.[0]?.totalPrice, ' ')
  const beforeDelivery = totalSumStyledByDot(data?.[0]?.totalPrice - 15000, ' ')

  return (
    <div style={{ margin: 10 }}>
      <StyledLink href="/check-out" aria-label="Contacto en WhatsApp" style={{ marginTop: 10 }}>
        {/* <BacklinkS /> */}
        <p> ← volver a la página principal </p>
      </StyledLink>

      <div style={{display: 'flex', alignItems: 'center', marginTop: 70}}>
        <h2 style={{textTransform: 'uppercase', fontSize: 48, fontWeight: 500}}>Checkout</h2>
        <SyncOutlined style={{fontSize: 36, margin: '0 5px 10px'}}  />
      </div>
      <CheckoutWrapper>
        <CheckoutWrapperContent>
          <MPinfoItemsWrapper> 
            <MPinfoItem>
              <p>Numero de pedido: </p>
              {data?.[0]?.mp_data?.payment_id} 
            </MPinfoItem>
            <MPinfoItem>
              <p>Fecha: </p>
              {formatDate(data?.[0]?.updatedAt)}
            </MPinfoItem>
            <MPinfoItem>
              <p>Total: </p>
              {displayTotal} cop
            </MPinfoItem>
            <MPinfoItem>
              <p>Metodos de pago: </p>
              {data?.[0]?.mp_data?.payment_type} 
            </MPinfoItem>

          </MPinfoItemsWrapper>
          <ScrolableZone>
            <ListItemsWrapper style={{ marginTop: 10}}>
              {data?.[0]?.products?.map(props => <CartItemComponent key={props?.id || ''} {...props} isOrder /> )}
            </ListItemsWrapper>
            <>
              <ModalTitle style={{ textAlign: 'start', color: 'white' }}>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm form={form} onFinish={async () => console.log('k')} loading={false} initialValues={data?.[0]?.form_data} isOrder />
            </>
          </ScrolableZone>
        </CheckoutWrapperContent>
        <RightPanel>
          <StatusPanel $status={searchParams?.get('status') === 'approved' && '#4FDB40'} />
          <div style={{ margin: 10 }}>
            <PriceTextBox>
              <SubtotalText>Subtotal: </SubtotalText>
              <SubtotalText>{beforeDelivery} cop</SubtotalText>
            </PriceTextBox>
            <PriceTextBox>
              <SubtotalText>Envio: </SubtotalText>
              <SubtotalText>15 000 cop</SubtotalText>
            </PriceTextBox>
            <PriceTextBox style={{ marginTop: 10 }}>
              <p style={{ fontSize: 48, margin: 0, color: '#4FDB40' }}>Total: </p>
              <p style={{ fontSize: 48, margin: 0, color: '#4FDB40' }}>{displayTotal} COP</p>
            </PriceTextBox>
          </div>
          
        </RightPanel>
      </CheckoutWrapper>
    </div>
  );
}

export default CheckoutPage


  {/* {Object.entries(params).map(([key, value]) => (
    <p key={key}>
      {key}: {value}
    </p>
  ))} */}