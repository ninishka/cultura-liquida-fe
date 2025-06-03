'use client'

import React, { FC, useState, useEffect } from 'react'
import { Select } from 'antd'
import { useGetOrderQuery } from "@/lib/redux/slices/orderApi";
import { SyncOutlinedStyled } from '@/app/checkout/styled'
import { formatDate } from '@/helpers/formats'
import { handleSort, getSortIndicator, getSortingData, fieldsForRender } from './admHelpers'
import LoadingComponent from '@/app/components/LoadingComponent/LoadingComponent';
import {
  AdmWrapper,
  Pagination,
  OrderItem,
  Table,
  TableHeader,
  TableRow,
  TableData,
  SortIndicator
} from './styled'


const Adm: FC = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'updatedAt', direction: 'desc' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data, isLoading, refetch, isFetching } = useGetOrderQuery({name: 'mockedUserId', page, pageSize});

  useEffect(() => {
    refetch()
  }, [])
   
  if (isLoading) return <LoadingComponent text="Cargando pedidos..." />;
  if (data === undefined) return 'No orders'

  const displayingData = getSortingData(data, sortConfig)
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
            const { _id, status, totalCost, updatedAt, form_data: { name, surname } } = order
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
                <TableData>{totalCost}</TableData>
                <TableData>{formatedDate}</TableData>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
      <Pagination>
        <div>
          Page
          <Select
            placeholder="Page number"
            options={[
              {value: 1, label: '1'},
              {value: 2, label: '2'},
              {value: 3, label: '3'},
              {value: 4, label: '4'},
              {value: 5, label: '5'},
            ]}
            onChange={v => setPage(v)}
            value={page}
          />
        </div>
        <div>
          Per page
          <Select
            placeholder="Page size"
            options={[
              {value: 2, label: '2'},
              {value: 10, label: '10'},
              {value: 25, label: '25'},
              {value: 50, label: '50'},
            ]}
            onChange={v => setPageSize(v)}
            value={pageSize}
          />
        </div>
      </Pagination>
    </AdmWrapper>
  );
}

export default Adm
