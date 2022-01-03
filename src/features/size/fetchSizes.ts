import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {Size} from "types/Size"

type ReturnedType = Size[]

export const fetchSizes = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "sizes/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `sizes`, {signal})
    },
    {
        condition(_, {getState}) {
            const {size} = getState()
            return !size.ids.length
        }
    }
)
