import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productDataApi = createApi({
  reducerPath: "storeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://smart-cart-redux.onrender.com/" }),
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: (id) => ({
        url: "api/data",
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `api/data/${id}`,
        method: "GET",
      }),
    }),
    getProductsByCategory: builder.query({
      query: (category) => `api/category/${category}`,
    }),
    getSearchResult: builder.mutation({
      query: (data) => ({
        url: "api/search",
        method: "POST",
        body: data,
      }),
    }),
    userSignup: builder.mutation({
      query: (user) => ({
        url: "/user/signUp",
        method: "POST",
        body: user,
      }),
    }),
    userSignin: builder.mutation({
      query: (user) => ({
        url: "/user/signin",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetProductListQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetSearchResultMutation,
  useUserSignupMutation,
  useUserSigninMutation
} = productDataApi;
