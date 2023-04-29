import React from "react"
import {useGetAllCategoriesWithUrlQuery} from "../categoryApi"
import {Button, Dropdown, Menu, Table} from "antd"
import {SubCategory} from "../../../types/Category"
import EditorCategoryAction from "./editor-category-action/EditorCategoryAction"
import {DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import HideItem from "./hide-action/HideItem"
import DeleteCategoryAction from "./delete-category-action/DeleteCategoryAction"
import MenuButton from "../../../components/menu-button/MenuButton"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"

const headerMenu = (
    <Menu>
        <Menu.Item key="1" icon={<PlusOutlined />}>
            <EditorCategoryAction>
                <span>Категорию</span>
            </EditorCategoryAction>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
            <EditorCategoryAction sub>
                <span>Подкатегорию</span>
            </EditorCategoryAction>
        </Menu.Item>
    </Menu>
)

const menu = (record: SubCategory) => (
    <Menu>
        <Menu.Item>
            <EditorCategoryAction sub={!!record.category_id} category={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorCategoryAction>
        </Menu.Item>
        <Menu.Item>
            <HideItem category={record} />
        </Menu.Item>
        <Menu.Item danger>
            <DeleteCategoryAction category={record}>
                <span>
                    <DeleteOutlined /> Удалить
                </span>
            </DeleteCategoryAction>
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

const CategorySetting = () => {
    const {data: categories, isLoading} = useGetAllCategoriesWithUrlQuery()

    const expandedRowRender = (column: any) => {
        return <Table columns={columns} rowKey="id" dataSource={column.sub_categories} pagination={false} />
    }

    const checkRowClass = (record: any) => {
        if (record.hide_id) return "tr-block"
        return ""
    }

    return (
        <>
            <HeaderSettingTable>
                <Dropdown overlay={headerMenu}>
                    <Button type="primary" size="large">
                        Создать <DownOutlined />
                    </Button>
                </Dropdown>
            </HeaderSettingTable>
            <Table
                rowClassName={checkRowClass}
                columns={columns}
                rowKey="id"
                loading={isLoading}
                dataSource={categories}
                expandable={{expandedRowRender}}
                pagination={false}
            />
        </>
    )
}

export default CategorySetting
