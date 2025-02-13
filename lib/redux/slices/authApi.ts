import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.PATH_TO_API }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (password) => ({
        url: '/api/auth',
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
