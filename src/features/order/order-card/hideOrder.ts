import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Order} from "types/order/Order"
import {AppThunkProps} from "store"

type ReturnedType = Order["id"]

type AgrProps = Order["id"]

export const hideOrder = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/order/hide",
    async id => {
        //
        const response = await apiRequest("post", `admin/order/${id}/hide`)
        response && message({type: "success", content: "Вы успешно отправили заказ в корзину!"})
        return id
    }
)
