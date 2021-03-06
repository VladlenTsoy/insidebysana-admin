import React from "react"
import styles from "./NotificationCard.module.less"
import {CloseOutlined} from "@ant-design/icons"

const NotificationCard: React.FC = ({children}) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.title}>Размер закончился</div>
                <div className={styles.close}>
                    <CloseOutlined />
                </div>
            </div>
            <div className={styles.container}>{children}</div>
        </div>
    )
}

export default NotificationCard