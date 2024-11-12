import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsAPI = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/products",
  }),
  endpoints: (builder) => ({
    getProductByName: builder.query({
      query: () => ``,
    }),
  }),
});
console.log('productsAPI', productsAPI)

export const { useGetProductByNameQuery } = productsAPI;