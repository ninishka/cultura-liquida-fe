'use client'

import React, { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetProductQuery } from "@/lib/redux/slices/api"
import { useGetOrderByIdQuery, useProcessPaymentInfoMutation } from "@/lib/redux/slices/orderApi";
import { IOrder } from '@/models/Order';
import CartItemComponent from '@/app/components/ModalComponent/CartItemComponent/CartItemComponent'
import ModalForm from '@/app/components/ModalComponent/FormComponent/ModalForm'
import LoadingComponent from '@/app/components/LoadingComponent/LoadingComponent';
import { formatPrice } from '@/helpers/formats'
import { formatDate } from '@/helpers/formats'
import { keysFromMP } from '@/helpers/data';

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


const CheckoutPage: FC = () => {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id')
  const orderPaid = searchParams?.get('payment_id') 

  const { data: order, isLoading, error, refetch, isFetching } = useGetOrderByIdQuery({ orderId: orderIdParam });
  const data = order as IOrder;
  
  const [respStatus, setRespStatus] = useState<string | undefined>(undefined)
  const [processPaymentInfo] = useProcessPaymentInfoMutation()

  const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery('');

  useEffect(() => {
    if (data?.status) setRespStatus(data?.status)

    const mp_data = keysFromMP.reduce((acc, key) => {
      acc[key] = searchParams?.get(key) || "Not provided";
      return acc;
    }, {} as Record<string, string>); 

    if (orderPaid && data && typeof data === 'object') {
      const hasNoMercadoPagoData = !data?.mp_data;
      const isStatusMismatched = data.status !== mp_data?.status;
       
      if (hasNoMercadoPagoData && isStatusMismatched) {
        processPaymentInfo(orderPaid)
          .unwrap()
          .then(() => refetch())
          .catch(error => console.error('Error proccessing order:', error))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])
  
  if (isLoading || isLoadingProduct) return <LoadingComponent fullScreen text="Cargando orden..." />;

  const handleRefetch = () => {
    refetch()
  };

  const formatedDate = formatDate(String(data?.updatedAt), 'es-ES')
  const displayTotal = formatPrice(data?.totalCost, ' ')

  const formData = data?.form_data;
  const t = formData?.payment_method === 'transfer' && 'Transferencia a cuenta bancaria' 
  const m = formData?.payment_method === 'mercado' && 'Mercado Pago' 

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
              {data?.products?.map((props: any) => <CartItemComponent key={props?.id || ''} {...props} isOrder /> )}
            </ListItemsWrapperCheckout>
            <>
              <ModalTitleCheckout style={{ textAlign: 'start', color: 'white', margin: '20px 0px 0px 10px', textTransform: 'uppercase' }}>Detalles de facturación</ModalTitleCheckout>
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
