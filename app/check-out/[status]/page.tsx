'use client'
import React, { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import { Form } from 'antd';
import { useGetOrderQuery, useGetOrderByIdQuery } from "@/lib/redux/slices/orderApi";
import CartItemComponent from '@/app/components/ModalComponent/CartItemComponent'
import ModalForm from '@/app/components/ModalComponent/ModalForm'
import { totalSumStyledByDot } from '@/app/components/helpers'
import approvedIcon from '@/app/icons/icon_paid_true.svg'
import pendingIcon from '@/app/icons/icon_paid_error.svg'
import falseIcon from '@/app/icons/icon_paid_false.svg'
import { enivoPrice } from '@/app/components/helpers'
import { 
  ListItemsWrapper, 
  ModalTitle, 
  BankInfoBlockOrder,
  BankInfoText,
  BankInfoNumber
 } from '@/app/components/ModalComponent/styled'

import {
  StyledLink,
  TitleH1,
  CheckoutWrapper,
  CheckoutWrapperContent,
  RightPanel,
  StatusPanel,
  MPinfoItemsWrapper,
  SubtotalText,
  PriceTextBox,
  ScrolableZone,
  SyncOutlinedStyled,
  PageWrapper
} from './styled'
import { object } from 'yup';




// На этой странице должно быть:
// - инфа о номере заказа и его содержимом.
// - дата, сумма, метод оплаты
// - инфа о покупателе что он сам ввел
// - данные о платеже что тебе вернет система ////////


// http://localhost:3000/check-out/success?collection_id=1320658712&collection_status=approved&payment_id=1320658712&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=26357310094&preference_id=1700322474-82fa7b59-7f7e-4a8d-af3a-1b25fcf367ff&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
// collection_status: approved
// payment_id: 1328778667
// status: approved   
// payment_type: prepaid_card
// merchant_order_id: 25920426760
// preference_id: 1700322474-0c961e86-e450-4eb7-ab35-0c93834e5ba0
// site_id: MCO
// processing_mode: aggregator
// merchant_account_id: null

// s http://localhost:3000/check-out/success?collection_id=1320658712&collection_status=approved&payment_id=1320658712&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=26357310094&preference_id=1700322474-82fa7b59-7f7e-4a8d-af3a-1b25fcf367ff&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
// f http://localhost:3000/check-out/pending?collection_id=1329051277&collection_status=in_process&payment_id=1329051277&status=null&external_reference=null&payment_type=credit_card&merchant_order_id=26362077576&preference_id=1700322474-979af48d-fa96-4380-ad4a-6b5551ba674f&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
// p http://localhost:3000/check-out/pending?collection_id=1329051277&collection_status=in_process&payment_id=1329051277&status=in_process&external_reference=null&payment_type=credit_card&merchant_order_id=26362077576&preference_id=1700322474-979af48d-fa96-4380-ad4a-6b5551ba674f&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
 

const keysFromMP = ['collection_id', 'collection_status', 'payment_id', 'status', 'payment_type',
  'merchant_order_id', 'preference_id', 'site_id', 'processing_mode', 'merchant_account_id']

const CheckoutPage: FC = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();

  const userId = 'mockedUserId'
  const orderIdParam = searchParams?.get('order_id')
  const isMercado = searchParams?.get('payment_id')

  const { data, isLoading, error , refetch} = useGetOrderByIdQuery(orderIdParam || userId);
  // const { data, isLoading, error , refetch} = useGetOrderQuery(orderIdParam || userId); // that for old links abowe but data not flat - instead of data. need data.[0].

  const handleRefetch = () => {
    refetch()
  };

  useEffect(() => {
    console.log('useEffect')
    if (isMercado) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); 
  // searchParams is not dynamic, so no need to put it in dependencies

  if (isLoading) return <div>Loading order...<SyncOutlinedStyled isLoading={isLoading} /></div>;
  // if (error) return <div>Error loading orders: {error.message}</div>;

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const displayTotal = totalSumStyledByDot(data?.totalPrice, ' ')
  const beforeDelivery = totalSumStyledByDot(data?.totalPrice - enivoPrice, ' ')

  // const statusPayment = searchParams?.get('status')
  const coloring = (data.status === 'approved' && '#4FDB40') || (data.status === 'in_process' && '#F2C94C') 
  const iconing = (data.status === 'approved' && approvedIcon) || (data.status === 'in_process' && pendingIcon) || falseIcon 
  const wording = (data.status === 'approved' && 'pagado') || (data.status === 'in_process' && 'pendiente') || 'no pagado'

  return (
    <PageWrapper>
      <StyledLink href="/product/melena-de-leon-capsules" aria-label="Volver a la página principal" style={{ margin: '10px auto 0 15px' }}>
        <p> ← volver a la página principal </p>
      </StyledLink>

      <div style={{display: 'flex', alignItems: 'center', margin: '70px auto 0 15px'}}>
        <h2 style={{textTransform: 'uppercase', fontSize: 48, fontWeight: 500}}>Checkout</h2>
        <SyncOutlinedStyled onClick={handleRefetch} isLoading={isLoading} />
      </div>
      <CheckoutWrapper>
        <CheckoutWrapperContent>
          <ScrolableZone>
            <MPinfoItemsWrapper>
              <BankInfoBlockOrder>
                <BankInfoText>Numero de pedido:</BankInfoText>
                {/* <BankInfoNumber>{data?.mp_data?.payment_id}</BankInfoNumber> */}
                <BankInfoNumber>{orderIdParam}</BankInfoNumber>
              </BankInfoBlockOrder>
              <BankInfoBlockOrder>
                <BankInfoText>Fecha:</BankInfoText>
                <BankInfoNumber>{formatDate(data?.updatedAt)}</BankInfoNumber>
              </BankInfoBlockOrder>
              <BankInfoBlockOrder>
                <BankInfoText>Total:</BankInfoText>
                <BankInfoNumber>{displayTotal} cop</BankInfoNumber>
              </BankInfoBlockOrder>
              <BankInfoBlockOrder>
                <BankInfoText>Metodos de pago:</BankInfoText>
                <BankInfoNumber>{searchParams?.get('status') === 'MCO' ? 'Mercado Pago' : 'Transferencia a cuenta bancaria'}</BankInfoNumber>
              </BankInfoBlockOrder>
            </MPinfoItemsWrapper>
            <ListItemsWrapper style={{ margin: '10px 20px 10px 10px'}}>
              {data?.products?.map(props => <CartItemComponent key={props?.id || ''} {...props} isOrder /> )}
            </ListItemsWrapper>
            <>
              <ModalTitle style={{ textAlign: 'start', color: 'white', margin: '20px 0px 0px 10px' }}>{'Detalles de facturación'.toUpperCase()}</ModalTitle>
              <ModalForm form={form} onFinish={async () => console.log('k')} loading={false} initialValues={data?.form_data} isOrder />
            </>
          </ScrolableZone>
        </CheckoutWrapperContent>
        <RightPanel>
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
          <div style={{ margin: 15 }}>
            <PriceTextBox>
              <SubtotalText>Subtotal: </SubtotalText>
              <SubtotalText>{beforeDelivery} cop</SubtotalText>
            </PriceTextBox>
            <PriceTextBox>
              <SubtotalText>Envío: </SubtotalText>
              <SubtotalText>15 000 cop</SubtotalText>
            </PriceTextBox>
            <PriceTextBox style={{ marginTop: 10 }}>
              <p style={{ fontSize: 36, margin: 0, color: '#4FDB40' }}>TOTAL: </p>
              <p style={{ fontSize: 36, margin: '0 0 0 15px', color: '#4FDB40' }}>{displayTotal} COP</p>
            </PriceTextBox>
          </div>
          
        </RightPanel>
      </CheckoutWrapper>
    </PageWrapper>
  );
}

export default CheckoutPage


  {/* {Object.entries(params).map(([key, value]) => (
    <p key={key}>
      {key}: {value}
    </p>
  ))} */}