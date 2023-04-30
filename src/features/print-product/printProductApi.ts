import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "../../utils/apiConfig"
import {CreatePrintProductType, EditPrintProductType, PrintProduct} from "../../types/print/PrintProduct"

export const printProductApi = createApi({
    reducerPath: "printProductApi",
    baseQuery,
    tagTypes: ["print-product"],
    endpoints: build => ({
        getPrintProductsByImageId: build.query<PrintProduct[], number>({
            query: (id) => ({
                url: `user/admin/print-products/${id}`,
                method: "GET"
            }),
            providesTags: ["print-product"]
        }),
        createPrintProduct: build.mutation<PrintProduct, CreatePrintProductType>({
            query: body => ({
                url: `user/admin/print-product`,
                method: "POST",
                body
            }),
            invalidatesTags: ["print-product"]
        }),
        editPrintProduct: build.mutation<PrintProduct, EditPrintProductType>({
            query: ({id, data}) => ({
                url: `user/admin/print-product/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["print-product"]
        }),
        deletePrintProduct: build.mutation<PrintProduct, number>({
            query: id => ({
                url: `user/admin/print-product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["print-product"]
        })
    })
})

export const {
    useCreatePrintProductMutation,
    useDeletePrintProductMutation,
    useEditPrintProductMutation,
    useGetPrintProductsByImageIdQuery,
    useLazyGetPrintProductsByImageIdQuery
} = printProductApi
