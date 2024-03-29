import React, {Dispatch, SetStateAction, useMemo} from "react"
import styles from "./RightInformation.module.less"
import {Card, Switch} from "antd"
import {OrderDiscount, OrderProduct} from "types/order/Order"
import {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {formatPrice} from "utils/formatPrice"
import Discount from "./discount/Discount"
import Processing from "../../../../components/processing/Processing"
import SelectPaymentMethod from "../../../payment-method/select-payment-method/SelectPaymentMethod"
import {OrderPaymentMethod} from "../OrderEditor"
import cn from "classnames"

interface RightInformationProps {
    leftToPay: number
    totalPriceAdditionalServices: number
    totalPriceDelivery: number
    totalPriceDiscount: number
    totalPriceProducts: number
    paymentMethods: OrderPaymentMethod[]
    discount: OrderDiscount
    setDiscount: Dispatch<SetStateAction<OrderDiscount>>
    selectProducts: OrderProduct[]
    selectAdditionalServices: SelectAdditionalServiceType[]
    processing: boolean
    changeProcessingHandler: (val: boolean) => void
    updateSelectPaymentMethod: (paymentMethod: OrderPaymentMethod) => void
    deleteSelectPaymentMethod: (paymentMethodId: OrderPaymentMethod["payment_id"]) => void
    paymentState: boolean
    onChangePayment: () => void
}

/**
 * Итог
 * @param leftToPay
 * @param totalPriceDelivery
 * @param totalPriceAdditionalServices
 * @param totalPriceDiscount
 * @param totalPriceProducts
 * @param paymentMethods
 * @param discount
 * @param setDiscount
 * @param selectProducts
 * @param selectAdditionalServices
 * @param processing
 * @param changeProcessingHandler
 * @param updateSelectPaymentMethod
 * @param deleteSelectPaymentMethod
 * @param paymentState
 * @param onChangePayment
 * @constructor
 */
const RightInformation: React.FC<RightInformationProps> = (
    {
        leftToPay,
        totalPriceDelivery,
        totalPriceAdditionalServices,
        totalPriceDiscount,
        totalPriceProducts,
        paymentMethods,
        discount,
        setDiscount,
        selectProducts,
        selectAdditionalServices,
        processing,
        changeProcessingHandler,
        updateSelectPaymentMethod,
        deleteSelectPaymentMethod,
        paymentState,
        onChangePayment
    }
) => {
    // Кол-во продуктов
    const countProducts = useMemo(() => selectProducts.reduce((acc, product) => acc + product.qty, 0), [selectProducts])
    // Кол-во доп. услуг
    const countAdditionalServices = useMemo(() => selectAdditionalServices.reduce((acc, additionalServices) => acc + additionalServices.qty, 0), [selectAdditionalServices])
    //

    return (
        <div className={styles.container}>
            <Card>
                {/* Оплата */}
                <label className={styles.paymentStatus}>
                    <div className={styles.content}>
                        <div className={styles.title}>Статус оплаты</div>
                        <Switch onChange={onChangePayment} checked={paymentState} checkedChildren="Оплачен"
                                unCheckedChildren="Ожидание" />
                    </div>
                    <div className={styles.desc}>
                        При указании статуса "оплачен", необходимо указать форму и сумму оплаты
                    </div>
                </label>
                {/* Выбор оплаты */}
                {paymentState &&
                    <>
                        <SelectPaymentMethod
                            selectedPaymentMethods={paymentMethods}
                            deleteSelectPaymentMethod={deleteSelectPaymentMethod}
                            updateSelectPaymentMethod={updateSelectPaymentMethod}
                        />
                        <div className={styles.mb} />
                    </>
                }
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
                {/* Доставка */}
                {totalPriceDelivery > 0 &&
                    <div className={styles.totalPrice}>
                        <div>Доставка:</div>
                        <div className={styles.price}>
                            {formatPrice(totalPriceDelivery)} сум
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
                    <div
                        className={cn(styles.price, styles.danger, {[styles.active]: leftToPay === 0})}>{formatPrice(leftToPay)} сум
                    </div>
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

export default React.memo(RightInformation)
