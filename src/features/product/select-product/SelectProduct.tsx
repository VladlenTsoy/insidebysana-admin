import React from "react"
import styles from "./SelectProduct.module.less"
import {Typography} from "antd"
import {PlusOutlined} from "@ant-design/icons"

const {Title} = Typography

const SelectProduct = () => {
    return (
        <>
            <Title level={3}>Товары</Title>
            <div className={styles.container}>
                <div className={styles.addProduct}>
                    <div className={styles.content}>
                        <div className={styles.addProductIcon}>
                            <PlusOutlined />
                        </div>
                        <div className={styles.addProductText}>Добавить</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectProduct
