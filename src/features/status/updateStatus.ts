import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Status} from "types/Status"

type ReturnedType = Status

interface AgrProps {
    id: Status["id"]
    data: {
        title: Status["title"]
        actions: any
    }
}

export const updateStatus = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/status/update",
    async ({id, data}, {signal}) => {
        const response = await apiRequest("patch", `admin/status/${id}`, {data, signal})
        response && message({type: "success", content: "Вы успешно изменили статус!"})
        return response
    }
)
