import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {AppThunkProps} from "store"
import {Size} from "types/Size"

type ReturnedType = Size["id"]

type AgrProps = Size["id"]

export const hideSize = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/size/hide",
    async id => {
        //
        const response = await apiRequest("patch", `admin/size/${id}/hide`)
        response && message({type: "success", content: "Вы успешно скрыли размер!"})
        return id
    }
)
