import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {Client} from "types/Client"

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery,
    tagTypes: ["clients"],
    endpoints: build => ({
        getClientBySearch: build.query<Client[], Partial<{search: string | number | undefined}>>({
            query: body => ({
                url: `user/cashier/clients`,
                method: "POST",
                body
            }),
            providesTags: ["clients"]
        }),
        createClient: build.mutation<Client, Partial<{fullName: string, search: string}>>({
            query: body => ({
                url: `user/admin/client`,
                method: "POST",
                body
            }),
            invalidatesTags: ["clients"]
        })
    })
})

export const {useGetClientBySearchQuery, useCreateClientMutation} = clientApi
