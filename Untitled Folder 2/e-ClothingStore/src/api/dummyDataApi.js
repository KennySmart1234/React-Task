import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URL = 'https://dummyjson.com/'

export const dummyDataApi = createApi({
  reducerPath: 'dummyApi',

  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products',
    }),
  }),
})

export const {
  useGetAllProductsQuery,
} = dummyDataApi