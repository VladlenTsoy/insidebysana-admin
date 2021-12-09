import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"

interface ArgsProps {
    email: string
    password: string
}

interface ReturnedType {
    token: string
}

// Авторизация пользователя
export const authUser = createAsyncThunk<ReturnedType, ArgsProps, AppThunkProps>(
    "user/auth",
    async (data, {signal}) => {
        return await apiRequest("post", `login`, {data: {...data}, signal, type: "guest"})
    }
)