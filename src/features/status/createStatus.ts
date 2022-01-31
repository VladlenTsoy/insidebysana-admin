import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Status} from "types/Status"

type ReturnedType = Status

interface AgrProps {
    title: Status["title"]
    actions: any
}

export const createStatus = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/status/create",
    async (data, {signal}) => {
        const response = await apiRequest("post", `admin/status`, {data, signal})
        response && message({type: "success", content: "Вы успешно создали статус!"})
        return response
    }
)
