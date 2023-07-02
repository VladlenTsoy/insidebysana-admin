import React from "react"
import {Button, Typography} from "antd"
import {useParams} from "react-router-dom"
import {useGetClientQuery} from "features/clients/clientsApi"
import LoadingBlock from "components/loading-block/LoadingBlock"
import HeaderPage from "layouts/header-page/HeaderPage"
import EditorClientsAction from "features/clients/editor-clients-action/EditorClientsAction"
import {EditOutlined} from "@ant-design/icons"
import ClientInfo from "features/clients/client-info/ClientInfo"
import ClientOrders from "features/clients/client-orders/ClientOrders"
import ClientWishlist from "features/clients/clients-wishlist/ClientWishlist"
import Container from "layouts/container/Container"
import ClientCart from "features/clients/client-cart/ClientCart"

const {Title} = Typography

const ClientProfile = () => {
    const params = useParams<{id: string}>()
    const {data, isLoading} = useGetClientQuery(params.id)

    if (isLoading) return <LoadingBlock title="Загрузка страницы..." />

    return (
        <>
            <HeaderPage
                title="Информация о клиенте"
                action={[
                    <EditorClientsAction client={data} key="editor-clients">
                        <Button type="primary" icon={<EditOutlined />} size="large">
                            Редактировать
                        </Button>
                    </EditorClientsAction>
                ]}
                tabs
            />
            <Container>
                <ClientInfo client={data} />
                <Title level={5} style={{marginBottom: "1.5rem"}}>Заказы</Title>
                <ClientOrders />
                <Title level={5} style={{marginTop: "1rem", marginBottom: "1.5rem"}}>Избранное</Title>
                <ClientWishlist />
                <Title level={5} style={{marginTop: "1rem", marginBottom: "1.5rem"}}>Корзина</Title>
                <ClientCart />
            </Container>
        </>
    )
}


export default ClientProfile
