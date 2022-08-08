import React, {useCallback, useState} from "react"
import styles from "./SelectProduct.module.less"
import {Typography, Drawer} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import SearchProductTable from "./SearchProductTable"
import SelectedProductCard from "./selected-product-card/SelectedProductCard"
import {OrderProduct} from "types/Order"

const {Title} = Typography

interface SelectProductProps {
    products: OrderProduct[]
    setProducts: any
    defaultActiveKey?: string
}

const SelectProduct: React.FC<SelectProductProps> = ({products, setProducts, defaultActiveKey}) => {
    const [visible, setVisible] = useState(false)

    const onOpenHandler = () => {
        setVisible(true)
    }

    const onCloseHandler = () => {
        setVisible(false)
    }

    const addProduct = useCallback(
        product => {
            setProducts((prevState: any) => [...prevState, {...product, qty: 1}])
        },
        [setProducts]
    )

    const updateProductQty = useCallback(
        ({size_id, product_color_id, qty}: {size_id: number, product_color_id: number, qty: number}) => {
            setProducts((prevState: any) =>
                prevState.map((product: any) => {
                    if (product.size_id === size_id && product.product_color_id === product_color_id)
                        product.qty = qty
                    return product
                })
            )
        },
        [setProducts]
    )

    const deleteProduct = useCallback(
        ({size_id, product_color_id}: any) => {
            setProducts((prevState: any) =>
                prevState.filter(
                    (product: any) =>
                        !(product.size_id === size_id && product.product_color_id === product_color_id)
                )
            )
        },
        [setProducts]
    )

    return (
        <>
            <Title level={3}>Товары</Title>
            <div className={styles.container}>
                {products.map(product =>
                    <SelectedProductCard
                        product={product}
                        key={`${product.product_color_id}-${product.size_id}`}
                        updateProductQty={updateProductQty}
                    />
                )}
                <div className={styles.addProduct} onClick={onOpenHandler}>
                    <div className={styles.content}>
                        <div className={styles.addProductIcon}>
                            <PlusOutlined />
                        </div>
                        <div className={styles.addProductText}>Добавить</div>
                    </div>
                </div>
            </div>
            <Drawer title="Добавить товар" visible={visible} onClose={onCloseHandler} width="1200px" footer={false}>
                <SearchProductTable
                    addProduct={addProduct}
                    addedProducts={products}
                    deleteProduct={deleteProduct}
                />
            </Drawer>
        </>
    )
}

export default SelectProduct
