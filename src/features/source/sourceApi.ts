import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "utils/apiConfig"
import {CreateSourceType, EditSourceType, Source} from "types/Source"

export const sourceApi = createApi({
    reducerPath: "sourceApi",
    baseQuery,
    tagTypes: ["source"],
    endpoints: build => ({
        getAllSources: build.query<Source[], void>({
            query: body => ({
                url: `user/admin/sources`,
                method: "GET",
                body
            }),
            providesTags: ["source"]
        }),
        createSource: build.mutation<Source, CreateSourceType>({
            query: body => ({
                url: `user/admin/source`,
                method: "POST",
                body
            }),
            invalidatesTags: ["source"]
        }),
        editSource: build.mutation<Source, EditSourceType>({
            query: ({id, data}) => ({
                url: `user/admin/source/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["source"]
        })
    })
})

export const {useGetAllSourcesQuery, useCreateSourceMutation, useEditSourceMutation} = sourceApi
