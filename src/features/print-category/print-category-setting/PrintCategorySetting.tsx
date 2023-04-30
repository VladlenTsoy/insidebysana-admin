import React from "react"
import {Button, Dropdown, Menu, Table} from "antd"
import {SubCategory} from "../../../types/Category"
import {DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import DeleteCategoryAction from "./delete-category-action/DeleteCategoryAction"
import MenuButton from "../../../components/menu-button/MenuButton"
import ImageBlock from "../../../components/image-block/ImageBlock"
import {useGetAllPrintCategoriesQuery} from "../printCategoryApi"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"
import EditorPrintCategoryAction from "./editor-print-category-action/EditorPrintCategoryAction"

const headerMenu = (
    <Menu>
        <Menu.Item key="1" icon={<PlusOutlined />}>
            <EditorPrintCategoryAction>
                <span>Категорию</span>
            </EditorPrintCategoryAction>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
            <EditorPrintCategoryAction sub>
                <span>Подкатегорию</span>
            </EditorPrintCategoryAction>
        </Menu.Item>
    </Menu>
)

const menu = (record: SubCategory) => (
    <Menu>
        <Menu.Item>
            <EditorPrintCategoryAction sub={!!record.category_id} category={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorPrintCategoryAction>
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
        title: "Картинка",
        dataIndex: "url_image",
        render: (image: string) => (
            <div style={{width: "40px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
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

const _columns = [
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


const PrintCategorySetting = () => {
    const {data, isLoading} = useGetAllPrintCategoriesQuery()

    const expandedRowRender = (column: any) => {
        return <Table columns={_columns} rowKey="id" dataSource={column.sub_categories} pagination={false} />
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
                columns={columns}
                rowKey="id"
                loading={isLoading}
                dataSource={data}
                expandable={{expandedRowRender}}
            />
        </>
    )
}

export default PrintCategorySetting
