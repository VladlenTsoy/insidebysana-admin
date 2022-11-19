import React from "react"
import {useParams} from "react-router"
import HeaderPage from "layouts/header-page/HeaderPage"
import Container from "layouts/container/Container"
import OrderMore from "../../features/order/order-more/OrderMore"

const More = () => {
    const params = useParams<{id: string}>()

    return (
        <>
            <HeaderPage title={`Заказ #${params.id}`} />
            <Container>
                <OrderMore id={params.id} />
            </Container>
        </>
    )
}

export default More
