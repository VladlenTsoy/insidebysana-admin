import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Order} from "types/order/Order"

type ReturnedType = {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

type AgrProps = {
    orderId: Order["id"]
    paymentState: Order["payment_state"]
}

export const changePaymentStateOrder = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/order/payment/state",
    async ({orderId, paymentState}) => {
        const response = await apiRequest("patch", `admin/order/${orderId}/payment-state`, {
            data: {paymentState}
        })
        response && message({type: "success", content: "Вы успешно изменили статус платежа Заказы!"})
        return {orderId, paymentState}
    }
)
