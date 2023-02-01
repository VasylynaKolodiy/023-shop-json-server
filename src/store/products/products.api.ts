import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProducts} from "../../models/Interfaces";

export const productsApi = createApi({
  reducerPath: 'products/Api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002',
  }),

  endpoints: build => ({
    getProducts: build.query({
      query: () => ({
        url: '/products',
      })
    }),
    getDetailProduct: build.query<IProducts, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
      })
    })
  })
})

export const {useGetProductsQuery, useGetDetailProductQuery} = productsApi