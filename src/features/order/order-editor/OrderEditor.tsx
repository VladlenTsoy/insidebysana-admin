import React, {useCallback, useState} from "react"
import {Col, Row} from "antd"
import SelectAdditionalServices, {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {Order} from "types/Order"

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
                <SelectAdditionalServices
                    selectAdditionalServices={additionalServices}
                    updateSelectAdditionalServices={updateSelectAdditionalServices}
                />
            </Col>
            <Col span={5} />
        </Row>
    )
}

export default OrderEditor
