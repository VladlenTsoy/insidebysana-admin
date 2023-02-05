import React, {useCallback, useMemo} from "react"
import styles from "./SelectedProductCard.module.less"
import {OrderProduct} from "types/order/Order"
import ImageBlock from "components/image-block/ImageBlock"
import Counter from "components/counter/Counter"
import {DeleteProductType, UpdateProductQtyType} from "../SelectProduct"
import {formatDiscount} from "utils/formatDiscount"
import {formatPrice} from "utils/formatPrice"

interface SelectedProductCardProps {
    product: OrderProduct
    updateProductQty: UpdateProductQtyType
    deleteProduct: DeleteProductType
}

type UpdateProductQtyHandlerType = (value: number) => void

/**
 * Карточка товара
 * @param product
 * @param updateProductQty
 * @param deleteProduct
 * @constructor
 */
const SelectedProductCard: React.FC<SelectedProductCardProps> = ({product, updateProductQty, deleteProduct}) => {
    // Максимальное кол-во
    const maxQty = useMemo(() =>
        product.product.sizes.find(size => size.size_id === product.size_id)?.qty || 0, [product])
    // Размер
    const size = useMemo(() =>
        product.product.sizes.find(size => size.size_id === product.size_id), [product])

    // Изменить кол-во
    const updateProductQtyHandler = useCallback<UpdateProductQtyHandlerType>(value => {
            updateProductQty({
                size_id: product.size_id,
                product_color_id: product.product_color_id,
                qty: value
            })
        },
        [updateProductQty, product]
    )

    // Удаление продукта
    const deleteProductHandler = useCallback(() => {
        deleteProduct({product_color_id: product.product_color_id, size_id: product.size_id})
    }, [deleteProduct, product])

    return (
        <div className={styles.productCard}>
            {/* Контейнер для картинки */}
            <div className={styles.wrapperImage}>
                {/* Размер */}
                <div className={styles.color}>
                    <span className={styles.hex} style={{background: product.product.color.hex}} />
                    <span className={styles.title}>{product.product.color.title}</span>
                </div>
                {/* Скидка */}
                {product.product.discount && (
                    <div className={styles.discount}>-{formatDiscount(product.product.discount.discount)}%</div>
                )}
                {/* Место хранения */}
                {product.product.storage && <div className={styles.storage}>{product.product.storage.title}</div>}
                {/* Размер */}
                {size && <div className={styles.size}>{size.title}</div>}
                {/* Картинка */}
                <div className={styles.image}>
                    <ImageBlock image={product.product.url_thumbnail} />
                </div>
            </div>
            {/* Название */}
            <div className={styles.title}>{product.product.title}</div>
            {/* Скидка */}
            {product.product.discount &&
                <div className={styles.priceDiscount}>{formatPrice(product.product.details.price)} сум</div>}
            {/* Стоимость */}
            <div className={styles.price}>{formatPrice(product.product.details.price, product.product.discount)} сум
            </div>
            {/* Кнопки */}
            <div className={styles.actions}>
                <Counter
                    max={maxQty}
                    min={1}
                    defaultValue={product.qty}
                    onChange={updateProductQtyHandler}
                    onDelete={deleteProductHandler}
                />
            </div>
        </div>
    )
}

export default SelectedProductCard
