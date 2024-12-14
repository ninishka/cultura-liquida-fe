'use client'
import React, { FC, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/store/hooks'
import { Button, Space, Form } from 'antd';
import CartItemComponent from '@/app/components/ModalComponent/CartItemComponent'
import ModalForm from '@/app/components/ModalComponent/ModalForm'
import TotalBoxComponent from '@/app/components/ModalComponent/TotalBox'
import { useGetOrderQuery } from "@/lib/redux/slices/orderApi";

import {
  SyncOutlined,
} from '@ant-design/icons';



import {
  StyledLink,
  TitleH1,
  CheckoutWrapper,
  CheckoutWrapperContent,
  RightPanel,
  StatusPanel,
  MPinfoItemsWrapper,
  MPinfoItem
} from './styled'

import {
  ListItemsWrapper,
  ModalTitle,
} from '@/app/components/ModalComponent/styled'



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

  const pathname = usePathname()
  const searchParams = useSearchParams();
  const { showCart, cartItems } = useAppSelector(state => state.cart);

  const params = keysFromMP.reduce((acc, key) => {
    acc[key] = searchParams?.get(key) || "Not provided";
    return acc;
  }, {} as Record<string, string>);

  console.log('params', params)
  const userId = 'mockedUserId'

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/orders`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              updatedData: {
                mp_data: params,
              },
            }),
          });

          if (response.ok) {
            const updatedOrder = await response.json();
            console.log('Updated Order:', updatedOrder);
          } else {
            console.error('Error updating order:', response.status);
          }
        } catch (error) {
          console.error('Error updating order:', error);
        }
      };

      fetchData();
  }, []);


    const { data, isLoading, error } = useGetOrderQuery('mockedUserId');
  console.log('data', data)
  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div>
      <StyledLink href="/check-out" aria-label="Contacto en WhatsApp">
        {/* <BacklinkS /> */}
        <p> volver a la página principal </p>
      </StyledLink>

      <Space>
      <TitleH1 style={{textTransform: 'uppercase'}}>Checkout</TitleH1>
       {/* <Button> */}
         <SyncOutlined  />
       {/* </Button> */}
      </Space>
      <CheckoutWrapper>
        <CheckoutWrapperContent>
          <MPinfoItemsWrapper> 
            <MPinfoItem>
              <p>Numero de pedido: </p>
              {data?.[0]?.mp_data?.payment_id} 
            </MPinfoItem>
            <MPinfoItem>
              <p>Fecha: </p>
              {data?.[0]?.updatedAt}
            </MPinfoItem>
            <MPinfoItem>
              <p>Total: </p>
              {data?.[0]?.totalPrice} cop
            </MPinfoItem>
            <MPinfoItem>
              <p>Metodos de pago: </p>
              {data?.[0]?.mp_data?.payment_type} 
            </MPinfoItem>

          </MPinfoItemsWrapper>
          <div>
          <>
              <ModalTitle>{'Tu carrito de la compra '.toUpperCase()}</ModalTitle>
              <ListItemsWrapper>
                {cartItems.map(props => <CartItemComponent key={props?.id || ''} {...props} /> )}
              </ListItemsWrapper>
            </>
            <>
              <ModalTitle>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm form={form} onFinish={async () => console.log('k')} loading={false} isOrder />
            </>
          </div>
        </CheckoutWrapperContent>
        <RightPanel>
          <StatusPanel />
          <TotalBoxComponent />
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