import React, {useCallback, useState} from "react"
import {useParams} from "react-router"
import HeaderPage from "../../layouts/header-page/HeaderPage"
import {SaveOutlined} from "@ant-design/icons"
import Container from "../../layouts/container/Container"
import OrderEditor from "../../features/order/order-editor/OrderEditor"

const Order = () => {
    const params = useParams<{id?: string}>()
    const [loading, setLoading] = useState(false)

    // Изменить состояние загрузки
    const updateLoading = useCallback((val: boolean) => setLoading(val), [])

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
                <OrderEditor updateLoading={updateLoading}/>
            </Container>
        </>
    )
}

export default Order
