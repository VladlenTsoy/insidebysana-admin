import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Status} from "types/Status"

type ReturnedType = Status[]

interface AgrProps {
    id: Status["id"]
    position: Status["position"]
    prevPosition: Status["position"]
}

export const updatePositionStatus = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/status/update/position",
    async (data, {signal}) => {
        const response = await apiRequest("patch", `admin/status/${data.id}/position`, {
            data: {position: data.position, prev_position: data.prevPosition},
            signal
        })
        response && message({type: "success", content: "Вы успешно изменили статус!"})
        return response
    }
)
