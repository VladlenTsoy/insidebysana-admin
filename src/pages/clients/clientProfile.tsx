import React from "react"
import {Button, Tabs} from "antd"
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

const { TabPane } = Tabs;

const ClientProfile = () => {
    const params = useParams<{id: string}>()
    const {data, isLoading} = useGetClientQuery(params.id)

    if (isLoading) return <LoadingBlock title="Загрузка страницы..." />

    if (!data) {
        return (
            <>
                <HeaderPage
                    title="Клиента не существует"
                    tabs
                />
            </>  
        )
    } else {
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Сделки" key="1">
                        <ClientOrders/>
                    </TabPane>
                    <TabPane tab="Избранное" key="2">
                        <ClientWishlist/>
                    </TabPane>
                    <TabPane tab="Корзина" key="3">
                        <ClientCart/>
                    </TabPane>
                </Tabs>
            </Container>
        </>
    )
    }
}


export default ClientProfile
