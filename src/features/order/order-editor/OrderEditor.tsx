import React, {useCallback, useMemo, useState} from "react"
import {Col, Divider, message, Row} from "antd"
import SelectAdditionalServices, {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {OrderDiscount, OrderProduct} from "types/order/Order"
import SelectProduct from "features/product/select-product/SelectProduct"
import BaseInformation from "./content/BaseInformation"
import RightInformation from "./content/RightInformation"
import {createOrder} from "../createOrder"
import {useDispatch} from "../../../store"
import {useHistory} from "react-router-dom"
import moment from "moment"
import {editOrder} from "../editOrder"
import {Delivery} from "../../../types/Delivery"

export interface OrderPaymentMethod {
    payment_id: number
    label: string
    price: number
}

interface OrderEditorProps {
    updateLoading: (loading: boolean) => void
    order: any
}

const OrderEditor: React.FC<OrderEditorProps> = ({order, updateLoading}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    // Метод оплаты
    const [paymentMethods, setPaymentMethods] = useState<OrderPaymentMethod[]>(order?.payments || [])
    // Скидки
    const [discount, setDiscount] = useState<OrderDiscount>(order?.discount || {type: "percent", discount: 0})
    // Выбранные продукты
    const [products, setProducts] = useState<OrderProduct[]>(order?.products || [])
    // Выбранные доп. услуги
    const [additionalServices, setAdditionalServices] = useState<SelectAdditionalServiceType[]>(order?.additionalServices || [])
    // На обработку
    const [processing, setProcessing] = useState(order?.processing || false)
    // Статус оплаты
    const [paymentState, setPaymentState] = useState<boolean>(Boolean(order?.payment_state))
    // Доставка
    const [selectedDelivery, setSelectedDelivery] = useState<Delivery | undefined>(order?.delivery)

    // Общая сумма доп. услуг
    const totalPriceAdditionalServices = useMemo(() => additionalServices.reduce((acc, additionalServices) => acc + (additionalServices.qty * additionalServices.price), 0), [additionalServices])
    // Общая сумма продуктов
    const totalPriceProducts = useMemo(() => products.reduce((acc, {
        qty,
        product
    }) => acc + (qty * (product.discount ? (product.details.price - (product.details.price / 100) * product.discount.discount) : product.details.price)), 0), [products])
    //
    const totalPriceDelivery = useMemo(() => selectedDelivery ? selectedDelivery.price : 0, [selectedDelivery])
    // Общая сумма
    const totalPrice = useMemo(() => totalPriceProducts + totalPriceAdditionalServices + totalPriceDelivery, [totalPriceProducts, totalPriceAdditionalServices, totalPriceDelivery])
    // Общая сумма со скидкой
    const totalPriceDiscount = useMemo(() => discount.type === "fixed"
        ? totalPrice - discount.discount
        : totalPrice - discount.discount * (totalPrice / 100), [discount, totalPrice])
    // Оплата пользователя
    const customerTotalPayments = useMemo(() => paymentMethods.reduce((acc, paymentMethod) => acc + paymentMethod.price, 0), [paymentMethods])
    // Осталось оплатить
    const leftToPay = useMemo(() => totalPriceDiscount - customerTotalPayments, [totalPriceDiscount, customerTotalPayments])
    //
    const onDeliveryChangeHandler = useCallback((delivery?: Delivery) => setSelectedDelivery(delivery), [])

    // Изменить на обработку
    const changeProcessingHandler = useCallback((val: boolean) => setProcessing(val), [])

    // Обновить выбранные доп. услуги
    const updateSelectAdditionalServices = useCallback(_additionalServices => {
        setAdditionalServices(_additionalServices)
    }, [])
    // Изменить статус оплаты
    const onChangePayment = useCallback(() => setPaymentState(prevState => !prevState), [])
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

    // Сохранить данные
    const onSubmitHandler = useCallback(async (values: any) => {
        // Проверка наличия продуктов
        if (!products.length)
            return message.error("Необходимо добавить товар к заказу!")
        // Проверка оплаты
        if (Number(leftToPay.toFixed(0)) !== 0 && paymentState)
            return message.error(`Значение "Осталось внести" должно быть 0!`)
        // Загрузка
        updateLoading(true)
        // Продукты для заказа
        const orderProducts = products.map(
            ({product, product_color_id, qty, size_id}) => ({
                discount: product?.discount,
                id: product_color_id,
                qty,
                size_id,
                price: product.details.price
            })
        )
        if (order)
            // Изменить сделку
            dispatch(editOrder({
                id: order.id,
                data: {
                    payments: paymentMethods,
                    discount,
                    products: orderProducts,
                    additionalServices,
                    processing,
                    total_price: totalPriceDiscount,
                    payment_state: paymentState,
                    ...values
                }
            }))
        else
            // Создать сделку
            dispatch(createOrder({
                payments: paymentMethods,
                discount,
                products: orderProducts,
                additionalServices,
                processing,
                total_price: totalPriceDiscount,
                payment_state: paymentState,
                ...values
            }))
        // Перейти на главную страницу
        history.push("/orders")
    }, [dispatch, paymentMethods, discount, products, additionalServices, processing, totalPriceDiscount, leftToPay, history, updateLoading, order, paymentState])

    return (
        <Row gutter={28}>
            <Col md={18} xs={24}>
                <BaseInformation
                    initialValues={order ? {
                        created_at: order.created_at ? moment(order.created_at) : moment(),
                        country_id: String(order.country_id),
                        source_id: String(order.source_id),
                        client: order.client,
                        delivery_id: order?.delivery?.id,
                        address: order.address
                    } : {
                        created_at: moment()
                    }}
                    onDeliveryChange={onDeliveryChangeHandler}
                    onFinish={onSubmitHandler}
                />
                {/* Список продуктов */}
                <SelectProduct products={products} setProducts={setProducts} />
                <Divider />
                {/* Список доп. услуг */}
                <SelectAdditionalServices
                    selectAdditionalServices={additionalServices}
                    updateSelectAdditionalServices={updateSelectAdditionalServices}
                />
            </Col>
            <Col md={6} xs={24}>
                <RightInformation
                    leftToPay={leftToPay}
                    totalPriceAdditionalServices={totalPriceAdditionalServices}
                    totalPriceDelivery={totalPriceDelivery}
                    totalPriceDiscount={totalPriceDiscount}
                    totalPriceProducts={totalPriceProducts}
                    paymentMethods={paymentMethods}
                    discount={discount}
                    setDiscount={setDiscount}
                    selectProducts={products}
                    selectAdditionalServices={additionalServices}
                    processing={processing}
                    changeProcessingHandler={changeProcessingHandler}
                    updateSelectPaymentMethod={updateSelectPaymentMethod}
                    deleteSelectPaymentMethod={deleteSelectPaymentMethod}
                    paymentState={paymentState}
                    onChangePayment={onChangePayment}
                />
            </Col>
        </Row>
    )
}

export default OrderEditor
