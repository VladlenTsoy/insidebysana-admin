import {createApi} from "@reduxjs/toolkit/query/react"
import {Newsletter} from "types/Newsletter"
import baseQuery from "utils/apiConfig"

export const newsletterApi = createApi({
    reducerPath: "newsletterApi",
    baseQuery,
    tagTypes: ["newsletter"],
    endpoints: build => ({
        getAllNewsletter: build.query<Newsletter[], void>({
            query: body => ({
                url: `user/admin/newsletter`,
                method: "GET",
                body
            }),
            providesTags: ["newsletter"]
        }),
    })
})

export const {useGetAllNewsletterQuery} = newsletterApi
