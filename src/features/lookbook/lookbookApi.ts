import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "utils/apiConfig"
import {
    CreateLookbookCategoryType,
    CreateLookbookType,
    EditLookbookCategoryType, EditLookbookType, Lookbook,
    LookbookCategory
} from "../../types/Lookbook"

export const lookbookApi = createApi({
    reducerPath: "lookbookApi",
    baseQuery,
    tagTypes: ["lookbook-category"],
    endpoints: build => ({
        getAllLookbookCategories: build.query<LookbookCategory[], void>({
            query: () => ({
                url: `user/admin/lookbook-categories`,
                method: "GET"
            }),
            providesTags: ["lookbook-category"]
        }),
        createLookbookCategory: build.mutation<LookbookCategory, CreateLookbookCategoryType>({
            query: body => ({
                url: `user/admin/lookbook-category`,
                method: "POST",
                body
            }),
            invalidatesTags: ["lookbook-category"]
        }),
        editLookbookCategory: build.mutation<LookbookCategory, EditLookbookCategoryType>({
            query: ({id, data}) => ({
                url: `user/admin/lookbook-category/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["lookbook-category"]
        }),
        deleteLookbookCategory: build.mutation<LookbookCategory, number>({
            query: id => ({
                url: `user/admin/lookbook-category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["lookbook-category"]
        }),
        getLookbookByCategoryId: build.query<Lookbook[], number>({
            query: id => ({
                url: `user/admin/category/${id}/lookbook`,
                method: "GET"
            }),
            providesTags: ["lookbook-category"]
        }),
        createLookbook: build.mutation<Lookbook, CreateLookbookType>({
            query: body => ({
                url: `user/admin/lookbook`,
                method: "POST",
                body
            }),
            invalidatesTags: ["lookbook-category"]
        }),
        editLookbook: build.mutation<Lookbook, EditLookbookType>({
            query: ({id, data}) => ({
                url: `user/admin/lookbook/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["lookbook-category"]
        }),
        deleteLookbook: build.mutation<Lookbook, number>({
            query: id => ({
                url: `user/admin/lookbook/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["lookbook-category"]
        })
    })
})

export const {
    useGetAllLookbookCategoriesQuery,
    useDeleteLookbookMutation,
    useCreateLookbookCategoryMutation,
    useEditLookbookCategoryMutation,
    useDeleteLookbookCategoryMutation,
    useCreateLookbookMutation,
    useEditLookbookMutation,
    useGetLookbookByCategoryIdQuery
} = lookbookApi
