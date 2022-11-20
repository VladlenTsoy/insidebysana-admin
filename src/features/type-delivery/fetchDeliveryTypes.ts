import {createAsyncThunk} from "@reduxjs/toolkit"
import {apiRequest} from "utils/api"
import {AppThunkProps} from "store"
import {Delivery} from "types/Delivery"

type ReturnedType = Delivery[]

export const fetchDeliveryTypes = createAsyncThunk<ReturnedType, number, AppThunkProps>(
    "/fetch",
    async (country, {signal}) => {
        return await apiRequest("post", `delivery`, {signal, data: {country}, type: "guest"})
    },
    {
        condition(_, {getState}) {
            const {typeDelivery} = getState()
            return !typeDelivery.ids.length
        }
    }
)
