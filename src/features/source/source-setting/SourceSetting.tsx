import React from "react"
import {Button, Menu, Table} from "antd"
import MenuButton from "components/menu-button/MenuButton"
import {useGetAllSourcesQuery} from "../sourceApi"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"
import {EditOutlined, PlusOutlined} from "@ant-design/icons"
import EditorSourceAction from "./editor-source-action/EditorSourceAction"
import {Source} from "../../../types/Source"

const menu = (record: Source) => (
    <Menu>
        <Menu.Item>
            <EditorSourceAction source={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorSourceAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Название",
        dataIndex: "title",
        key: "title"
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const SourceSetting = () => {
    const {data, isLoading} = useGetAllSourcesQuery()
    return (
        <>
            <HeaderSettingTable>
                <EditorSourceAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Создать ресурс
                    </Button>
                </EditorSourceAction>
            </HeaderSettingTable>
            <Table columns={columns} rowKey="id" loading={isLoading} dataSource={data} pagination={false} />
        </>
    )
}

export default SourceSetting
