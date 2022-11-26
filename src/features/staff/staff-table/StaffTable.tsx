import React, {useState} from "react"
import {Input, Menu, Table, Tag} from "antd"
import {formatDate} from "utils/formatDate"
import {User} from "types/User"
import EditorStaffAction from "../editor-staff-action/EditorStaffAction"
import {EditOutlined} from "@ant-design/icons"
import MenuButton from "../../../components/menu-button/MenuButton"
import {useGetAllStaffQuery} from "../staffApi"

const {Search} = Input


const menu = (user: User) => (
    <Menu>
        <Menu.Item>
            <EditorStaffAction user={user}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorStaffAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: true
    },
    {
        title: "Имя",
        dataIndex: "full_name",
        key: "full_name",
        sorter: true
    },
    {
        title: "Почта",
        dataIndex: "email",
        key: "email",
        sorter: true
    },
    {
        title: "Доступ",
        dataIndex: "access",
        key: "access",
        render: (access: string) => {
            return access === "admin" ? (
                <Tag color="red">Администратор</Tag>
            ) : access === "cashier" ? (
                <Tag color="blue">Кассир</Tag>
            ) : (
                <Tag color="green">Менеджер</Tag>
            )
        }
    },
    {
        title: "Дата",
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

const StaffTable = () => {
    const [search, setSearch] = useState("")
    const [sorter, setSorter] = useState({
        field: "created_at",
        order: "descend"
    })
    const [pagination, setPagination] = useState({current: 1, pageSize: 20})
    const {data, isLoading} = useGetAllStaffQuery({search, sorter, pagination})

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

export default StaffTable
