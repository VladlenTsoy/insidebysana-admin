import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { useGetClientWishlistQuery } from '../clientsApi';
import "./clientWishlist.less"
import ImageBlock from 'components/image-block/ImageBlock';
import PriceBlock from 'components/price-block/PriceBlock';
import Details from 'features/product/product-list/Details';
import type { ColumnsType } from "antd/es/table";
import { IClientWishlist } from 'types/Client';
import { useGetParams } from '../useGetParams';

const columns: ColumnsType<IClientWishlist> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
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
        title: "Цена",
        render: (_, product) => (
            <PriceBlock
                price={product.price}
                discount={product?.discount?.discount ? { discount: product?.discount?.discount } : undefined}
            />
        )
    },
]

const ClientWishlist: React.FC = () => {
    const client = useParams<{ id: string }>()
    const { data, isLoading } = useGetClientWishlistQuery(client.id)
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


export default ClientWishlist;




