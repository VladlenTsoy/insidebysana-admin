import React from "react"
import {Form, Input, Select} from "antd"
import {SubCategory} from "types/Category"
import {useForm} from "antd/es/form/Form"
import InputImage from "../../../../../components/input-image/InputImage"
import {useCreatePrintCategoryMutation, useEditPrintCategoryMutation} from "../../../printCategoryApi"
import {useGetAllCategoriesQuery} from "../../../../category/categoryApi"

const {Option} = Select

interface EditorCategoryProps {
    sub?: boolean
    category?: SubCategory
    setLoading: any
    close: any
}

const EditorPrintCategory: React.FC<EditorCategoryProps> = ({sub, setLoading, close, category}) => {
    const {data, isLoading} = useGetAllCategoriesQuery()
    const [editPrintCategory] = useEditPrintCategoryMutation()
    const [createPrintCategory] = useCreatePrintCategoryMutation()
    const [form] = useForm()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (category) await editPrintCategory({id: category.id, data: values})
        else await createPrintCategory(values)
        setLoading(false)
        close()
    }

    return (
        <Form
            initialValues={category}
            form={form}
            layout="vertical"
            id="editor-print-category"
            size="large"
            onFinish={onFinish}
        >
            {!sub && (
                <InputImage
                    name="url_image"
                    form={form}
                    rules={[{required: true, message: "Выберите картинку!"}]}
                />
            )}
            {sub && (
                <Form.Item
                    name="category_id"
                    label="Категорию"
                    rules={[{required: true, message: "Выберите категорию!"}]}
                >
                    <Select loading={isLoading}>
                        {data && data.map(category => (
                            <Option value={category.id} key={category.id}>
                                {category.title}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            )}
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorPrintCategory
