import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.PATH_TO_API,
  }),
  tagTypes: ['Product'],
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/api/products`,
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductQuery } = productsAPI;