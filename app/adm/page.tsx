'use client'

import React, { FC, useState } from 'react'
import { useGetOrderQuery } from "@/lib/redux/slices/orderApi";
import { SyncOutlinedStyled } from '@/app/checkout/styled'
import { formatDate } from '@/app/components/helpers'
import { handleSort, getSortIndicator, sortedData, fieldsForRender } from './admHelpers'
import {
  AdmWrapper,
  OrderItem,
  Table,
  TableHeader,
  TableRow,
  TableData,
  SortIndicator
} from './styled'


const Adm: FC = () => {
  const { data, isLoading, refetch, isFetching } = useGetOrderQuery('mockedUserId');
  const [sortConfig, setSortConfig] = useState({ key: 'updatedAt', direction: 'desc' });

  if (isLoading) return 'Loading adm'

  const displayingData = sortedData(data, sortConfig)
  const handleRefetch = () => {
    refetch()
  };

  return (
    <AdmWrapper>
      <SyncOutlinedStyled onClick={handleRefetch} loading={isFetching} style={{ margin: '15px 0 '}}/>
      <Table>
        <thead>
          <tr>
            {fieldsForRender.map(({ value, label }) => (
              <TableHeader key={value} onClick={() => handleSort(value, sortConfig, setSortConfig)}>
                {label} <SortIndicator>{getSortIndicator(value, sortConfig)}</SortIndicator>
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayingData.map(order => {
            const { _id, status, totalPrice, updatedAt, form_data: { name, surname } } = order
            const formatedDate = formatDate(updatedAt, 'en-EN')

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
                <TableData>{formatedDate}</TableData>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </AdmWrapper>
  );
}

export default Adm
