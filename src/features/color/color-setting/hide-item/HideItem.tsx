import React from "react"
import {Modal} from "antd"
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
import {Color} from "types/Color"
import {useDisplayColorMutation, useHideColorMutation} from "../../colorApi"

interface HideItemProps {
    color: Color
}

const HideItem: React.FC<HideItemProps> = ({color}) => {
    const [display] = useDisplayColorMutation()
    const [hide] = useHideColorMutation()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите скрыть цвет?",
            async onOk() {
                await hide(color.id)
            }
        })
    }

    const clickDisplayHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите отобразить цвет?",
            async onOk() {
                await display(color.id)
            }
        })
    }

    if (color.hide_id)
        return (
            <div onClick={clickDisplayHandler}>
                <EyeOutlined /> Отображать
            </div>
        )
    return (
        <div onClick={clickHideHandler}>
            <EyeInvisibleOutlined /> Скрыть
        </div>
    )
}

export default HideItem
