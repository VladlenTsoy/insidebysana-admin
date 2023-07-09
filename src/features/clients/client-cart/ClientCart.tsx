import React from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { useGetClientCartQuery } from '../clientsApi';
import ImageBlock from 'components/image-block/ImageBlock';
import PriceBlock from 'components/price-block/PriceBlock';
import Details from 'features/product/product-list/Details';
import type { ColumnsType } from "antd/es/table";
import { IClientCart } from 'types/Client';
import { useGetParams } from '../useGetParams';

const columns: ColumnsType<IClientCart> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "SKU",
        dataIndex: "sku",
    },
    {
        title: "Картинка",
        dataIndex: "url_thumbnail",
        render: (url_thumbnail) => (
            <div style={{ width: "70px" }}>
                <ImageBlock image={url_thumbnail} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title",
        render: (title, record) => <Details title={title} product={record} />
    },
    {
        title: "Размер",
        dataIndex: "size",
        render: (size) => size.title
    },
    {
        title: "Количество",
        dataIndex: "qty",
    },
    {
        title: "Цена",
        render: (_, record) => (
            <PriceBlock
                price={record.price}
                discount={record.discount ? record.discount : undefined}
            />
        )
    },
    {
        title: "Сумма",
        render: (_, product) => (
            <PriceBlock
                price={product.price * product.qty}
            />
        )
    },
]
const ClientCart: React.FC = () => {
    const client = useParams<{ id: string }>()
    const { data, isLoading } = useGetClientCartQuery(client.id)
    const { params, updateParams } = useGetParams()

    const onChangeHandler = (pagination: any) => {
        updateParams("pagination", pagination)
    }

    return (
        <>
            <Table
                loading={isLoading}
                scroll={{ x: "100%" }}
                rowKey="id"
                dataSource={data}
                columns={columns}
                pagination={{ ...params.pagination }}
                onChange={onChangeHandler}
            />
        </>
    )
}


export default ClientCart;




