import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {Order} from "types/order/Order"

type ReturnedType = Order

type ArgsProps = string | number

export const fetchOrderById = createAsyncThunk<ReturnedType, ArgsProps, AppThunkProps>(
    "admin/order/fetch/id",
    async (id, {signal}) => {
        //
        return await apiRequest("get", `admin/order/${id}`, {signal})
    },
    {
        condition(id, {getState}) {
            const {order} = getState()
            return !order.ids.includes(id)
        }
    }
)
