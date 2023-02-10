import {createAsyncThunk} from "@reduxjs/toolkit"
import {AppThunkProps} from "store"
import {apiRequest} from "utils/api"
import {message} from "components/message/message"
import {OrderAddress, OrderCardType, OrderDiscount, OrderPayment} from "types/order/Order"
import {Client} from "types/Client"
import {ProductColor} from "types/product/ProductColor"
import {Size} from "types/Size"
import {Delivery} from "types/Delivery"

type ReturnedType = OrderCardType

interface AgrProps {
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
    payment_state?: -1 | 0 | 1
}

export const createOrder = createAsyncThunk<ReturnedType, AgrProps, AppThunkProps>(
    "admin/order/create",
    async data => {
        //
        const response = await apiRequest("post", `admin/order`, {data})
        response && message({type: "success", content: "Вы успешно создали сделку!"})
        return response
    }
)
