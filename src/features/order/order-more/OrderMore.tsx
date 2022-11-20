import React from "react"
import {useGetOrderByIdQuery} from "../orderApi"
import {Col, Empty, Row, Typography} from "antd"
import LoadingBlock from "components/loading-block/LoadingBlock"
import ClientCard from "components/client-card/ClientCard"
import OrderInformation from "./OrderInformation"
import OrderPayments from "./OrderPayments"
import OrderProductTable from "../../order-product/order-product-table/OrderProductTable"
import OrderAdditionalServices from "./OrderAdditionalServices"
import OrderAddress from "./OrderAddress"

const {Title} = Typography

interface OrderMoreProps {
    id: string
}

const OrderMore: React.FC<OrderMoreProps> = ({id}) => {
    // Получить заказ по id
    const {data, isLoading} = useGetOrderByIdQuery(id)

    // Загрузка
    if (isLoading) return <LoadingBlock />
    // Пусто
    if (!data) return <Empty />

    return (
        <Row gutter={16}>
            <Col span={6}>
                <OrderInformation order={data} />
                {data.payments.length ? <OrderPayments payments={data.payments} /> : null}
                {data.address ? <OrderAddress address={data.address} /> : null}
                <ClientCard client={data.client} />
            </Col>
            <Col span={18}>
                <Title level={5} style={{marginBottom: "1.5rem"}}>Товары</Title>
                <OrderProductTable orderId={id} />
                <Title level={5} style={{marginTop: "1rem", marginBottom: "1.5rem"}}>Дополнительные услуги</Title>
                <OrderAdditionalServices additionalServices={data.additionalServices} />
            </Col>
        </Row>
    )
}

export default OrderMore
