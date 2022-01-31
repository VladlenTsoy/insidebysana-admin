import React from "react"
import HeaderPage from "../layouts/header-page/HeaderPage"
import {ContainerOutlined, DollarCircleOutlined, PlusOutlined, SettingOutlined} from "@ant-design/icons"
import Container from "../layouts/container/Container"
import StatusDropColumns from "../features/status/status-drop-columns/StatusDropColumns"

const Orders = () => {
    return (
        <>
            <HeaderPage
                title="Заказы"
                action={[
                    {type: "primary", text: "Создать", icon: <PlusOutlined />, link: "/orders/create"}
                ]}
                more={[
                    {text: "Архив", icon: <ContainerOutlined />, link: "/orders/archive"},
                    {text: "Настройка", icon: <SettingOutlined />}
                ]}
                icon={<DollarCircleOutlined />}
                tabs
            />
            <Container full>
                <StatusDropColumns />
            </Container>
        </>
    )
}

export default Orders
