import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_APP_BASEURL;

export const dummyDataApi = createApi({
  reducerPath: "dummyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),

  endpoints: (builder) => ({

    getAllProducts: builder.query({
      query: () => "/products",
    }),

    getSingleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),

  }),
});

export const { useGetAllProductsQuery, useGetSingleProductQuery } = dummyDataApi;