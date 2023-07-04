import React, { useState } from 'react';
import { useGetClientOrdersQuery } from '../clientsApi';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'antd';
import { formatDate } from 'utils/formatDate';
import { formatPrice } from 'utils/formatPrice';

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Менеджер",
        dataIndex: "user",
        key: "user",
        render: (user: any) => user?.full_name
    },
    {
        title: "Статус оплаты",
        dataIndex: "payment_state",
        key: "payment_state",
        render: (payment: number) => {
            if (payment === 1) {
                return 'Оплачено'
            } else if(payment === -1) {
                return 'Отменен'
            } else {
                return 'Ожидание'
            }
        }   
    },
    {
        title: "Общая сумма",
        dataIndex: "total_price",
        key: "total_price",
        render: (price: string) => formatPrice(price) + ' сум'
    },
    {
        title: "Статус заказа",
        dataIndex: "status",
        key: "status",
        render: (status: any) => status?.title || "Без статуса"
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: undefined, record: any) => <Link to={{pathname: "/orders/order/more/" + record.id}}>Подробнее</Link>
    }
]
const ClientOrders = () => {
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})
    
    const onChangeHandler = (pagination: any) => {
        setPagination(pagination)
    }

    const params = useParams<{id: string}>()
    const {data, isLoading} = useGetClientOrdersQuery(params.id)
    
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
            style={{marginBottom: '50px'}}
        />
    </>
    )
}


export default ClientOrders;




