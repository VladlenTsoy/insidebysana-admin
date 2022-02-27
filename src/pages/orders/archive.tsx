import React from "react"
import HeaderPage from "../../layouts/header-page/HeaderPage"
import Container from "../../layouts/container/Container"
import OrdersArchive from "../../features/order/orders-archive-drawer/OrdersArchive"

interface ArchiveProps {}

const Archive: React.FC<ArchiveProps> = () => {
    return (
        <>
            <HeaderPage title="Архив заказов" />
            <Container full>
                <OrdersArchive />
            </Container>
        </>
    )
}

export default Archive
