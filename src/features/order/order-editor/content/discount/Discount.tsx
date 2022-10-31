import {CloseOutlined, DollarOutlined, PercentageOutlined} from "@ant-design/icons"
import {Button, InputNumber, Radio} from "antd"
import React, {Dispatch, SetStateAction} from "react"
import {formatPrice} from "utils/formatPrice"
import styles from "./Discount.module.less"
import {OrderDiscount} from "types/Order"
import cn from "classnames"

const plainOptions = [
    {label: <PercentageOutlined />, value: "percent"},
    {label: <DollarOutlined />, value: "fixed"}
]

interface DiscountProps {
    discount: OrderDiscount
    setDiscount: Dispatch<SetStateAction<OrderDiscount>>
}

const Discount: React.FC<DiscountProps> = ({discount, setDiscount}) => {

    const onTypeChangeHandler = (e: any) => setDiscount(prevState => ({...prevState, type: e.target.value}))

    const onValueChangeHandler = (e: any) => setDiscount(prevState => ({...prevState, discount: e}))

    const onCLickHandler = () => setDiscount({discount: 0, type: "percent"})

    return (
        <div className={styles.createOrderDiscount}>
            <Radio.Group
                value={discount.type}
                options={plainOptions}
                optionType="button"
                buttonStyle="solid"
                size="large"
                className={styles.discountRadio}
                onChange={onTypeChangeHandler}
            />
            <div className={cn(styles.discountInput, {[styles.sum]: discount.type === "fixed"})}>
                <InputNumber
                    type="tel"
                    size="large"
                    onChange={onValueChangeHandler}
                    min={0}
                    value={discount.discount}
                    {...(discount.type === "fixed" ? {formatter: val => formatPrice(Number(val))} : {max: 100})}
                />
                <span className="icon">{discount.type === "fixed" ? "сум" : "%"}</span>
            </div>
            <Button danger size="large" icon={<CloseOutlined />} shape="circle" onClick={onCLickHandler} />
        </div>
    )
}
export default Discount
