import React from "react"
import HeaderSettingTable from "components/header-setting-table/HeaderSettingTable"
import {Button, Menu, Table, Tag} from "antd"
import {Color} from "types/Color"
import {EditOutlined, EyeInvisibleOutlined, PlusOutlined} from "@ant-design/icons"
import {useGetAllColorsQuery} from "../colorApi"
import MenuButton from "../../../components/menu-button/MenuButton"
import HideItem from "./hide-item/HideItem"
import EditorColorAction from "./editor-color-action/EditorColorAction"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (record: Color) => (
    <Menu>
        <Menu.Item>
            <EditorColorAction color={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorColorAction>
        </Menu.Item>
        <Menu.Item>
            <HideItem color={record} />
        </Menu.Item>
        <Menu.Item danger>
            <DeleteItem color={record} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Цвет",
        dataIndex: "hex",
        render: (color: string) => (
            <div style={{borderRadius: "50%", background: color, width: "20px", height: "20px"}} />
        )
    },
    {
        title: "Название",
        dataIndex: "title",
        render: (title: string, record: any) => (
            <>
                {title}{" "}
                {!!record.hide_id && (
                    <Tag icon={<EyeInvisibleOutlined />} color="red">
                        Скрыт
                    </Tag>
                )}{" "}
            </>
        )
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]


const ColorSetting = () => {
    const {data, isLoading} = useGetAllColorsQuery()

    return (
        <>
            <HeaderSettingTable>
                <EditorColorAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить цвет
                    </Button>
                </EditorColorAction>
            </HeaderSettingTable>
            <Table columns={columns} rowKey="id" loading={isLoading} dataSource={data} pagination={false} />
        </>
    )
}

export default ColorSetting
