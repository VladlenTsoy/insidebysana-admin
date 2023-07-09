import React from "react"
import { Button, Tabs } from "antd"
import { useHistory, useParams } from "react-router-dom"
import { useGetClientQuery } from "features/clients/clientsApi"
import LoadingBlock from "components/loading-block/LoadingBlock"
import HeaderPage from "layouts/header-page/HeaderPage"
import EditorClientsAction from "features/clients/editor-clients-action/EditorClientsAction"
import { EditOutlined } from "@ant-design/icons"
import ClientInfo from "features/clients/client-info/ClientInfo"
import ClientOrders from "features/clients/client-orders/ClientOrders"
import ClientWishlist from "features/clients/clients-wishlist/ClientWishlist"
import Container from "layouts/container/Container"
import ClientCart from "features/clients/client-cart/ClientCart"

const { TabPane } = Tabs;

type TabType = "orders" | "wishlist" | "cart"

const ClientProfile = () => {
    const params = useParams<{ id: string, tab: TabType }>()
    const history = useHistory()
    const { data, isLoading } = useGetClientQuery(params.id)

    const removeQueryParams = (tab: string) => {
        history.push(`/clients/client/${params.id}/${tab}`)
    }

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
                    linkBack="/clients/"
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
                    <Tabs
                        defaultActiveKey={'orders'}
                        activeKey={params.tab}
                        onTabClick={removeQueryParams}
                    >
                        <TabPane tab="Сделки" key="orders">
                            <ClientOrders />
                        </TabPane>
                        <TabPane tab="Избранное" key="wishlist">
                            <ClientWishlist />
                        </TabPane>
                        <TabPane tab="Корзина" key="cart">
                            <ClientCart />
                        </TabPane>
                    </Tabs>
                </Container>
            </>
        )
    }
}


export default ClientProfile
