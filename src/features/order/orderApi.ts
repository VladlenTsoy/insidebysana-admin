import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {Order} from "types/Order"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery,
    tagTypes: ["orders"],
    endpoints: build => ({
        getOrderById: build.query<Order, Partial<string>>({
            query: orderId => ({
                url: `user/admin/order/${orderId}`,
            }),
            providesTags: ["orders"]
        })
    })
})

export const {useGetOrderByIdQuery} = orderApi
