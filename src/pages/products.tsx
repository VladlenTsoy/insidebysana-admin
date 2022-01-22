import React from "react"
import HeaderPage from "../layouts/header-page/HeaderPage"
import {Link} from "react-router-dom"
import {Button} from "antd"
import {PlusOutlined, SkinOutlined} from "@ant-design/icons"
import {useHistory, useLocation, useParams} from "react-router-dom"
import Tabs, {Tab} from "components/tabs/Tabs"
import Container from "../layouts/container/Container"
import ProductList from "../features/product/product-list/ProductList"

type StatusType = "all" | "draft" | "published" | "ending" | "archive"

const statusTabs = [
    {name: "Все продукты", status: "all"},
    {name: "В проекте", status: "draft"},
    {name: "Опубликованные", status: "published"},
    {name: "Закончились", status: "ending"},
    {name: "Архив", status: "archive"}
]

const Products = () => {
    const params = useParams<{status: StatusType}>()
    const history = useHistory()
    const location = useLocation()

    // Смена статусов
    const onChangeHandler = (status: string) =>
        history.push({pathname: `/products/${status}`, search: location.search})

    return (
        <>
            <HeaderPage
                title="Товары"
                action={
                    <Link to="/products/product/create">
                        <Button type="primary" size="large" icon={<PlusOutlined />}>
                            Добавить
                        </Button>
                    </Link>
                }
                icon={<SkinOutlined />}
                tabs
            />
            <Tabs defaultActiveKey={params.status || `all`} onChange={onChangeHandler}>
                {statusTabs.map(tab =>
                    <Tab tab={tab.name} key={tab.status} />
                )}
            </Tabs>
            <Container>
                <ProductList />
            </Container>
        </>
    )
}

export default Products