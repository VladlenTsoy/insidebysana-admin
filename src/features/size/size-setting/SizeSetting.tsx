import React, {useEffect} from "react"
import {Button, Menu, Table, Tag} from "antd"
import {Size} from "types/Size"
import HideItem from "./hide-item/HideItem"
import DeleteItem from "./delete-item/DeleteItem"
import EditorSizeAction from "./editor-size-action/EditorSizeAction"
import {EditOutlined, EyeInvisibleOutlined, PlusOutlined} from "@ant-design/icons"
import MenuButton from "../../../components/menu-button/MenuButton"
import {useLoadingSizes, useSelectAllSizes} from "../sizeSelectors"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"
import {useDispatch} from "../../../store"
import {fetchSizes} from "../fetchSizes"

const menu = (record: Size) => (
    <Menu>
        <Menu.Item>
            <EditorSizeAction size={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorSizeAction>
        </Menu.Item>
        <Menu.Item>
            <HideItem size={record} />
        </Menu.Item>
        <Menu.Item danger>
            <DeleteItem size={record} />
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
        render: (title: string, record: any) => (
            <>
                {title}{" "}
                {!!record.hide_id && (
                    <Tag icon={<EyeInvisibleOutlined />} color="red">
                        Скрыт
                    </Tag>
                )}
            </>
        )
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={menu(record)} />
    }
]

const SizeSetting = () => {
    const loading = useLoadingSizes()
    const sizes = useSelectAllSizes()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchSizes())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <>
        <HeaderSettingTable>
            <EditorSizeAction>
                <Button type="primary" size="large" icon={<PlusOutlined />}>
                    Добавить размер
                </Button>
            </EditorSizeAction>
        </HeaderSettingTable>
        <Table columns={columns} rowKey="id" loading={loading} dataSource={sizes} pagination={false} />
    </>

}

export default SizeSetting
