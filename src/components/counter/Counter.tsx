import React, {useState} from "react"
import styles from "./Counter.module.less"
import {Button} from "antd"
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons"

interface CounterProps {
    defaultValue?: number
    onChange: (value: number) => void,
    onDelete?: () => void,
    min?: number
    max?: number
}

const Counter: React.FC<CounterProps> = ({defaultValue = 0, onChange, onDelete, max = Infinity, min = 0}) => {
    const [qty, setQty] = useState<number>(defaultValue)

    const onMinus = () => {
        const updateQty = qty <= min ? min : qty - 1
        onChange(updateQty)
        setQty(updateQty)
    }

    const onPlus = () => {
        const updateQty = qty >= max ? max : qty + 1
        onChange(updateQty)
        setQty(updateQty)
    }

    return (
        <div className={styles.actions}>
            <div className={styles.minus}>
                <Button
                    disabled={!!onDelete ? false : qty <= min}
                    type="primary"
                    danger={qty <= min && !!onDelete}
                    className="blue"
                    shape="circle"
                    size="large"
                    icon={!!onDelete && qty <= min ? <DeleteOutlined /> : <MinusOutlined />}
                    onClick={() => qty <= min && !!onDelete ? onDelete() : onMinus()}
                />
            </div>
            <div className={styles.count}>
                {qty}
            </div>
            <div className={styles.plus}>
                <Button
                    disabled={qty >= max}
                    type="primary"
                    className="blue"
                    shape="circle"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => onPlus()}
                />
            </div>
        </div>
    )
}

export default Counter
