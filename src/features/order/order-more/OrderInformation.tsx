import React from "react"
import {Descriptions, Typography} from "antd"
import {formatDate} from "utils/formatDate"
import PaymentStateBlock from "components/payment-state-block/PaymentStateBlock"
import {formatPrice} from "utils/formatPrice"
import {Order} from "types/Order"

const {Text} = Typography

interface OrderInformationProps {
    order: Order
}

const OrderInformation: React.FC<OrderInformationProps> = ({order}) => {
    const unknown = <Text type="secondary">Неизвестно</Text>

    return (
        <Descriptions
            bordered
            size="small"
            title="Информация"
            column={1}
            style={{marginBottom: "1.5rem"}}
        >
            <Descriptions.Item label="Номер заказа">
                {order.id}
            </Descriptions.Item>
            <Descriptions.Item label="Дата создание">
                {formatDate(order.created_at, "HH:mm DD-MMM", "HH:mm DD-MM-YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Статус оплаты">
                <PaymentStateBlock paymentState={order.payment_state} isEdit orderId={order.id} />
            </Descriptions.Item>
            <Descriptions.Item label="Статус">
                {order.status.title || unknown}
            </Descriptions.Item>
            <Descriptions.Item label="Откуда">
                {order.source.title || unknown}
            </Descriptions.Item>
            <Descriptions.Item label="Менеджер">
                {order.user?.full_name || unknown}
            </Descriptions.Item>
            <Descriptions.Item label="Промокод">
                {order.promo_code ? (
                    `${order.promo_code?.code} ${
                        order.promo_code?.type === "fixed"
                            ? `${formatPrice(order.promo_code.discount)} сум`
                            : `${order.promo_code.discount}%`
                    }`
                ) : (
                    unknown
                )}
            </Descriptions.Item>
            <Descriptions.Item label="Скидка от менеджера">
                {order?.discount ?
                    order?.discount.type === "fixed" ?
                        `${formatPrice(order.discount.discount)} сум` :
                        `${order.discount.discount}%` :
                    unknown
                }
            </Descriptions.Item>
            <Descriptions.Item label="Доставка">
                {order?.delivery ?
                    `${order.delivery.title} (${formatPrice(order.delivery.price)} сум)` :
                    "Самовызов"
                }
            </Descriptions.Item>
            <Descriptions.Item label="Итог">
                {formatPrice(order.total_price)} сум
            </Descriptions.Item>
        </Descriptions>
    )
}

export default OrderInformation
