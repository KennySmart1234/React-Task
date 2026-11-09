// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const URL = import.meta.env.VITE_APP_BASEURL

// export const dummyDataApi = createApi({

//     reducerPath: "dummyApi",
//     baseQuery: fetchBaseQuery({baseUrl: URL}),
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: (body) => ({
//                 url: "/user/login",
//                 method: "POST",
//                 body,
//             }),  
//         }),
        
//         getAllProducts: builder.query({
//             query: () => "/products",
//         }),

//     }),
// });   

// export const {useLoginMutation, useGetAllProductsQuery} = dummyDataApi;







import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_APP_BASEURL;

export const dummyDataApi = createApi({
  reducerPath: "dummyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),

  endpoints: (builder) => ({

    // Login
    login: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
    }),

    // Get all products
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    // Get one product by its ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

  }),
});

export const {
  useLoginMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} = dummyDataApi;