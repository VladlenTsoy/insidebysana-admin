import React, {useEffect} from "react"
import {fetchPaymentMethods} from "../fetchPaymentMethods"
import {useDispatch} from "store"
import {useLoadingPaymentMethods, useSelectAllPaymentMethods} from "../paymentMethodSelectors"
import {Button, Dropdown, Menu} from "antd"
import styles from "./SelectPaymentMethod.module.less"
import {CreditCardFilled} from "@ant-design/icons"
import {OrderPaymentMethod} from "../../order/order-editor/OrderEditor"
import {PaymentMethod} from "types/payment/PaymentMethod"
import ItemPaymentMethod from "./ItemPaymentMethod"

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
                    label: <div className={styles.paymentMethod} onClick={() => onAddHandler(paymentMethod)}>
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
                        paymentMethods.map((paymentMethod) => {
                            const selectedPaymentMethod = selectedPaymentMethods.find(selectedPaymentMethod => selectedPaymentMethod.payment_id === paymentMethod.id)
                            if (selectedPaymentMethod)
                                return <ItemPaymentMethod
                                    key={paymentMethod.id}
                                    selectedPaymentMethod={selectedPaymentMethod}
                                    paymentMethod={paymentMethod}
                                    onUpdate={updateSelectPaymentMethod}
                                    onDelete={deleteSelectPaymentMethod}
                                />
                            return null
                        })
                    }
                </div>
            }
        </>

    )
}

export default SelectPaymentMethod
