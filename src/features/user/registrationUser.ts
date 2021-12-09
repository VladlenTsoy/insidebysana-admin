import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"

type ReturnedType = {
    token: string
}

interface ArgProps {
    first_name: string
    last_name: string
    email: string
    password: string

    browser: any
    browserVersion: any
    device: any
    screen: any
}

export const registrationUser = createAsyncThunk<
    ReturnedType,
    ArgProps,
    AppThunkProps
>("user/registration", async (data, {signal}) => {
    return await apiRequest("post", `registration`, {
        data,
        signal,
        type: "guest"
    })
})
