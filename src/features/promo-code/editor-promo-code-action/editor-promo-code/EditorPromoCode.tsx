import React from "react"
import {PromoCode} from "types/PromoCode"
import {Form, Input, Select} from "antd"
import {useCreatePromocodeMutation, useEditPromocodeMutation} from "../../promocodeApi"

interface EditorPromoCodeProps {
    promoCode?: PromoCode
    close: any
    setLoading: any
}

const EditorPromoCode: React.FC<EditorPromoCodeProps> = ({promoCode, close, setLoading}) => {
    const [createPromoCode] = useCreatePromocodeMutation()
    const [editPromoCode] = useEditPromocodeMutation()

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (promoCode)
            await editPromoCode({id: promoCode.id, data: values})
        else
            await createPromoCode(values)
        setLoading(false)
        close()
    }

    return (
        <Form
            onFinish={onFinishHandler}
            id="editor-promo-code-modal"
            layout="vertical"
            size="large"
            initialValues={promoCode}
        >
            <Form.Item label="Код" required name="code">
                <Input placeholder="Введите код" />
            </Form.Item>
            <Form.Item label="Тип" required name="type">
                <Select>
                    <Select.Option value="percent">В процентах</Select.Option>
                    <Select.Option value="fixed">Фиксированная</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Размер скидки" required name="discount">
                <Input placeholder="Введите размер скидки" />
            </Form.Item>
        </Form>
    )
}

export default EditorPromoCode
