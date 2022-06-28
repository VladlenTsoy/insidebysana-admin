import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"
import {Tag} from "types/Tag"

type ReturnedType = Tag

interface AgrProps {
    id: Tag["id"]
    data: {
        title: Tag["title"]
    }
}

export const editTag = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "tag/edit",
    async ({id, data}) => {
        //
        return await apiRequest("patch", `admin/tag/${id}`, {data})
    }
)
