import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {Order, OrderAddress, OrderDiscount, OrderPayment} from "types/Order"
import {Client} from "types/Client"
import {ProductColor} from "types/product/ProductColor"
import {Size} from "types/Size"
import {Delivery} from "types/Delivery"

type ReturnedType = Order

interface AgrProps {
    id: Order["id"]
    data: {
        processing?: boolean
        client: Client | null
        address: OrderAddress | null
        delivery_id: Delivery["id"] | null
        discount: OrderDiscount | null
        products: {
            id: ProductColor["id"]
            size_id: Size["id"]
            qty: number
            price: number
            discount: number
        }[]
        created_at: string
        payments: OrderPayment[]
        total_price: number
        additionalServices: any[]
    }
}

export const editOrder = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/order/edit",
    async ({id, data}) => {
        //
        const response = await apiRequest("patch", `admin/order/${id}`, {data})
        response && message({type: "success", content: "Вы успешно изменили сделку!"})
        return response
    }
)
