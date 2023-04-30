import React from "react"
import {Form, Input, InputNumber, Select} from "antd"
import {useGetAllPrintCategoriesQuery} from "../../../print-category/printCategoryApi"
import {useCreatePrintImageMutation, useEditPrintImageMutation} from "../../printImageApi"
import {formatPrice} from "utils/formatPrice"
import InputImage from "components/input-image/InputImage"
import {PrintImage} from "types/print/PrintImage"

const {Option, OptGroup} = Select

interface EditorPrintImageProps {
    close: () => void
    printImage?: PrintImage
    changeLoading: (loading: boolean) => void
}

const EditorPrintImage: React.FC<EditorPrintImageProps> = ({changeLoading, close, printImage}) => {
    const [form] = Form.useForm()
    const {data, isLoading} = useGetAllPrintCategoriesQuery()
    const [createPrintImage] = useCreatePrintImageMutation()
    const [editPrintImage] = useEditPrintImageMutation()

    const onFinishHandler = async (values: any) => {
        changeLoading(true)
        if (printImage) await editPrintImage({id: printImage.id, data: values})
        else await createPrintImage(values)
        changeLoading(false)
        close()
    }

    return (
        <Form
            initialValues={printImage ? {...printImage, category_id: printImage.category.id} : {}}
            form={form}
            layout="vertical"
            id="editor-print-image"
            size="large"
            onFinish={onFinishHandler}
        >
            <InputImage
                name="url_image"
                form={form}
                rules={[{required: true, message: "Выберите картинку!"}]}
            />
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="category_id"
                label="Категорию"
                rules={[{required: true, message: "Выберите категорию!"}]}
            >
                <Select loading={isLoading} showSearch optionFilterProp="label">
                    {data && data.map(category => (
                        <OptGroup label={category.title} key={category.id}>
                            {category.sub_categories.map(category => (
                                <Option label={category.title} value={category.id} key={category.id}>
                                    {category.title}
                                </Option>
                            ))}
                        </OptGroup>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="price"
                label="Стоимость"
                rules={[{required: true, message: "Укажите стоимость!"}]}
            >
                <InputNumber
                    min={0}
                    style={{width: "100%"}}
                    formatter={value => formatPrice(Number(value))}
                />
            </Form.Item>
        </Form>
    )
}
export default EditorPrintImage
