import React from "react"
import {Table} from "antd"
import {Order} from "types/order/Order"
import PriceBlock from "components/price-block/PriceBlock"

const columns = [
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Кол-во",
        dataIndex: "qty"
    },
    {
        title: "Цена",
        dataIndex: "price"
    },
    {
        title: "Сумма",
        render: (_: any, product: any) => <PriceBlock price={product.price * product.qty} />
    }
]


interface OrderAdditionalServicesProps {
    additionalServices: Order["additionalServices"]
}

const OrderAdditionalServices: React.FC<OrderAdditionalServicesProps> = ({additionalServices}) => {
    return (
        <Table
            dataSource={additionalServices}
            columns={columns}
            pagination={false}
            size="large"
            rowKey={(row: any) => `${row.id}`}
        />
    )
}

export default OrderAdditionalServices
