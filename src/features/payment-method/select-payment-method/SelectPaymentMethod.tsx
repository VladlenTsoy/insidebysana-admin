import React, {useEffect} from "react"
import {fetchPaymentMethods} from "../fetchPaymentMethods"
import {useDispatch} from "store"
import {useLoadingPaymentMethods, useSelectAllPaymentMethods} from "../paymentMethodSelectors"
import {Typography} from "antd"
import styles from "./SelectPaymentMethod.module.less"
import cn from "classnames"

const {Title} = Typography

const SelectPaymentMethod = () => {
    const dispatch = useDispatch()
    const loading = useLoadingPaymentMethods()
    const paymentMethods = useSelectAllPaymentMethods()

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    console.log(paymentMethods)
    return (
        <>
            <Title level={3}>Метод оплаты</Title>
            <div className={styles.header}>
                {paymentMethods.map(paymentMethod => (
                    <div className={cn(styles.paymentMethod, {[styles.active]: paymentMethod.id === 1})}>
                        <div className={styles.image}>
                            <img src={paymentMethod.url_logo} alt={paymentMethod.title} />
                        </div>
                        <div className={styles.title}>{paymentMethod.title}</div>
                    </div>
                ))}
            </div>
            <div className={styles.content}></div>
        </>
    )
}

export default SelectPaymentMethod
