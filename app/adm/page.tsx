'use client'

import React, { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useGetOrderQuery } from "@/lib/redux/slices/orderApi";
import { SyncOutlinedStyled } from '@/app/checkout/styled'

const Adm: FC = () => {
  const { data, isLoading, refetch, isFetching } = useGetOrderQuery('mockedUserId');
  if (isLoading) return 'Loading adm'

  const handleRefetch = () => {
    refetch()
  };

  return (
    <>
      <SyncOutlinedStyled onClick={handleRefetch} loading={isFetching} style={{ margin: '10px 50% '}}/>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Surname</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Total Price</TableHeader>
            <TableHeader>Updated At</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map(order => {
            const { _id, status, totalPrice, updatedAt, form_data: { name, surname } } = order
            return (
              <TableRow key={_id}>
                <TableData>
                  <OrderItem href={`/adm/edit?order_id=${_id}`}>
                    {_id}
                  </OrderItem>
                </TableData>
                <TableData>{name}</TableData>
                <TableData>{surname}</TableData>
                <TableData>{status}</TableData>
                <TableData>{totalPrice}</TableData>
                <TableData>{updatedAt}</TableData>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </> 

  );
}

export default Adm

const OrderItem = styled(Link)`
  display: flex;
  justify-content: space-around;
  font-weight: 700;
  margin: 10;
  color: #F2C94C;
  letter-spacing: 0.6px;
  text-decoration: underline;

  &:hover {
    color: #F2C94C !important;
    /* text-decoration: underline; */
  }
`

const InfoField = styled.p`
  margin: 5px;
`


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #F2C94C;
  color: black;
  font-weight: 700;
`;

const TableRow = styled.tr`
  text-align: left;
  &:nth-child(even) {
    /* background-color: darkslategrey; */
  }
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;
