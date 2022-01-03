import React from "react"
import {useParams} from "react-router"
import {useCreateProductMutation, useEditProductMutation, useGetProductByIdQuery} from "features/product/productApi"
import LoadingBlock from "components/loading-block/LoadingBlock"
import {Button} from "antd"
import HeaderPage from "layouts/header-page/HeaderPage"
import Container from "layouts/container/Container"
import ProductEditor from "../features/product/product-editor/ProductEditor"

const Product = () => {
    const params = useParams<{id: string, color?: string}>()
    const {data, isFetching} = useGetProductByIdQuery(params?.id, {
        skip: !params?.id
    })
    const [
        createProduct,
        {isLoading: isCreateLoading}
    ] = useCreateProductMutation()
    const [
        updateProduct,
        {isLoading: isUpdateLoading}
    ] = useEditProductMutation()

    if (isFetching) return <LoadingBlock />

    return (
        <>
            <HeaderPage
                title={params.id ? `Изменить товар` : `Добавить товар`}
                action={
                    <Button
                        type="primary"
                        size="large"
                        form="editor-product"
                        htmlType="submit"
                        loading={isCreateLoading || isUpdateLoading}
                    >
                        Сохранить
                    </Button>
                }
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