import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersAPI = createApi({
  reducerPath: "ordersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.PATH_TO_API,
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (name) => `/api/orders?userId=${name}`,
    }),
  }),
});

export const { useGetOrderQuery } = ordersAPI;

