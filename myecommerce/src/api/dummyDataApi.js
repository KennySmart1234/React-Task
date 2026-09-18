import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_APP_BASEURL

export const dummyDataApi = createApi({

    reducerPath: "dummyApi",
    baseQuery: fetchBaseQuery({baseUrl: URL}),
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