import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"

type ReturnedType = any

export const fetchStatuses = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "admin/status/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `admin/statuses`, {signal})
    },
    {
        condition(_, {getState}) {
            const {status} = getState()
            return !status.ids.length
        }
    }
)
