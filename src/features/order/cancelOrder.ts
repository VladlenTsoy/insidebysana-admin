import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Order} from "types/Order"
import {AppThunkProps} from "../../store"

type ReturnedType = {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

type AgrProps = Order["id"]

export const cancelOrder = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/order/cancel",
    async id => {
        //
        const response = await apiRequest("post", `admin/order/${id}/cancel`)
        response && message({type: "success", content: "Вы успешно отменили сделку!"})
        return response
    }
)
