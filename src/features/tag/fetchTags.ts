import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {Tag} from "types/Tag"

type ReturnedType = Tag[]

export const fetchTags = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "tags/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/tags`, {signal})
    },
    {
        condition(_, {getState}) {
            const {tag} = getState()
            return !tag.ids.length
        }
    }
)
