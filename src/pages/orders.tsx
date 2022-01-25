import React from "react"
import HeaderPage from "../layouts/header-page/HeaderPage"
import {Link} from "react-router-dom"
import {Button} from "antd"
import {DollarCircleOutlined, PlusOutlined} from "@ant-design/icons"
import Container from "../layouts/container/Container"

const Orders = () => {
    return (
        <>
            <HeaderPage
                title="Заказы"
                action={
                    <Link to="/products/product/create">
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            Создать
                        </Button>
                    </Link>
                }
                icon={<DollarCircleOutlined />}
                tabs
            />
            <Container full>

            </Container>
        </>
    )
}

export default Orders
