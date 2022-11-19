import React from "react"
import ImageBlock from "components/image-block/ImageBlock"
import PriceBlock from "components/price-block/PriceBlock"
import {Table} from "antd"
import {useGetOrderProductsByIdQuery} from "../orderProductApi"

const columns = [
    {
        title: "SKU",
        // dataIndex: ["details", "id"]
        render: (_: any, record: any) => `PC${record.details.id}S${record.size.id}`
    },
    {
        title: "Картинка",
        dataIndex: ["details", "url_thumbnail"],
        render: (url_thumbnail: string) => (
            <div style={{width: "70px"}}>
                <ImageBlock image={url_thumbnail} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: ["details", "title"]
    },
    {
        title: "Размер",
        dataIndex: ["size", "title"]
    },
    {
        title: "Кол-во",
        dataIndex: ["qty"]
    },
    {
        title: "Цена",
        render: (_: any, product: any) => (
            <PriceBlock
                price={product.price}
                discount={product.discount ? {discount: product.discount} : undefined}
            />
        )
    },
    {
        title: "Сумма",
        render: (_: any, product: any) =>
            product.promotion && product.qty === 1 ? (
                `Бесплатно`
            ) : (
                <PriceBlock
                    price={
                        product.price * (product.promotion && product.qty > 1 ? product.qty - 1 : product.qty)
                    }
                    discount={product.discount ? {discount: product.discount} : undefined}
                />
            )
    }
]

interface OrderProductTableProps {
    orderId: string
}

const OrderProductTable: React.FC<OrderProductTableProps> = ({orderId}) => {
    const {data, isLoading} = useGetOrderProductsByIdQuery(orderId)

    return (
        <Table
            loading={isLoading}
            dataSource={data}
            columns={columns}
            pagination={false}
            size="large"
            rowKey={(row: any) => `${row.details.id}${row.size.id}`}
        />
    )
}

export default OrderProductTable
