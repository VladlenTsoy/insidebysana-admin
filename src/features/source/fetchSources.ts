import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"
import {Source} from "types/Source"

type ReturnedType = Source[]

export const fetchSources = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "admin/sources/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/sources`, {signal})
    },
    {
        condition(_, {getState}) {
            const {source} = getState()
            return !source.ids.length
        }
    }
)
