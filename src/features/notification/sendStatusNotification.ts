import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"

type ReturnedType = {
    status: "success" | "error"
}

export const sendStatusNotification = createAsyncThunk<ReturnedType, number, AppThunkProps>(
    "send-status-notification",
    async orderId => {
        //
        return await apiRequest("get", `admin/notification/${orderId}/status`)
    }
)
