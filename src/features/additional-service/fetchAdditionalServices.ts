import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {AdditionalService} from "types/AdditionalService"

type ReturnedType = AdditionalService[]

export const fetchAdditionalServices = createAsyncThunk<ReturnedType, undefined, AppThunkProps>(
    "admin/additional-service/all/fetch",
    async (_, {signal}) => {
        return await apiRequest("get", `admin/additional-services`, {signal})
    },
    {
        condition(_, {getState}) {
            const {additionalService} = getState()
            return !additionalService.ids.length
        }
    }
)
