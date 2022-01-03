import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Size} from "types/Size"
import {AppThunkProps} from "store"

type ReturnedType = Size["id"]

type AgrProps = Size["id"]

export const displaySize = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/size/display",
    async id => {
        //
        const response = await apiRequest("patch", `admin/size/${id}/display`)
        response && message({type: "success", content: "Вы успешно вернули размер!"})
        return id
    }
)
