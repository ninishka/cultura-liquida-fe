'use client'

import React, { FC, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { Form, Select, Button } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useGetOrderByIdQuery } from "@/lib/redux/slices/orderApi";
import { SyncOutlinedStyled } from '@/app/checkout/styled'

const Adm: FC = () => {
  const [form] = Form.useForm()
  const searchParams = useSearchParams();
  const orderIdParam = searchParams?.get('order_id');
  const { data, isLoading, refetch, isFetching } = useGetOrderByIdQuery(orderIdParam);

  const [updating, setUpdating] = useState(false)
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
            status
          },
        }),
      });
  
      if (!response.ok) throw new Error(`Failed to update order: ${response.status}`);
  
      const updatedOrder = await response.json();
      console.log('Updated Order:', updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Failed to update order');
    } finally {
      setUpdating(false)
    }
  }

  const handleRefetch = () => {
    refetch()
  };

  return (
    <>
      {[data].map(order => { 
        const { _id, status, totalCost, updatedAt, form_data: { name, surname } } = order;

        return (
          <StyledForm key={status} form={form} initialValues={{ status }} onFinish={onFinish}>
            <SyncOutlinedStyled onClick={handleRefetch} loading={isFetching} style={{ margin: '0 auto 10px'}}/>
            <InfoField>
              <p>Order №</p>
              <p>{_id}</p>
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
