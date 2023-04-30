import React from "react"
import {StopOutlined, FlagOutlined} from "@ant-design/icons"
import {PromoCode} from "types/PromoCode"
import {Modal} from "antd"
import {useEditPromocodeMutation} from "../../promocodeApi"

const {confirm} = Modal

interface StopItemProps {
    promoCode: PromoCode
}

const StopItem: React.FC<StopItemProps> = ({promoCode}) => {
    const [editPromoCode] = useEditPromocodeMutation()

    const clickStopHandler = async () => {
        confirm({
            type: "warning",
            title: `Остановить действие промокода?`,
            async onOk () {
                editPromoCode({id: promoCode.id, data: {...promoCode, status: "inactive"}})
            }
        })
    }

    const clickStartHandler = async () => {
        confirm({
            type: "warning",
            title: `Активировать промокод?`,
            async onOk () {
                editPromoCode({id: promoCode.id, data: {...promoCode, status: "active"}})
            }
        })
    }

    if (promoCode.status === "active")
        return (
            <div onClick={clickStopHandler}>
                <StopOutlined /> Остановить
            </div>
        )

    return (
        <div onClick={clickStartHandler}>
            <FlagOutlined /> Активировать
        </div>
    )
}

export default StopItem
