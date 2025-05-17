'use client'

import React, { FC, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { Form, Select, Button } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useGetOrderByIdQuery } from "@/lib/redux/slices/orderApi";
import { SyncOutlinedStyled } from '@/app/checkout/styled'
import { sendOrderEmails } from '@/helpers/data';

const Adm: FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id');
  const { data, isLoading, refetch, isFetching } = useGetOrderByIdQuery({ orderId: orderIdParam });

  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)

  if (isLoading) return <div>Loading order...</div>;

  const onFinish = async ({status}) => {
    setUpdating(true)
    try {
      const response = await fetch(`/api/orders?orderId=${orderIdParam}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderIdParam,
          updatedData: {
            status,
          },
        }),
      });
  
      if (!response.ok) throw new Error(`Failed to update order: ${response.status}`);
  
      const updatedOrder = await response.json();
      sendOrderEmails({...data, status})

      console.log('Updated Order:', updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Failed to update order');
    } finally {
      setUpdating(false)
    }
  }

  const deleteOrder = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/orders?orderId=${orderIdParam}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || `Failed to delete order: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Order deleted:', result);
  
      router.push('/adm'); 
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Failed to delete order');
    } finally {
      setDeleting(false)
    }
  };

  const handleRefetch = () => {
    refetch()
  };
  
  return (
    <>
      {[data].map(order => { 
        const { _id, status, totalCost, updatedAt, form_data: { name, surname }, products, form_data } = order;

        return (
          <div key={status}>
            <StyledForm key='order' form={form} initialValues={{ status }} onFinish={onFinish}>
              <SyncOutlinedStyled onClick={handleRefetch} loading={isFetching} style={{ margin: '0 auto 10px'}}/>
              <InfoField>
                <p>Order №:</p>
                <Link href={`${process.env.BACK_URL}/checkout?order_id=${_id}`}>{_id}</Link>
              </InfoField>
              <InfoField>
                <p>Payment type:</p>
                <p>{form_data?.payment_method}</p>
              </InfoField>
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
                <p>{updatedAt}</p>
              </InfoField>
              <Button htmlType="submit" loading={updating}> UPDATE </Button>
            </StyledForm>
            <StyledForm key='products' form={form} initialValues={{ status }} onFinish={onFinish}>
              <InfoField style={{ display: 'flex', flexDirection: 'column' }}>
                <p>Ordered products</p>
                {products.map(({id, quantity, title, type, size}) => (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <p>Quantity: {quantity}</p>
                    <p>{title}</p>
                    <p>{size ? (type + ' ' + size) : type }</p>
                  </div>
                ))}
              </InfoField>
            </StyledForm>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px'}}>
              <Button onClick={deleteOrder} loading={deleting}> DELETE ORDER </Button>
            </div>
          </div>
        )
      })}
    </>
  );
}

export default Adm

const OrderItem = styled(Link)`
  display: flex;
  justify-content: space-around;
`

const InfoField = styled.div`
  margin: 5px;
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  max-width: 500px;
  border: 1px solid #F2C94C;
  padding: 30px;
`
