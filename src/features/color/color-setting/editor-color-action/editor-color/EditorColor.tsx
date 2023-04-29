import React, {useState} from "react"
import {Form, Input} from "antd"
import styles from "./EditorColor.module.less"
import {HexColorPicker} from "react-colorful"
import "react-colorful/dist/index.css"
import {Color} from "types/Color"
import {useCreateColorMutation, useEditColorMutation} from "../../../colorApi"

interface EditorColorProps {
    setLoading: any
    close: any
    color?: Color
}

const EditorColor: React.FC<EditorColorProps> = ({setLoading, close, color}) => {
    const [hex, setHex] = useState(color?.hex || "#000")
    const [creatColor] = useCreateColorMutation()
    const [editColor] = useEditColorMutation()

    const handleChangeComplete = (hex: Color["hex"]) => {
        setHex(hex)
    }

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (color)
            await editColor({id: color.id, data: {...values, hex}})
        else
            await creatColor({...values, hex})
        setLoading(false)
        close()
    }

    return (
        <Form onFinish={onFinishHandler} id="editor-color-modal" layout="vertical" size="large" initialValues={color}>
            <Form.Item label="Название" required name="title">
                <Input required placeholder="Наззвание цвета" />
            </Form.Item>
            <div className={styles.wrapperColorPicker}>
                <div>
                    <div className={styles.selectColor} style={{background: hex}} />
                </div>
                <div>
                    <HexColorPicker color={hex} onChange={handleChangeComplete} />
                </div>
            </div>
        </Form>
    )
}

export default React.memo(EditorColor)
