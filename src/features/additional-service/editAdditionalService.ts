import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {AdditionalService} from "types/AdditionalService"
import {message} from "components/message/message"

type ReturnedType = AdditionalService

interface AgrProps {
    id: AdditionalService["id"]
    data: {
        title: AdditionalService["title"]
        price: AdditionalService["price"]
        display: AdditionalService["display"]
        url_image: AdditionalService["url_image"]
    }
}

export const editAdditionalService = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/additional-service/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/additional-service/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили доп. услугу!"})
        return response
    }
)
