import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.PATH_TO_API,
  }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/api/products`,
    }),
  }),
});

export const { useGetProductQuery } = productsAPI;