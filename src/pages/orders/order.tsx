import React, {useCallback, useState} from "react"
import {useParams} from "react-router"
import HeaderPage from "layouts/header-page/HeaderPage"
import {SaveOutlined} from "@ant-design/icons"
import Container from "layouts/container/Container"
import OrderEditor from "features/order/order-editor/OrderEditor"
import {useGetOrderForEditByIdQuery} from "features/order/orderApi"
import LoadingBlock from "../../components/loading-block/LoadingBlock"

const Order = () => {
    const params = useParams<{id?: string}>()
    const [loading, setLoading] = useState(false)
    const {data, isLoading} = useGetOrderForEditByIdQuery(params.id, {skip: !params.id})

    // Изменить состояние загрузки
    const updateLoading = useCallback((val: boolean) => setLoading(val), [])

    if (isLoading) return <LoadingBlock />

    return (
        <>
            <HeaderPage
                title={params.id ? `Изменить заказ` : `Создать заказ`}
                action={[
                    {
                        loading: loading,
                        type: "primary",
                        icon: <SaveOutlined />,
                        form: "editor-order-drawer",
                        htmlType: "submit",
                        text: "Сохранить"
                    }
                ]}
            />
            <Container>
                <OrderEditor updateLoading={updateLoading} order={data} />
            </Container>
        </>
    )
}

export default Order
