import React from "react"
import styles from "./SelectedProductCard.module.less"
import {OrderProduct} from "types/Order"
import ImageBlock from "components/image-block/ImageBlock"
import Counter from "components/counter/Counter"

interface SelectedProductCardProps {
    product: OrderProduct;
    updateProductQty: (
        {
            size_id,
            product_color_id,
            qty
        }: {
            size_id: number
            product_color_id: number
            qty: number
        }
    ) => void;
}

const SelectedProductCard: React.FC<SelectedProductCardProps> = ({product, updateProductQty}) => {
    // const

    return (
        <div className={styles.productCard}>
            <div className={styles.wrapperImage}>
                <div className={styles.image}>
                    <ImageBlock image={product.product.url_thumbnail} />
                </div>
            </div>
            <div className={styles.title}>{product.product.title}</div>
            <div className={styles.actions}>
                <Counter
                    onChange={value => {
                        updateProductQty({
                            size_id: product.size_id,
                            product_color_id: product.product_color_id,
                            qty: value
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default SelectedProductCard
