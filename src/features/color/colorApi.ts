import {createApi} from "@reduxjs/toolkit/query/react"
import {Color, CreateColorType, EditColorType} from "types/Color"
import baseQuery from "utils/apiConfig"

export const colorApi = createApi({
    reducerPath: "colorApi",
    baseQuery,
    tagTypes: ["color"],
    endpoints: build => ({
        getAllColors: build.query<Color[], void>({
            query: body => ({
                url: `user/admin/colors`,
                method: "GET",
                body
            }),
            providesTags: ["color"]
        }),
        createColor: build.mutation<Color, CreateColorType>({
            query: body => ({
                url: `user/admin/color`,
                method: "POST",
                body
            }),
            invalidatesTags: ["color"]
        }),
        editColor: build.mutation<Color, EditColorType>({
            query: ({id, data}) => ({
                url: `user/admin/color/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["color"]
        }),
        hideColor: build.mutation<Color, number>({
            query: (id) => ({
                url: `user/admin/color/${id}/hide`,
                method: "PATCH"
            }),
            invalidatesTags: ["color"]
        }),
        displayColor: build.mutation<Color, number>({
            query: (id) => ({
                url: `user/admin/color/${id}/display`,
                method: "PATCH"
            }),
            invalidatesTags: ["color"]
        }),
        deleteColor: build.mutation<Color, number>({
            query: (id) => ({
                url: `user/admin/color/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["color"]
        })
    })
})

export const {
    useGetAllColorsQuery,
    useCreateColorMutation,
    useEditColorMutation,
    useDisplayColorMutation,
    useHideColorMutation,
    useDeleteColorMutation
} = colorApi
