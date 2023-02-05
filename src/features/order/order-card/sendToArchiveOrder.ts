import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "../../../utils/api"
import {message} from "components/message/message"
import {Order} from "types/order/Order"

type ReturnedType = Order["id"]

type AgrProps = Order["id"]

export const sendToArchiveOrder = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/order/send-to-archive",
    async id => {
        //
        const response = await apiRequest("post", `admin/order/${id}/archive`)
        response && message({type: "success", content: "Вы успешно отравили заказ в архив!"})
        return id
    }
)
