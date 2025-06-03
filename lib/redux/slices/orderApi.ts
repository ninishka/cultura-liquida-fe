import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { sendOrderEmails } from '@/helpers/data';
import { IOrder } from '@/models/Order';

interface MercadoPagoInfo {
  id: string;
  external_reference: string;
  status: string;
  net_amount: number;
  payment_type_id: string;
  collector_id: string;
  date_created: string;
  merchant_account_id: string;
  processing_mode: string;
  order: { id: string };
  [key: string]: any;
}

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.PATH_TO_API,
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrder: builder.query<IOrder[], {name: string; page: number; pageSize: number}>({
      query: ({name, page, pageSize}) => `/api/orders?userId=${name}&page=${page}&pageSize=${pageSize}`,
    }),

    getOrderById: builder.query<IOrder, {orderId: string}>({
      query: ({orderId}) => `/api/orders?orderId=${orderId}`,
      providesTags: (result, error, {orderId}) => [{ type: 'Order' as const, id: orderId }],
    }),

    deleteOrder: builder.mutation<IOrder, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `/api/orders?orderId=${orderId}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order' as const, id: orderId }],
    }),

    updateOrder: builder.mutation<IOrder, { orderId: string; updatedData: Partial<IOrder> }>({
      query: ({ orderId, updatedData }) => ({
        url: `/api/orders?orderId=${orderId}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, updatedData }),
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order' as const, id: orderId }],
    }),

    sendOrderEmail: builder.mutation<IOrder, string>({
      query: (orderId) => ({
        url: `/api/orders?orderId=${orderId}`,
        method: 'GET',
      }),
      async onQueryStarted(orderId, { queryFulfilled }) {
        try {
          const { data: orderData } = await queryFulfilled;
          await sendOrderEmails(orderData);
        } catch (err) {
          console.error('Error sending email:', err);
        }
      },
    }),

    processPaymentInfo: builder.mutation<MercadoPagoInfo, string>({
      query: (resourceId) => ({
        url: `/api/info?id=${resourceId}`,
        method: 'GET',
      }),
      async onQueryStarted(resourceId, { dispatch, queryFulfilled }) {
        try {
          const { data: info } = await queryFulfilled;

          const orderId = info.external_reference;
          const updatedData = {
            mp_data: {
              amount: String(info.net_amount),
              payment_id: info.id, 
              status: info.status,
              payment_type: info.payment_type_id,
              collector_id: info.collector_id,
              date_created: info.date_created,
              merchant_account_id: info.merchant_account_id,
              processing_mode: info.processing_mode,
              merchant_order_id: info.order.id
            },
            status: info.status
          };

          await dispatch(ordersAPI.endpoints.updateOrder.initiate({ orderId, updatedData })).unwrap();
          dispatch(ordersAPI.endpoints.sendOrderEmail.initiate(orderId));          
        } catch (error) {
          console.error('Error in processPaymentInfo:', error);
          throw error;
        }
      },
    }),
  }),
});

export const { 
  useGetOrderQuery, 
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useSendOrderEmailMutation,
  useProcessPaymentInfoMutation
} = ordersAPI;

