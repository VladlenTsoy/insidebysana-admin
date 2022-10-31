import React, {Dispatch, SetStateAction, useMemo} from "react"
import styles from "./RightInformation.module.less"
import {Card} from "antd"
import {OrderDiscount, OrderProduct} from "types/Order"
import {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {formatPrice} from "utils/formatPrice"
import Discount from "./discount/Discount"
import Processing from "./processing/Processing"
import SelectPaymentMethod from "../../../payment-method/select-payment-method/SelectPaymentMethod"
import {OrderPaymentMethod} from "../OrderEditor"
import cn from "classnames"

interface RightInformationProps {
    paymentMethods: OrderPaymentMethod[]
    discount: OrderDiscount
    setDiscount: Dispatch<SetStateAction<OrderDiscount>>
    selectProducts: OrderProduct[]
    selectAdditionalServices: SelectAdditionalServiceType[]
    processing: boolean
    changeProcessingHandler: (val: boolean) => void
    updateSelectPaymentMethod: (paymentMethod: OrderPaymentMethod) => void
    deleteSelectPaymentMethod: (paymentMethodId: OrderPaymentMethod["payment_id"]) => void
}

/**
 * Итог
 * @param paymentMethods
 * @param discount
 * @param setDiscount
 * @param selectProducts
 * @param selectAdditionalServices
 * @param processing
 * @param changeProcessingHandler
 * @param updateSelectPaymentMethod
 * @param deleteSelectPaymentMethod
 * @constructor
 */
const RightInformation: React.FC<RightInformationProps> = (
    {
        paymentMethods,
        discount,
        setDiscount,
        selectProducts,
        selectAdditionalServices,
        processing,
        changeProcessingHandler,
        updateSelectPaymentMethod,
        deleteSelectPaymentMethod
    }
) => {
    // Кол-во продуктов
    const countProducts = useMemo(() => selectProducts.reduce((acc, product) => acc + product.qty, 0), [selectProducts])
    // Общая сумма продуктов
    const totalPriceProducts = useMemo(() => selectProducts.reduce((acc, {
        qty,
        product
    }) => acc + (qty * (product.discount ? (product.details.price - (product.details.price / 100) * product.discount.discount) : product.details.price)), 0), [selectProducts])
    // Кол-во доп. услуг
    const countAdditionalServices = useMemo(() => selectAdditionalServices.reduce((acc, additionalServices) => acc + additionalServices.qty, 0), [selectAdditionalServices])
    // Общая сумма доп. услуг
    const totalPriceAdditionalServices = useMemo(() => selectAdditionalServices.reduce((acc, additionalServices) => acc + (additionalServices.qty * additionalServices.price), 0), [selectAdditionalServices])
    // Общая сумма
    const totalPrice = useMemo(() => totalPriceProducts + totalPriceAdditionalServices, [totalPriceProducts, totalPriceAdditionalServices])
    // Общая сумма со скидкой
    const totalPriceDiscount = useMemo(() => discount.type === "fixed"
        ? totalPrice - discount.discount
        : totalPrice - discount.discount * (totalPrice / 100), [discount, totalPrice])
    // Оплата пользователя
    const customerTotalPayments = useMemo(() => paymentMethods.reduce((acc, paymentMethod) => acc + paymentMethod.price, 0), [paymentMethods])
    // Осталось оплатить
    const leftToPay = useMemo(() => totalPriceDiscount - customerTotalPayments, [totalPriceDiscount, customerTotalPayments])

    return (
        <div className={styles.container}>
            <Card>
                {/* Выбор оплаты */}
                <SelectPaymentMethod
                    selectedPaymentMethods={paymentMethods}
                    deleteSelectPaymentMethod={deleteSelectPaymentMethod}
                    updateSelectPaymentMethod={updateSelectPaymentMethod}
                />
                <div className={styles.mb} />
                {/* Скидка */}
                <div className={styles.discount}>
                    <div className={styles.title}>Скидка</div>
                    <Discount
                        discount={discount}
                        setDiscount={setDiscount}
                    />
                </div>
                {/* Товары */}
                <div className={styles.totalPrice}>
                    <div className={styles.title}>Товары:</div>
                    <div className={styles.price}>
                        <span>{countProducts} x</span> {formatPrice(totalPriceProducts)} сум
                    </div>
                </div>
                {/* Доп. услуги */}
                {countAdditionalServices > 0 &&
                    <div className={styles.totalPrice}>
                        <div>Доп. услуги:</div>
                        <div className={styles.price}>
                            <span>{countAdditionalServices} x</span> {formatPrice(totalPriceAdditionalServices)} сум
                        </div>
                    </div>
                }
                {/* Скидка */}
                {!!discount.discount &&
                    <div className={styles.totalPrice}>
                        <div className={styles.title}>Скидка:</div>
                        <div
                            className={styles.price}>{discount.type === "fixed" ? `${formatPrice(discount.discount)} сум` : `${discount.discount}%`}
                        </div>
                    </div>
                }
                <hr style={{margin: ".5rem 0"}} />
                {/* Осталось внести */}
                <div className={styles.totalPrice}>
                    <div className={styles.title}>Осталось внести:</div>
                    <div className={cn(styles.price, styles.danger, {[styles.active]: leftToPay === 0})}>{formatPrice(leftToPay)} сум</div>
                </div>
                {/* Общая сумма к оплате */}
                <div className={styles.totalPrice}>
                    <div className={styles.title}>Сумма к оплате:</div>
                    <div className={styles.price}>{formatPrice(totalPriceDiscount)} сум</div>
                </div>
                <div className={styles.mb} />
                {/* На обработку */}
                <Processing isProcessing={processing} onChange={changeProcessingHandler} />
            </Card>
        </div>
    )
}

export default RightInformation
