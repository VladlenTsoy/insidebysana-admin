import React, {useEffect} from "react"
import HeaderPage from "../../layouts/header-page/HeaderPage"
import {ContainerOutlined, DeleteOutlined, DollarCircleOutlined, PlusOutlined, SettingOutlined} from "@ant-design/icons"
import Container from "../../layouts/container/Container"
import StatusDropColumns from "../../features/status/status-drop-columns/StatusDropColumns"
import {useDispatch} from "../../store"
import {fetchOrders} from "../../features/order/fetchOrders"

const Orders = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchOrders())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <HeaderPage
                title="Заказы"
                action={[{type: "primary", text: "Создать", icon: <PlusOutlined />, link: "/orders/create"}]}
                more={[
                    {text: "Архив", icon: <ContainerOutlined />, link: "/orders/archive"},
                    {text: "Настройка", icon: <SettingOutlined />, access: ["admin"]},
                    {text: "Корзина", icon: <DeleteOutlined />, link: "/orders/recycle-bin", access: ["admin"]}
                ]}
                icon={<DollarCircleOutlined />}
                tabs
            />
            <Container full padding="2rem 0">
                <StatusDropColumns />
            </Container>
        </>
    )
}

export default Orders
