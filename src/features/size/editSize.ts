import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Size} from "types/Size"

type ReturnedType = Size

interface AgrProps {
    id: Size["id"]
    data: {
        title: Size["title"]
    }
}

export const editSize = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/size/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/size/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили размер!"})
        return response
    }
)
