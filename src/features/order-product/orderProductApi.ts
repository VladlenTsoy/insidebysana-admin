import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {Order} from "types/order/Order"

export const orderProductApi = createApi({
    reducerPath: "orderProductApi",
    baseQuery,
    tagTypes: ["order-products"],
    endpoints: build => ({
        getOrderProductsById: build.query<Order["productColors"], Partial<string>>({
            query: orderId => ({
                url: `user/admin/order/${orderId}/products`
            }),
            providesTags: ["order-products"]
        })
    })
})

export const {useGetOrderProductsByIdQuery} = orderProductApi
