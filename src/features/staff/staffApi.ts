import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {User} from "types/User"

type GetAllType = {
    total: number
    results: User[]
}

interface GetAllProps {
    search: string
    pagination: {
        current: number
        pageSize: number
    }
    sorter: {
        field: string | string[]
        order: string
    }
}

interface CreateProps {
    access: string
    full_name: string
    email?: string
    password?: string
}

interface UpdateProps {
    id: User["id"]
    data: {
        access: string
        full_name: string
        email: string
        password?: string
    }
}

export const staffApi = createApi({
    reducerPath: "staffApi",
    baseQuery,
    tagTypes: ["staff"],
    endpoints: build => ({
        // Получить сотрудников
        getAllStaff: build.query<GetAllType, Partial<GetAllProps>>({
            query: data => ({
                url: `user/admin/users`,
                method: "POST",
                body: data
            }),
            providesTags: ["staff"]
        }),
        // Создать сотрудника
        createStaff: build.mutation<User, Partial<CreateProps>>({
            query: data => ({
                url: `user/admin/user`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["staff"]
        }),
        // Обновить сотрудника
        updateStaff: build.mutation<User, Partial<UpdateProps>>({
            query: ({id, data}) => ({
                url: `user/admin/user/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["staff"]
        })
    })
})

export const {useGetAllStaffQuery, useCreateStaffMutation, useUpdateStaffMutation} = staffApi
