import React from 'react';
import { useGetClientOrdersQuery } from '../clientsApi';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'antd';
import { formatDate } from 'utils/formatDate';
import { formatPrice } from 'utils/formatPrice';
import type { ColumnsType } from "antd/es/table";
import { IClientOrder } from 'types/Client'
import { useGetParams } from '../useGetParams';

const columns: ColumnsType<IClientOrder> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Менеджер",
        dataIndex: "user",
        key: "user",
        render: (user) => user?.full_name
    },
    {
        title: "Статус оплаты",
        dataIndex: "payment_state",
        key: "payment_state",
        render: (payment) => {
            if (payment === 1) {
                return 'Оплачено'
            } else if (payment === -1) {
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
        render: (price) => formatPrice(price) + ' сум'
    },
    {
        title: "Статус заказа",
        dataIndex: "status",
        key: "status",
        render: (status) => status?.title || "Без статуса"
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        defaultSortOrder: "descend" as "descend",
        render: (created) => formatDate(created)
    },
    {
        render: (_, record) => <Link to={{ pathname: "/orders/order/more/" + record.id }}>Подробнее</Link>
    }
]

const ClientOrders: React.FC = () => {
    const client = useParams<{ id: string }>()
    const { data, isLoading } = useGetClientOrdersQuery(client.id)
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
                style={{ marginBottom: '50px' }}
            />
        </>
    )
}

export default ClientOrders;
