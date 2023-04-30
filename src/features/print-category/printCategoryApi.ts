import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "utils/apiConfig"
import {CreatePrintCategoryType, EditPrintCategoryType, PrintCategory} from "../../types/print/PrintCategory"

export const printCategoryApi = createApi({
    reducerPath: "printCategoryApi",
    baseQuery,
    tagTypes: ["print-category"],
    endpoints: build => ({
        getAllPrintCategories: build.query<PrintCategory[], void>({
            query: () => ({
                url: `print-categories`,
                method: "GET"
            }),
            providesTags: ["print-category"]
        }),
        createPrintCategory: build.mutation<PrintCategory, CreatePrintCategoryType>({
            query: body => ({
                url: `user/admin/print-category`,
                method: "POST",
                body
            }),
            invalidatesTags: ["print-category"]
        }),
        editPrintCategory: build.mutation<PrintCategory, EditPrintCategoryType>({
            query: ({id, data}) => ({
                url: `user/admin/print-category/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["print-category"]
        }),
        deletePrintCategory: build.mutation<PrintCategory, number>({
            query: id => ({
                url: `user/admin/print-category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["print-category"]
        }),
    })
})

export const {
    useCreatePrintCategoryMutation,
    useGetAllPrintCategoriesQuery,
    useDeletePrintCategoryMutation,
    useEditPrintCategoryMutation
} = printCategoryApi
