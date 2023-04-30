import React from "react"
import {Form, Input} from "antd"
import {PrintProduct} from "types/print/PrintProduct"
import {useCreatePrintProductMutation, useEditPrintProductMutation} from "../../printProductApi"
import InputImage from "components/input-image/InputImage"
import SelectProducts from "components/old/select-products/SelectProducts"

interface EditorPrintProductProps {
    printImageId: number
    close: () => void
    printProduct?: PrintProduct
    changeLoading: (loading: boolean) => void
}

const EditorPrintProduct: React.FC<EditorPrintProductProps> = ({
    printProduct,
    close,
    changeLoading,
    printImageId
}) => {
    const [form] = Form.useForm()
    const [editPrintProduct] = useEditPrintProductMutation()
    const [createPrintProduct] = useCreatePrintProductMutation()

    const onFinishHandler = async (values: any) => {
        changeLoading(true)
        if (printProduct)
            await editPrintProduct({id: printProduct.id, data: {...values, print_image_id: printImageId}})
        else await createPrintProduct({...values, print_image_id: printImageId})
        changeLoading(false)
        close()
    }

    return (
        <Form
            initialValues={printProduct}
            form={form}
            layout="vertical"
            id="editor-print-product"
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
            <SelectProducts name="product_color_id" defautlValue={printProduct?.product_color_id} />
        </Form>
    )
}
export default EditorPrintProduct
