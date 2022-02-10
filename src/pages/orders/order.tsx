import React from "react"
import {useParams} from "react-router"
import HeaderPage from "../../layouts/header-page/HeaderPage"
import {SaveOutlined} from "@ant-design/icons"
import Container from "../../layouts/container/Container"

const Order = () => {
    const params = useParams<{id?: string}>()

    return (
        <>
            <HeaderPage
                title={params.id ? `Изменить заказ` : `Создать заказ`}
                action={[
                    {
                        type: "primary",
                        icon: <SaveOutlined />,
                        form: "editor-product",
                        htmlType: "submit",
                        text: "Сохранить"
                    }
                ]}
            />
            <Container></Container>
        </>
    )
}

export default Order
