import React from "react"
import {Descriptions} from "antd"
import {formatPrice} from "utils/formatPrice"
import {Order} from "types/Order"

interface OrderPaymentsProps {
    payments: Order["payments"]
}

const OrderPayments: React.FC<OrderPaymentsProps> = ({payments}) => {
    return (
        <Descriptions
            bordered
            size="small"
            title="Оплата"
            column={1}
            style={{marginBottom: "1.5rem"}}
        >
            {payments?.map((payment: any) => (
                <Descriptions.Item label={payment.title} key={payment.payment_id}>
                    {formatPrice(payment.price)} сум
                </Descriptions.Item>
            ))}
        </Descriptions>
    )
}

export default OrderPayments
