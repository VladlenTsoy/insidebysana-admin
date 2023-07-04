import React, {useEffect} from "react"
import {Input, Menu, Table} from "antd"
import { Link } from "react-router-dom";
import { formatDate } from "utils/formatDate"
import { formatPhone } from "utils/formatPhone";
import { useCreateQueryMutation, useGetAllClientsQuery } from "../clientsApi"
import EditorClientsAction from "../editor-clients-action/EditorClientsAction";
import { EditOutlined } from "@ant-design/icons";
import { Client } from "../../../types/Client";
import MenuButton from "../../../components/menu-button/MenuButton";
import SourceRowBlock from "components/orders-table-block/SourceRowBlock";
import { useGetParams } from "features/clients/useGetParams";

const {Search} = Input

const menu = (client: Client) => (
    <Menu>
        <Menu.Item>
            <EditorClientsAction client={client}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorClientsAction>
        </Menu.Item>
        <Menu.Item>
            <Link to={{
                    pathname: "/clients/client/" + client.id,
                    state: client.id
                }}>
                Подробнее
            </Link>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "Имя",
        dataIndex: "full_name",
        key: "full_name",
        sorter: (a: any, b: any) => a.full_name.localeCompare(b.full_name),
        render: (title: string, record: any) => (
            <>
                <Link to={{
                    pathname: "/clients/client/" + record.id,
                    state: record.id 
                }}>
                    {title}
                </Link>
            </>
        )
    },
    {
        title: "Телефон",
        dataIndex: "phone",
        key: "phone",
        render: (phone: string) => formatPhone(phone)
    },
    {
        title: "Почта",
        dataIndex: "email",
        key: "email",
        sorter: true
    },
    {
        title: "Instagram",
        dataIndex: "instagram",
        key: "instagram",
    },
    {
        title: "Facebook",
        dataIndex: "facebook",
        key: "facebook",
    },
    {
        title: "Telegram",
        dataIndex: "telegram",
        key: "telegram",
    },
    {
        title: "Откуда",
        dataIndex: "source_id",
        key: "source_id",
        render: (source_id: string) => <SourceRowBlock sourdeId={+source_id}/>
    },
    {
        title: "Дата рождения",
        dataIndex: "date_of_birth",
        key: "date_of_birth",
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} size="large" />
    }
]

const ClientsTable = () => {
    const {params, updateParams} = useGetParams()
    const {data, isLoading} = useGetAllClientsQuery(params)
    const [fetchAllClients] = useCreateQueryMutation()

    const onSearchHandler = (val: string) => {
        updateParams("search", val)
    }
    
    const onChangeHandler = (pagination: any) => {
        updateParams("pagination", pagination)
    }

    useEffect(() => {
        const promise = fetchAllClients(params)
        return () => {
            promise.abort()
        }
    }, [fetchAllClients, params])

    return (
        <>
            <>
                <Search
                    placeholder="Введите имя"
                    allowClear
                    enterButton="Поиск"
                    size="large"
                    onSearch={onSearchHandler}
                    style={{marginBottom: "1.5rem"}}
                />
                <Table
                    loading={isLoading}
                    scroll={{x: "100%"}}
                    rowKey="id"
                    dataSource={data?.results}
                    columns={columns}
                    pagination={{...params.pagination, total: data?.total}}
                    onChange={onChangeHandler}
                />
            </>
        </>
    )
}

export default ClientsTable
