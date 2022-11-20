import React, {useEffect} from "react"
import CheckboxGroup from "components/checkbox-group/CheckboxGroup"
import {useLoadingPaymentMethods, useSelectAllPaymentMethods} from "../paymentMethodSelectors"
import {fetchPaymentMethods} from "../fetchPaymentMethods"
import {useDispatch} from "store"


const CheckboxGroupPaymentMethod: React.FC = () => {
    const loadingPaymentMethods = useLoadingPaymentMethods()
    const paymentMethods = useSelectAllPaymentMethods()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <CheckboxGroup
        label="Тип оплаты"
        name={["conditions", "payments"]}
        rules={[{required: true, message: "Выберите тип оплаты!"}]}
        loading={loadingPaymentMethods}
        data={paymentMethods.map(paymentMethod => ({
            label: paymentMethod.title,
            val: paymentMethod.id
        }))}
    />
}

export default CheckboxGroupPaymentMethod
