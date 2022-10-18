import React, {useMemo} from "react"
import styles from "./RightInformation.module.less"
import {Card, Typography} from "antd"
import {OrderProduct} from "types/Order"
import {
    SelectAdditionalServiceType
} from "features/additional-service/select-additional-services/SelectAdditionalServices"
import {formatPrice} from "utils/formatPrice"
import Discount from "./discount/Discount"

const {Title} = Typography

interface RightInformationProps {
    selectProducts: OrderProduct[]
    selectAdditionalServices: SelectAdditionalServiceType[]
}

/**
 * Итог
 * @param selectProducts
 * @param selectAdditionalServices
 * @constructor
 */
const RightInformation: React.FC<RightInformationProps> = ({selectProducts, selectAdditionalServices}) => {
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

    return (
        <>
            <Title level={3}>Итог</Title>
            <Card>
                <div className={styles.container}>
                    {/* Скидка */}
                    <div className={styles.discount}>
                        <div>Скидка</div>
                        <Discount />
                    </div>
                    {/* Товары */}
                    <div className={styles.totalPrice}>
                        <div className={styles.title}>Товары:</div>
                        <div className={styles.price}>
                            <span>{countProducts} x</span> {formatPrice(totalPriceProducts)} сум
                        </div>
                    </div>
                    {/* Доп. услуги */}
                    <div className={styles.totalPrice}>
                        <div className={styles.title}>Доп. услуги:</div>
                        <div className={styles.price}>
                            <span>{countAdditionalServices} x</span> {formatPrice(totalPriceAdditionalServices)} сум
                        </div>
                    </div>
                    {/* Общая сумма к оплате */}
                    <div className={styles.totalPrice}>
                        <div className={styles.title}>Сумма к оплате:</div>
                        <div
                            className={styles.price}>{formatPrice(totalPriceProducts + totalPriceAdditionalServices)} сум
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default RightInformation
