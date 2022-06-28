import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"
import {Tag} from "types/Tag"

type ReturnedType = Tag["id"]

type AgrProps = Tag["id"]

export const deleteTag = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "tag/delete",
    async (id) => {
        //
        await apiRequest("delete", `admin/tag/${id}`)
        return id
    }
)
