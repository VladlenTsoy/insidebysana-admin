import React, {useCallback, useState} from "react"
import {Col, Divider, Row} from "antd"
import SelectAdditionalServices, {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {OrderAddress, OrderDiscount, OrderPayment, OrderProduct} from "types/Order"
import SelectProduct from "features/product/select-product/SelectProduct"
import SelectPaymentMethod from "features/payment-method/select-payment-method/SelectPaymentMethod"
import {Client} from "types/Client"
import {Delivery} from "types/Delivery"

interface OrderEditorProps {
    order?: {
        id: number
        processing?: boolean
        additionalServices: SelectAdditionalServiceType[]
        products: OrderProduct[]
        client?: Client
        delivery?: Delivery
        discount?: OrderDiscount
        address?: OrderAddress
        payments?: OrderPayment[]
        created_at: string
    }
}

const OrderEditor: React.FC<OrderEditorProps> = ({order}) => {
    const [products, setProducts] = useState<OrderProduct[]>(order?.products || [])

    const [additionalServices, setAdditionalServices] = useState<SelectAdditionalServiceType[]>(
        order?.additionalServices || []
    )

    const updateSelectAdditionalServices = useCallback(_additionalServices => {
        setAdditionalServices(_additionalServices)
    }, [])

    return (
        <Row gutter={28}>
            <Col span={19}>
                <SelectProduct products={products} setProducts={setProducts} />
                <Divider />
                <SelectAdditionalServices
                    selectAdditionalServices={additionalServices}
                    updateSelectAdditionalServices={updateSelectAdditionalServices}
                />
                <Divider />
                <SelectPaymentMethod />
            </Col>
            <Col span={5} />
        </Row>
    )
}

export default OrderEditor
