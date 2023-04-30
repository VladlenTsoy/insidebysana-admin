import React from "react"
import {Form, Input} from "antd"
import {useForm} from "antd/es/form/Form"
import {LookbookCategory} from "types/Lookbook"
import {useCreateLookbookCategoryMutation, useEditLookbookCategoryMutation} from "../../lookbookApi"
import InputImage from "components/input-image/InputImage"

interface EditorLookbookCategoryProps {
    setLoading: any
    close: any
    lookbookCategory?: LookbookCategory
}

const EditorLookbookCategory: React.FC<EditorLookbookCategoryProps> = ({
    setLoading,
    close,
    lookbookCategory
}) => {
    const [form] = useForm()
    const [createLookbookCategory] = useCreateLookbookCategoryMutation()
    const [editLookbookCategory] = useEditLookbookCategoryMutation()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (lookbookCategory) await editLookbookCategory({id: lookbookCategory.id, data: values})
        else await createLookbookCategory(values)
        setLoading(false)
        close()
    }

    return (
        <Form
            id="editor-lookbook-category"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            form={form}
            initialValues={lookbookCategory}
        >
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
        </Form>
    )
}

export default EditorLookbookCategory
