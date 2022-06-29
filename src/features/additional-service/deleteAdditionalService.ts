import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {AdditionalService} from "types/AdditionalService"

type ReturnedType = AdditionalService["id"]

type AgrProps = AdditionalService["id"]

export const deleteAdditionalService = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/additional-service/delete",
    async id => {
        //
        const response = await apiRequest("delete", `admin/additional-service/${id}`)
        response && message({type: "success", content: "Вы успешно удалили доп. услугу!"})
        return id
    }
)
