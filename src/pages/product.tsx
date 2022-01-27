import React from "react"
import {useParams} from "react-router"
import {useCreateProductMutation, useEditProductMutation, useGetProductByIdQuery} from "features/product/productApi"
import LoadingBlock from "components/loading-block/LoadingBlock"
import HeaderPage from "layouts/header-page/HeaderPage"
import Container from "layouts/container/Container"
import ProductEditor from "../features/product/product-editor/ProductEditor"
import {SaveOutlined} from "@ant-design/icons"

const Product = () => {
    const params = useParams<{id: string, color?: string}>()
    // Загрузка продукта
    const {data, isFetching} = useGetProductByIdQuery(params?.id, {skip: !params?.id})
    // Создать продукт
    const [createProduct, {isLoading: isCreateLoading}] = useCreateProductMutation()
    // Обновить продукт
    const [updateProduct, {isLoading: isUpdateLoading}] = useEditProductMutation()
    // Загрузка...
    if (isFetching) return <LoadingBlock />

    return (
        <>
            <HeaderPage
                title={params.id ? `Изменить товар` : `Добавить товар`}
                action={[{
                    type: "primary",
                    icon: <SaveOutlined />,
                    form: "editor-product",
                    htmlType: "submit",
                    loading: isCreateLoading || isUpdateLoading,
                    text: "Сохранить"
                }]}
            />
            <Container>
                <ProductEditor
                    product={data}
                    createProduct={createProduct}
                    updateProduct={updateProduct}
                />
            </Container>
        </>
    )
}

export default Product
