'use client'

import React, { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetProductQuery } from "@/lib/redux/slices/api"
import { useGetOrderByIdQuery } from "@/lib/redux/slices/orderApi";
import CartItemComponent from '@/app/components/ModalComponent/CartItemComponent/CartItemComponent'
import ModalForm from '@/app/components/ModalComponent/FormComponent/ModalForm'
import { formatPrice } from '@/helpers/formats'
import { formatDate } from '@/helpers/formats'

import RightPanelComponent from './RightPanelComponent'

import {
  StyledLink,
  CheckoutWrapper,
  CheckoutWrapperContent,
  MPinfoItemsWrapper,
  ScrolableZone,
  SyncOutlinedStyled,
  PageWrapper,
  ModalTitleCheckout,
  ListItemsWrapperCheckout 
} from './styled'

import { 
  BankInfoBlockOrder,
  BankInfoText,
  BankInfoNumber
 } from '@/app/components/ModalComponent/BankingBox/styled'

const keysFromMP = ['collection_id', 'collection_status', 'payment_id', 'status', 'payment_type',
  'merchant_order_id', 'preference_id', 'site_id', 'processing_mode', 'merchant_account_id', 
  'external_reference' // - additional field
]

const CheckoutPage: FC = () => {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id')
  // const isInitialMercado = searchParams?.get('external_reference') 
  // just any param from MP show us that user was redirected from MP or he maybe copied link and used it again but it is ok
  const isInitialMercado = searchParams?.get('site_id')

  // isLoading only for first request
  // isFetching for every request if using refetch()
  // status also can be usefull here - shows refetch stages
  const { data, isLoading, error , refetch, isFetching, status} = useGetOrderByIdQuery({ orderId: orderIdParam });
  const [respStatus, setRespStatus] = useState(data?.status)
  
  // const [paymentOption, setPaymentOption] = useState('') // TODO avoid stupid isInitialMercado const
  // const isInitialMercado2 = paymentOption === 'mercado' && !data?.mp_data // TODO avoid stupid isInitialMercado const

  const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery('');

  useEffect(() => {
    // setPaymentOption(data?.form_data?.payment_method) // TODO avoid stupid isInitialMercado const
    console.log('useEffect')
    if(data?.status) {
      console.log('data?.status UE ', data?.status);
      setRespStatus(data?.status)
    }

    // after MP redirect back - it sends params in url
    // this params need to be delivered in db
    if (isInitialMercado) {
      console.log('isInitialMercado: ', isInitialMercado);
      const fetchData = async () => {
        try {
          const mp_data = keysFromMP.reduce((acc, key) => {
            acc[key] = searchParams?.get(key) || "Not provided";
            return acc;
          }, {} as Record<string, string>);     

          const response = await fetch(`/api/orders?orderId=${orderIdParam}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderIdParam,
              updatedData: {
                mp_data,
                status: mp_data?.status
              },
            }),
          });

          if (!response.ok) throw new Error(`Failed to update order: ${response.status}`);

          const updatedOrder = await response.json();
          setRespStatus(updatedOrder?.status)
        } catch (error) {
          console.error('Error updating order:', error);
        }
      };
      
      // if data exist, but mp_data absent or status mismatched
      if (data && typeof data === 'object') {
        const hasNoMercadoPagoData = !data?.mp_data;
        const isStatusMismatched = data.status !== data.mp_data?.status;
        
        if (hasNoMercadoPagoData || isStatusMismatched) {
          fetchData()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); 
  // searchParams is not dynamic, so no need to put it in dependencies

  if (isLoading || isLoadingProduct) return <div>Loading order...</div>;
  // if (error) return <div>Error loading order: {error.message}</div>;

  const handleRefetch = () => {
    refetch()
  };

  // SHIPPING COST FROM ORDER

  const formatedDate = formatDate(data?.updatedAt, 'es-ES')
  const displayTotal = formatPrice(data?.totalCost, ' ')

  const formData = data?.form_data;
  const t  = formData?.payment_method === 'transfer' && 'Transferencia a cuenta bancaria' 
  const m  = formData?.payment_method === 'mercado' && 'Mercado Pago' 

  return (
    <PageWrapper>
      <StyledLink href={productData?.[0]?.slug ? `/product/${productData?.[0]?.slug}` : '/'} aria-label="Volver a la página principal" style={{ margin: '10px auto 0 15px' }}>
        <p> ← volver a la página principal </p>
      </StyledLink>

      <div style={{display: 'flex', alignItems: 'center', margin: '70px auto 0 15px'}}>
        <h2 style={{textTransform: 'uppercase', fontSize: 48, fontWeight: 500}}>Checkout</h2>
        <SyncOutlinedStyled onClick={handleRefetch} loading={isFetching} />
      </div>
      <CheckoutWrapper>
        <CheckoutWrapperContent>
          <ScrolableZone>
            <MPinfoItemsWrapper>
              <BankInfoBlockOrder>
                <BankInfoText>Numero de pedido:</BankInfoText>
                {/* <BankInfoNumber>{data?.mp_data?.payment_id}</BankInfoNumber> */}
                <BankInfoNumber>{data?._id}</BankInfoNumber>
              </BankInfoBlockOrder>
              <BankInfoBlockOrder>
                <BankInfoText>Fecha:</BankInfoText>
                <BankInfoNumber>{formatedDate}</BankInfoNumber>
              </BankInfoBlockOrder>
              <BankInfoBlockOrder>
                <BankInfoText>Total:</BankInfoText>
                <BankInfoNumber style={{ textTransform: 'uppercase' }}>{displayTotal} cop</BankInfoNumber>
              </BankInfoBlockOrder>
              <BankInfoBlockOrder>
                <BankInfoText>Metodos de pago:</BankInfoText>
                <BankInfoNumber>{t || m || ''}</BankInfoNumber>
              </BankInfoBlockOrder>
            </MPinfoItemsWrapper>
            <ListItemsWrapperCheckout style={{ margin: '10px 20px 10px 10px'}}>
              {data?.products?.map(props => <CartItemComponent key={props?.id || ''} {...props} isOrder /> )}
            </ListItemsWrapperCheckout>
            <>
              <ModalTitleCheckout style={{ textAlign: 'start', color: 'white', margin: '20px 0px 0px 10px' }}>{'Detalles de facturación'.toUpperCase()}</ModalTitleCheckout>
              <ModalForm loading={false} initialValues={formData} isOrder />
            </>
          </ScrolableZone>
        </CheckoutWrapperContent>
        <RightPanelComponent data={data} respStatus={respStatus} refetch={refetch} />
      </CheckoutWrapper>
    </PageWrapper>
  );
}

export default CheckoutPage



// collection_status: approved
// payment_id: 1328778667
// status: approved   
// payment_type: prepaid_card
// merchant_order_id: 25920426760
// preference_id: 1700322474-0c961e86-e450-4eb7-ab35-0c93834e5ba0
// site_id: MCO
// processing_mode: aggregator
// merchant_account_id: null
// .... HOW TO MAKE addition fields MP https://www.mercadopago.com.co/developers/en/docs/checkout-pro/checkout-customization/preferences

// success with init MP http://localhost:3000/checkout?order_id=678b5227247caa11d0df094c&collection_id=1330524669&collection_status=approved&payment_id=1330524669&status=approved&external_reference=678b5227247caa11d0df094c&payment_type=credit_card&merchant_order_id=27422355172&preference_id=1700322474-2e53f394-4c6d-40f3-a688-8ba69a953c8b&site_id=MCO&processing_mode=aggregator&merchant_account_id=null
// success without init MP http://localhost:3000/checkout?order_id=678b5227247caa11d0df094c
// failed (I just change status in db) http://localhost:3000/checkout?order_id=67865ffc4440e5466f9bcb0d
// pending http://localhost:3000/checkout?order_id=6787cf02353ec4d4bf6c72ad 
