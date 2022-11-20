import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {SelloCategory} from "types/sello/SelloCategory"

export const selloCategoryApi = createApi({
    reducerPath: "selloCategoryApi",
    baseQuery,
    tagTypes: ["sello-category", "filter-category"],
    endpoints: build => ({
        getAllSelloCategories: build.query<SelloCategory[], void>({
            query: body => ({
                url: `user/admin/sello/categories`,
                method: "GET",
                body
            }),
            providesTags: ["sello-category"]
        })
        // getFilterCategories: build.query<Category[], void>({
        //     query: body => ({
        //         url: `user/admin/filter/categories`,
        //         method: 'GET',
        //         body
        //     }),
        //     providesTags: ['filter-category']
        // })
    })
})

export const {useGetAllSelloCategoriesQuery} = selloCategoryApi
