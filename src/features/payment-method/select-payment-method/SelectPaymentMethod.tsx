import React, {useEffect} from "react"
import {fetchPaymentMethods} from "../fetchPaymentMethods"
import {useDispatch} from "store"
import {useLoadingPaymentMethods, useSelectAllPaymentMethods} from "../paymentMethodSelectors"
import {Button, Dropdown, InputNumber, Menu} from "antd"
import styles from "./SelectPaymentMethod.module.less"
import {CreditCardFilled, DeleteOutlined} from "@ant-design/icons"
import {formatPrice} from "utils/formatPrice"
import {OrderPaymentMethod} from "../../order/order-editor/OrderEditor"
import {PaymentMethod} from "types/payment/PaymentMethod"

interface SelectPaymentMethodProps {
    selectedPaymentMethods: OrderPaymentMethod[]
    updateSelectPaymentMethod: (paymentMethod: OrderPaymentMethod) => void
    deleteSelectPaymentMethod: (paymentMethod: OrderPaymentMethod["payment_id"]) => void
}

const SelectPaymentMethod: React.FC<SelectPaymentMethodProps> = (
    {
        selectedPaymentMethods,
        updateSelectPaymentMethod,
        deleteSelectPaymentMethod
    }
) => {
    const dispatch = useDispatch()
    const loading = useLoadingPaymentMethods()
    const paymentMethods = useSelectAllPaymentMethods()

    // Добавить метод оплаты
    const onAddHandler = (paymentMethod: PaymentMethod) => updateSelectPaymentMethod({
        label: paymentMethod.title,
        payment_id: paymentMethod.id,
        price: 0
    })
    // Добавить метод оплаты
    const onUpdateHandler = (paymentMethod: PaymentMethod, qty: number) => updateSelectPaymentMethod({
        label: paymentMethod.title,
        payment_id: paymentMethod.id,
        price: qty
    })
    // Удалить
    const onDeleteHandler = (paymentMethod: PaymentMethod) => deleteSelectPaymentMethod(paymentMethod.id)

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    const menu = (
        <Menu
            items={
                paymentMethods.map(paymentMethod => ({
                    label: <div className={styles.paymentMethod}
                                onClick={() => onAddHandler(paymentMethod)}>
                        <img src={paymentMethod.url_logo} alt={paymentMethod.title} />
                        <div className={styles.text}>{paymentMethod.title}</div>
                    </div>,
                    key: paymentMethod.id
                }))
            }
        />
    )

    return (
        <>
            <Dropdown overlay={menu}>
                <Button icon={<CreditCardFilled />} size="large" block loading={loading}>Добавить оплату</Button>
            </Dropdown>
            {!!selectedPaymentMethods.length &&
                <div className={styles.selectedPaymentMenu}>
                    {
                        paymentMethods.filter(paymentMethod => selectedPaymentMethods.some(selectedPaymentMethod => selectedPaymentMethod.payment_id === paymentMethod.id))
                            .map((paymentMethod) =>
                                <div key={paymentMethod.id} className={styles.selectedPaymentItem}>
                                    <img src={paymentMethod.url_logo} alt={paymentMethod.title} />
                                    <InputNumber
                                        size="large"
                                        defaultValue={0}
                                        style={{width: "100%"}}
                                        type="tel"
                                        min={0}
                                        formatter={val => formatPrice(Number(val))}
                                        onChange={(val) => onUpdateHandler(paymentMethod, val)}
                                    />
                                    <Button
                                        icon={<DeleteOutlined />}
                                        shape="circle"
                                        danger
                                        size="large"
                                        onClick={() => onDeleteHandler(paymentMethod)}
                                    />
                                </div>
                            )
                    }
                </div>
            }
        </>

    )
}

export default SelectPaymentMethod
