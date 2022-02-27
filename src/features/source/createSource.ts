import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Source} from "types/Source"
import {AppThunkProps} from "store"

type ReturnedType = Source

interface AgrProps {
    title: Source["title"]
}

export const createSource = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/source/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/source`, {data})
        response && message({type: "success", content: "Вы успешно создали ресурс!"})
        return response
    }
)
