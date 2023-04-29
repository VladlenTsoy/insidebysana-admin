import {createApi} from "@reduxjs/toolkit/query/react"
import {Category, CreateCategoryType, EditCategoryType} from "types/Category"
import baseQuery from "utils/apiConfig"

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery,
    tagTypes: ["category", "filter-category", "category-url"],
    endpoints: build => ({
        getAllCategories: build.query<Category[], void>({
            query: body => ({
                url: `user/admin/categories`,
                method: "GET",
                body
            }),
            providesTags: ["category"]
        }),
        getAllCategoriesWithUrl: build.query<Category[], void>({
            query: body => ({
                url: `user/categories`,
                method: "GET",
                body
            }),
            providesTags: ["category-url"]
        }),
        getFilterCategories: build.query<Category[], void>({
            query: body => ({
                url: `user/admin/filter/categories`,
                method: "GET",
                body
            }),
            providesTags: ["filter-category"]
        }),
        createCategory: build.mutation<Category, CreateCategoryType>({
            query: body => ({
                url: `user/admin/category`,
                method: "POST",
                body
            }),
            invalidatesTags: ["category", "category-url"]
        }),
        editCategory: build.mutation<Category, EditCategoryType>({
            query: ({id, data}) => ({
                url: `user/admin/category/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["category", "category-url"]
        }),
        removeCategory: build.mutation<Category, Category["id"]>({
            query: (id) => ({
                url: `user/admin/category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["category", "category-url"]
        })
    })
})

export const {
    useGetAllCategoriesQuery,
    useGetAllCategoriesWithUrlQuery,
    useGetFilterCategoriesQuery,
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useRemoveCategoryMutation
} = categoryApi
