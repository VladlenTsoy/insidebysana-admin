import React from "react"
import {Input, Form} from "antd"
import {useForm} from "antd/es/form/Form"
import {Banner} from "types/Banner"
import {useCreateBannerMutation, useEditBannerMutation} from "../../../bannerApi"
import InputImage from "../../../../../components/input-image/InputImage"

interface EditorSourceProps {
    setLoading: any
    close: any
    banner?: Banner
}

const EditorBanner: React.FC<EditorSourceProps> = ({setLoading, close, banner}) => {
    const [form] = useForm()
    const [createBanner] = useCreateBannerMutation()
    const [editBanner] = useEditBannerMutation()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (banner) await editBanner({id: banner.id, data: values})
        else await createBanner(values)
        setLoading(false)
        close()
    }

    return (
        <Form
            id="editor-banner"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            form={form}
            initialValues={banner}
        >
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <InputImage
                text="Десктоп"
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <InputImage
                text="Мобильная"
                name="url_image_mobile"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item
                name="button_title"
                label="Название Кнопки"
                rules={[{required: true, message: "Введите название кнопки!"}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="button_link"
                label="Ссылку Кнопки"
                rules={[{required: true, message: "Введите ссылку кнопки!"}]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorBanner
