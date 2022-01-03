import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {AppThunkProps} from "store"
import {Size} from "types/Size"

type ReturnedType = Size["id"]

type AgrProps = Size["id"]

export const deleteSize = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/size/delete",
    async id => {
        //
        const response = await apiRequest("delete", `admin/size/${id}`)
        response && message({type: "success", content: "Вы успешно удалили размер!"})
        return id
    }
)
