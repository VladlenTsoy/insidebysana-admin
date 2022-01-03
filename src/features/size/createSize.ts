import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Size} from "types/Size"

type ReturnedType = Size

interface AgrProps {
    title: Size["title"]
}

export const createSize = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/size/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/size`, {data})
        response && message({type: "success", content: "Вы успешно создали размер!"})
        return response
    }
)
