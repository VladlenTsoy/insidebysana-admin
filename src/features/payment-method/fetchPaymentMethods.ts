import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"
import {PaymentMethod} from "types/payment/PaymentMethod"

type ReturnedType = PaymentMethod[]

export const fetchPaymentMethods = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "admin/payment-methods/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/payment-methods`, {signal})
    },
    {
        condition(_, {getState}) {
            const {paymentMethod} = getState()
            return !paymentMethod.ids.length
        }
    }
)
