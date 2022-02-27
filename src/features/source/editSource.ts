import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Source} from "types/Source";

type ReturnedType = Source

interface AgrProps {
    id: Source["id"]
    data: {
        title: Source["title"]
    }
}

export const editSource = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/source/edit",
    async ({ id, data }) => {
        //
        const response = await apiRequest("patch", `admin/source/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили ресурс!"})
        return response
    }
)
