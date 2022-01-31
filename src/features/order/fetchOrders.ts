import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"

type ReturnedType = any

type ArgsProps = undefined

export const fetchOrders = createAsyncThunk<ReturnedType, ArgsProps, AppThunkProps>(
    "admin/order/fetch",
    async (_, {signal}) => {
        //
        return await apiRequest("get", `admin/orders`, {signal})
    },
    {
        condition(arg: ArgsProps, {getState}) {
            const {order} = getState()
            return !order.ids.length
        }
    }
)
