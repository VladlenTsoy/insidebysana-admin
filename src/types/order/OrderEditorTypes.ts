import {OrderAddress, OrderDiscount, OrderPayment} from "./Order"
import {Delivery} from "../Delivery"
import {ProductColor} from "../product/ProductColor"
import {Size} from "../Size"

export interface OrderEditorSendDataProps {
    processing?: boolean
    client: {
        id: string
    } | null
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
    additionalServices: {
        id: number
    }[]
}
