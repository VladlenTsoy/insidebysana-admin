import React, {useCallback, useState} from "react"
import {Col, Divider, Row} from "antd"
import SelectAdditionalServices, {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {Order} from "types/Order"
import SelectProduct from "../../product/select-product/SelectProduct"
import SelectPaymentMethod from "../../payment-method/select-payment-method/SelectPaymentMethod"

interface OrderEditorProps {
    order?: Order;
}

const OrderEditor: React.FC<OrderEditorProps> = ({order}) => {
    const [additionalServices, setAdditionalServices] = useState<SelectAdditionalServiceType[]>(
        order?.additionalServices || []
    )

    const updateSelectAdditionalServices = useCallback(_additionalServices => {
        setAdditionalServices(_additionalServices)
    }, [])

    return (
        <Row gutter={28}>
            <Col span={19}>
                <SelectProduct />
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
