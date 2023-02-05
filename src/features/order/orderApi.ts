import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {Order} from "types/order/Order"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery,
    tagTypes: ["orders", "order-edit"],
    endpoints: build => ({
        // Вывести заказ по id
        getOrderById: build.query<Order, Partial<string | undefined>>({
            query: orderId => ({
                url: `user/admin/order/${orderId}`
            }),
            providesTags: ["orders"]
        }),
        // Вывести заказ по id
        getOrderForEditById: build.query<Order, Partial<string | undefined>>({
            query: orderId => ({
                url: `user/admin/order/${orderId}/edit`
            }),
            providesTags: ["order-edit"]
        })
    })
})

export const {useGetOrderByIdQuery, useGetOrderForEditByIdQuery} = orderApi
