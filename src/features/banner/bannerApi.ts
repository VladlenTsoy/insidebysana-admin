import {createApi} from "@reduxjs/toolkit/dist/query/react"
import baseQuery from "utils/apiConfig"
import {Banner, CreateBannerType, EditBannerType} from "types/Banner"

export const bannerApi = createApi({
    reducerPath: "bannerApi",
    baseQuery,
    tagTypes: ["banner"],
    endpoints: build => ({
        getAllBanners: build.query<Banner[], void>({
            query: () => ({
                url: `user/admin/banners`,
                method: "GET"
            }),
            providesTags: ["banner"]
        }),
        createBanner: build.mutation<Banner[], CreateBannerType>({
            query: body => ({
                url: `user/admin/banner`,
                method: "POST",
                body
            }),
            invalidatesTags: ["banner"]
        }),
        editBanner: build.mutation<Banner[], EditBannerType>({
            query: ({id, data}) => ({
                url: `user/admin/banner/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["banner"]
        }),
        deleteBanner: build.mutation<Banner[], number>({
            query: id => ({
                url: `user/admin/banner/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["banner"]
        })
    })
})

export const {useGetAllBannersQuery, useCreateBannerMutation, useEditBannerMutation, useDeleteBannerMutation} = bannerApi
