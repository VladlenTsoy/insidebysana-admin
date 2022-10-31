import React, {useCallback, useState} from "react"
import {Col, Divider, Row} from "antd"
import SelectAdditionalServices, {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {OrderAddress, OrderDiscount, OrderPayment, OrderProduct} from "types/Order"
import SelectProduct from "features/product/select-product/SelectProduct"
import {Client} from "types/Client"
import {Delivery} from "types/Delivery"
import BaseInformation from "./content/BaseInformation"
import RightInformation from "./content/RightInformation"

export interface OrderPaymentMethod {
    payment_id: number
    label: string
    price: number
}

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
    // Метод оплаты
    const [paymentMethods, setPaymentMethods] = useState<OrderPaymentMethod[]>([])
    // Скидки
    const [discount, setDiscount] = useState<OrderDiscount>({type: "percent", discount: 0})
    // Выбранные продукты
    const [products, setProducts] = useState<OrderProduct[]>(order?.products || [])
    // Выбранные доп. услуги
    const [additionalServices, setAdditionalServices] = useState<SelectAdditionalServiceType[]>(order?.additionalServices || [])
    // На обработку
    const [processing, setProcessing] = useState(order?.processing || false)
    // Изменить на обработку
    const changeProcessingHandler = useCallback((val: boolean) => setProcessing(val), [])

    // Обновить выбранные доп. услуги
    const updateSelectAdditionalServices = useCallback(_additionalServices => {
        setAdditionalServices(_additionalServices)
    }, [])

    // Добавить метод оплаты
    const updateSelectPaymentMethod = useCallback((paymentMethod: OrderPaymentMethod) => {
        setPaymentMethods(prevState => {
            const findPaymentMethod = prevState.find(val => val.payment_id === paymentMethod.payment_id)
            return findPaymentMethod ?
                [...prevState.filter(val => val.payment_id !== paymentMethod.payment_id), paymentMethod] :
                [...prevState, paymentMethod]
        })
    }, [])

    // Удалить метод оплаты
    const deleteSelectPaymentMethod = useCallback((paymentMethodId: OrderPaymentMethod["payment_id"]) => {
        setPaymentMethods(prevState => prevState.filter(val => val.payment_id !== paymentMethodId))
    }, [])

    return (
        <Row gutter={28}>
            <Col span={18}>
                <BaseInformation />
                {/* Список продуктов */}
                <SelectProduct products={products} setProducts={setProducts} />
                <Divider />
                {/* Список доп. услуг */}
                <SelectAdditionalServices
                    selectAdditionalServices={additionalServices}
                    updateSelectAdditionalServices={updateSelectAdditionalServices}
                />
            </Col>
            <Col span={6}>
                <RightInformation
                    paymentMethods={paymentMethods}
                    discount={discount}
                    setDiscount={setDiscount}
                    selectProducts={products}
                    selectAdditionalServices={additionalServices}
                    processing={processing}
                    changeProcessingHandler={changeProcessingHandler}
                    updateSelectPaymentMethod={updateSelectPaymentMethod}
                    deleteSelectPaymentMethod={deleteSelectPaymentMethod}
                />
            </Col>
        </Row>
    )
}

export default OrderEditor
