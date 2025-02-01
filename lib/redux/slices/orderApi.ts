import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.PATH_TO_API,
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: ({name, page, pageSize}) => `/api/orders?userId=${name}&page=${page}&pageSize=${pageSize}`,
    }),
    getOrderById: builder.query({
      query: ({orderId}) => `/api/orders?orderId=${orderId}`,
    }),
  }),
});

export const { useGetOrderQuery, useGetOrderByIdQuery } = ordersAPI;

