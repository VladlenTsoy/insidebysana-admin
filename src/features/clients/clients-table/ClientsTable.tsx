import React, {useState} from "react"
import {Input, Menu, Table} from "antd"
import { Link } from "react-router-dom";
import { formatDate } from "utils/formatDate"
import { formatPhone } from "utils/formatPhone";
import { useGetAllClientsQuery } from "../clientsApi"
import EditorClientsAction from "../editor-clients-action/EditorClientsAction";
import { EditOutlined } from "@ant-design/icons";
import { Client } from "../../../types/Client";
import MenuButton from "../../../components/menu-button/MenuButton";
import SourceRowBlock from "components/orders-table-block/SourceRowBlock";

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
        sorter: true,
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
        sorter: true,
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true,
        defaultSortOrder: "descend" as "descend",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} size="large" />
    }
]

const ClientsTable = () => {
    const [search, setSearch] = useState("")
    const [sorter, setSorter] = useState({
        field: "created_at",
        order: "descend"
    })
    const [pagination, setPagination] = useState({current: 1, pageSize: 20})
    const {data, isLoading} = useGetAllClientsQuery({search, sorter, pagination})

    const onSearchHandler = (val: string) => {
        setSearch(val)
    }

    const onChangeHandler = (pagination: any, filters: any, sorter: any) => {
        setSorter({
            field: sorter.field,
            order: sorter.order
        })
        setPagination(pagination)
    }

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
                    pagination={{...pagination, total: data?.total}}
                    onChange={onChangeHandler}
                />
            </>
        </>
    )
}

export default ClientsTable
