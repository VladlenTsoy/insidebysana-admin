import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "utils/apiConfig"
import {CreatePromoCodeType, EditPromoCodeType, PromoCode} from "../../types/PromoCode"

export const promocodeApi = createApi({
    reducerPath: "promocodeApi",
    baseQuery,
    tagTypes: ["promocode"],
    endpoints: build => ({
        getAllPromocode: build.query<PromoCode[], void>({
            query: body => ({
                url: `user/admin/promo-codes`,
                method: "GET",
                body
            }),
            providesTags: ["promocode"]
        }),
        createPromocode: build.mutation<PromoCode, CreatePromoCodeType>({
            query: body => ({
                url: `user/admin/promo-code`,
                method: "POST",
                body
            }),
            invalidatesTags: ["promocode"]
        }),
        editPromocode: build.mutation<PromoCode, EditPromoCodeType>({
            query: ({id, data}) => ({
                url: `user/admin/promo-code/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["promocode"]
        })
    })
})

export const {useGetAllPromocodeQuery, useCreatePromocodeMutation, useEditPromocodeMutation} = promocodeApi
