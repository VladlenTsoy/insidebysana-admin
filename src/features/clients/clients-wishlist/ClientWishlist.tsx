import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { useGetClientWishlistQuery } from '../clientsApi';
import "./clientWishlist.less"
import ImageBlock from 'components/image-block/ImageBlock';
import PriceBlock from 'components/price-block/PriceBlock';
import Details from 'features/product/product-list/Details';

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Картинка",
        dataIndex: "url_thumbnail",
        render: (url_thumbnail: string) => (
            <div style={{width: "70px"}}>
                <ImageBlock image={url_thumbnail} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title",
        render: (title: any, record: any) => <Details title={title} product={record} />
    },
    {
        title: "Цена",
        render: (_: any, product: any) => (
            <PriceBlock
                price={product.price}
                discount={product?.discount?.discount ? {discount: product?.discount?.discount} : undefined}
            />
        )
    },
]
const ClientWishlist = () => {
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})
    
    const onChangeHandler = (pagination: any) => {
        setPagination(pagination)
    }

    const params = useParams<{id: string}>()
    const {data, isLoading} = useGetClientWishlistQuery(params.id)
    
    return (
    <>
        <Table
            loading={isLoading}
            scroll={{x: "100%"}}
            rowKey="id"
            dataSource={data}
            columns={columns}
            pagination={{...pagination, total: data?.total}}
            onChange={onChangeHandler}
        />
    </>
    )
}


export default ClientWishlist;




