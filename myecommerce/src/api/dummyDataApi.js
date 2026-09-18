import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const dummyDataApi = createApi({
    reducerPath: "dummyApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://dummyjson.com/"}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/user/login",
                method: "POST",
                body,
            }),  
        }),
        
        getAllProducts: builder.query({
            query: () => "/products",
        }),

    }),
});   

export const {useLoginMutation, useGetAllProductsQuery} = dummyDataApi;