'use client'

import React, { FC, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { Form, Select, Button } from 'antd'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { 
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useSendOrderEmailMutation
} from "@/lib/redux/slices/orderApi";
import { SyncOutlinedStyled } from '@/app/checkout/styled'
import { IOrder } from '@/models/Order';
import LoadingComponent from '@/app/components/LoadingComponent/LoadingComponent';

const Adm: FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id') || '';
  const { data, isLoading, refetch, isFetching } = useGetOrderByIdQuery({ orderId: orderIdParam });
  
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [sendOrderEmail, { isLoading: isSendingEmail }] = useSendOrderEmailMutation();
  const [isDeletingOrder, setIsDeletingOrder] = useState(false);

  if (isLoading) return <LoadingComponent text="Cargando pedido..." />;

  const onFinish = async ({status}: {status: string}) => {
    try {
      await updateOrder({
        orderId: orderIdParam,
        updatedData: { status }
      }).unwrap();

      console.log('Order updated, sending email');
      sendOrderEmail(orderIdParam);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeletingOrder(true);
      
      await deleteOrder({ orderId: orderIdParam }).unwrap();
      
      router.push('/adm');
    } catch (error) {
      console.error('Error deleting order:', error);
      setIsDeletingOrder(false);
    }
  };

  const handleRefetch = () => {
    refetch()
  };
  
  if (!data) return <div>No order data found</div>;
  const order = data as IOrder;
  
  const { _id, status, totalCost, updatedAt, form_data, products } = order;
  const { name, surname } = form_data || {};
  
  return (
    <div style={{ minHeight: '70.6vh' }} key={status}>
      <StyledForm key='order' form={form} initialValues={{ status }} onFinish={onFinish}>
        <SyncOutlinedStyled onClick={handleRefetch} loading={isFetching} style={{ margin: '0 auto 10px'}}/>
        <InfoField style={{ alignItems: 'center' }}>
          <p>Order №:</p>
          <Link href={`${process.env.BACK_URL}/checkout?order_id=${_id}`}>{_id}</Link>
        </InfoField>
        <InfoField>
          <p>Payment type:</p>
          <p style={{ textTransform: 'capitalize' }}>{form_data?.payment_method}</p>
        </InfoField>
        {order.mp_data && order.mp_data.payment_id && (
          <InfoField>
            <p>Payment id:</p>
            <p>{order.mp_data.payment_id}</p>
          </InfoField>
        )}
        <InfoField>
          <p>Name:</p>
          <p>{name}</p>
        </InfoField>
        <InfoField>
          <p>Surname:</p>
          <p>{surname}</p>
        </InfoField>
        <Form.Item
          label={<p style={{ color: 'white'}}>Status :</p>} 
          name="status"
          style={{ marginLeft: 5}}
        >
          <Select
            placeholder="Elige una opción..."
            style={{ marginLeft: 70, width: '80%'}}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'failed', label: 'Failed' },
            ]}
          />
        </Form.Item>
        <InfoField>
          <p>Total:</p>
          <p>{totalCost}</p>
        </InfoField>
        <InfoField>
          <p>Updated at:</p>
          <p>{updatedAt instanceof Date ? updatedAt.toLocaleDateString() : updatedAt}</p>
        </InfoField>
        <Button htmlType="submit" loading={isUpdating || isSendingEmail}> UPDATE </Button>
      </StyledForm>
      <ProductSection key='products'>
        <p style={{margin: '10px auto 20px'}}>Ordered products</p>
        <InfoField style={{ display: 'flex', flexDirection: 'column' }}>
          {products && products.map((product: any) => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid' }}>
              <p>Quantity: {product.quantity}</p>
              <p>{product.title}</p>
              <p>{product.size ? (product.type + ' ' + product.size) : product.type }</p>
            </div>
          ))}
        </InfoField>
      </ProductSection>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px'}}>
        <Button onClick={handleDelete} loading={isDeleting || isDeletingOrder}> DELETE ORDER </Button>
      </div>
    </div>
  );
}

export default Adm

const OrderItem = styled(Link)`
  display: flex;
  justify-content: space-around;
`

const InfoField = styled.div`
  margin: 0 5px;
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`

const wrapper = css`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  max-width: 500px;
  border: 1px solid #F2C94C;
  padding: 30px;
`

const StyledForm = styled(Form)`
  ${wrapper}
`

const ProductSection = styled.div`
  ${wrapper}
  max-width: 436.5px;
`
