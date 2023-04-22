import React, {useCallback} from "react"
import styles from "./SelectPaymentMethod.module.less"
import {Button, InputNumber} from "antd"
import {formatPrice} from "utils/formatPrice"
import {DeleteOutlined} from "@ant-design/icons"
import {PaymentMethod} from "types/payment/PaymentMethod"
import {OrderPaymentMethod} from "../../order/order-editor/OrderEditor"

interface ItemPaymentMethodProps {
    paymentMethod: PaymentMethod
    selectedPaymentMethod: OrderPaymentMethod
    onUpdate: (paymentMethod: OrderPaymentMethod) => void
    onDelete: (paymentMethod: OrderPaymentMethod["payment_id"]) => void
}

const ItemPaymentMethod: React.FC<ItemPaymentMethodProps> = (
    {
        paymentMethod,
        selectedPaymentMethod,
        onUpdate,
        onDelete
    }
) => {
    // Добавить метод оплаты
    const onUpdateHandler = useCallback((qty: number | null) =>
        onUpdate({
            label: paymentMethod.title,
            payment_id: paymentMethod.id,
            price: qty || 0
        }), [onUpdate, paymentMethod])
    // Удалить
    const onDeleteHandler = useCallback(() => onDelete(paymentMethod.id), [onDelete, paymentMethod])

    return (
        <div className={styles.selectedPaymentItem}>
            <img src={paymentMethod.url_logo} alt={paymentMethod.title} />
            <InputNumber
                size="large"
                defaultValue={selectedPaymentMethod.price || 0}
                style={{width: "100%"}}
                type="tel"
                min={0}
                formatter={val => formatPrice(Number(val))}
                onChange={onUpdateHandler}
            />
            <Button
                icon={<DeleteOutlined />}
                shape="circle"
                danger
                size="large"
                onClick={onDeleteHandler}
            />
        </div>
    )
}

export default ItemPaymentMethod
