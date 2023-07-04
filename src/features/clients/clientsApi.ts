import {createApi} from "@reduxjs/toolkit/query/react"
import baseQuery from "utils/apiConfig"
import {Client, SelectClientsFilterParams} from "types/Client"

type GetAllType = {
    total: number
    results: Client[]
}

interface CreateProps {
    id: number
    full_name: string
    phone: string
    email?: string
    password?: string
    instagram: string
    facebook: string
    telegram: string
    date_of_birth: string
    created_at: string
}

interface UpdateProps {
    id: Client["id"]
    data: {
        id: number
        full_name: string
        phone: string
        email: string
        password?: string
        instagram: string
        facebook: string
        telegram: string
        date_of_birth: string
        created_at: string
    }
}

export const clientsApi = createApi({
    reducerPath: "clientsApi",
    baseQuery,
    tagTypes: ["clients", "client"],
    endpoints: build => ({
        // Получить клиентов
        getAllClients: build.query<GetAllType, SelectClientsFilterParams>({
            query: data => ({
                url: `user/admin/clients/table`,
                method: "POST",
                body: data
            }),
            providesTags: ["clients"]
        }),
        createQuery: build.mutation<GetAllType, SelectClientsFilterParams>({
            query: data => ({
                url: `user/admin/clients/table`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["clients"],
        }),
        // Создать клиента
        createClient: build.mutation<Client, Partial<CreateProps>>({
            query: data => ({
                url: `user/admin/client`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["clients"]
        }),
        // Обновить клиента
        updateClient: build.mutation<Client, Partial<UpdateProps>>({
            query: ({id, data}) => ({
                url: `user/admin/client/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["clients", "client"]
        }),
        // Получить клиента
        getClient: build.query({
            query: id => ({
                url: `user/admin/client/${id}`,
                method: "GET"
            }),
            providesTags: ["client"]
        }),
        // Получить заказы клиента
        getClientOrders: build.query({
            query: id => ({
                url: `user/admin/client/${id}/orders`,
                method: "GET"
            }),
        }),
        // Получить избранное клиента
        getClientWishlist: build.query({
            query: id => ({
                url: `user/admin/client/${id}/wishlist`,
                method: "GET"
            }),
        }),
        // Получить корзину клиента
        getClientCart: build.query({
            query: id => ({
                url: `user/admin/client/${id}/cart`,
                method: "GET"
            })
        })
    })
})

export const {
    useGetAllClientsQuery,
    useCreateQueryMutation,
    useCreateClientMutation,
    useUpdateClientMutation,
    useGetClientQuery,
    useGetClientOrdersQuery,
    useGetClientWishlistQuery,
    useGetClientCartQuery
} = clientsApi
