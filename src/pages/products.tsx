import React from "react"
import HeaderPage from "../layouts/header-page/HeaderPage"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { PlusOutlined, SkinOutlined } from "@ant-design/icons"
import Tabs, { Tab } from "components/tabs/Tabs"
import Container from "layouts/container/Container"
import ProductList from "features/product/product-list/ProductList"

type StatusType = "all" | "draft" | "published" | "ending" | "archive"

const statusTabs = [
    { name: "Все продукты", status: "all" },
    { name: "В проекте", status: "draft" },
    { name: "Опубликованные", status: "published" },
    { name: "Закончились", status: "ending" },
    { name: "Архив", status: "archive" }
]

const Products = () => {
    const params = useParams<{ status: StatusType }>()
    const history = useHistory()

    // Смена статусов
    const onChangeHandler = (status: string) => history.push({ pathname: `/products/${status}` })

    return (
        <>
            <HeaderPage
                title="Товары"
                action={[
                    {
                        type: "primary",
                        link: "/products/product/create",
                        icon: <PlusOutlined />,
                        text: "Добавить"
                    }
                ]}
                icon={<SkinOutlined />}
                tabs
            />
            <Tabs defaultActiveKey={params.status || `all`} onChange={onChangeHandler}>
                {statusTabs.map(tab => (
                    <Tab tab={tab.name} key={tab.status} />
                ))}
            </Tabs>
            <Container>
                <ProductList />
            </Container>
        </>
    )
}

export default Products
