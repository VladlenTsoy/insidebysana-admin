import React from "react"
import {Form, Input, Select} from "antd"
import {useForm} from "antd/es/form/Form"
import {Lookbook} from "types/Lookbook"
import {
    useCreateLookbookMutation,
    useEditLookbookMutation,
    useGetAllLookbookCategoriesQuery
} from "../../../lookbookApi"
import InputImage from "components/input-image/InputImage"

interface EditorLookbookProps {
    setLoading: any
    close: any
    lookbook?: Lookbook
}

const EditorLookbook: React.FC<EditorLookbookProps> = ({setLoading, close, lookbook}) => {
    const [form] = useForm()
    const {data, isLoading} = useGetAllLookbookCategoriesQuery()
    const [createLookbook] = useCreateLookbookMutation()
    const [editLookbook] = useEditLookbookMutation()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (lookbook) await editLookbook({id: lookbook.id, data: values})
        else await createLookbook(values)
        setLoading(false)
        close()
    }

    return (
        <Form
            id="editor-lookbook"
            onFinish={onFinish}
            size="large"
            layout="vertical"
            form={form}
            initialValues={lookbook}
        >
            <Form.Item
                name="category_id"
                label="Категория"
                rules={[{required: true, message: "Выберите категорию!"}]}
            >
                <Select loading={isLoading}>
                    {data && data.map(category => (
                        <Select.Option value={category.id} key={category.id}>
                            {category.title}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item
                name="position"
                label="Позиция"
                rules={[{required: true, message: "Введите позицию!"}]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorLookbook
