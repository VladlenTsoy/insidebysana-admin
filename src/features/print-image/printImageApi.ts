import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "../../utils/apiConfig"
import {CreatePrintProductType, EditPrintProductType, PrintProduct} from "../../types/print/PrintProduct"

export const printImageApi = createApi({
    reducerPath: "printImageApi",
    baseQuery,
    tagTypes: ["print-image"],
    endpoints: build => ({
        getPrintImages: build.query<PrintProduct[], void>({
            query: () => ({
                url: `user/admin/print-images`,
                method: "GET"
            }),
            providesTags: ["print-image"]
        }),
        createPrintImage: build.mutation<PrintProduct, CreatePrintProductType>({
            query: body => ({
                url: `user/admin/print-image`,
                method: "POST",
                body
            }),
            invalidatesTags: ["print-image"]
        }),
        editPrintImage: build.mutation<PrintProduct, EditPrintProductType>({
            query: ({id, data}) => ({
                url: `user/admin/print-image/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["print-image"]
        }),
        deletePrintImage: build.mutation<PrintProduct, number>({
            query: id => ({
                url: `user/admin/print-image/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["print-image"]
        })
    })
})

export const {
    useCreatePrintImageMutation,
    useEditPrintImageMutation,
    useGetPrintImagesQuery,
    useDeletePrintImageMutation
} = printImageApi
