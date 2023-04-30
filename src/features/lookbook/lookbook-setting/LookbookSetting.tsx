import React from "react"
import {useGetAllLookbookCategoriesQuery} from "../lookbookApi"
import {LookbookCategory} from "../../../types/Lookbook"
import {Button, Dropdown, Menu, Table} from "antd"
import EditorLookbookCategoryAction from "./editor-lookbook-category-action/EditorLookbookCategoryAction"
import {DownOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import DeleteItem from "./delete-item/DeleteItem"
import ImageBlock from "../../../components/image-block/ImageBlock"
import MenuButton from "../../../components/menu-button/MenuButton"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"
import EditorLookbookAction from "./editor-lookbook-action/EditorLookbookAction"
import TableLookbook from "./TableLookbook"

const headerMenu = (
    <Menu>
        <Menu.Item key="1" icon={<PlusOutlined />}>
            <EditorLookbookCategoryAction>
                <span>Категорию</span>
            </EditorLookbookCategoryAction>
        </Menu.Item>
        <Menu.Item key="2" icon={<PlusOutlined />}>
            <EditorLookbookAction>
                <span>Lookbook</span>
            </EditorLookbookAction>
        </Menu.Item>
    </Menu>
)

const menu = (lookbookCategory: LookbookCategory) => (
    <Menu>
        <Menu.Item>
            <EditorLookbookCategoryAction lookbookCategory={lookbookCategory}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorLookbookCategoryAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem lookbookCategory={lookbookCategory} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Картинка",
        dataIndex: "url_image",
        render: (image: string) => (
            <div style={{width: "140px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        render: (_: any, record: LookbookCategory) => <MenuButton overlay={menu(record)} />
    }
]

const LookbookSetting = () => {
    const {isLoading, data} = useGetAllLookbookCategoriesQuery()

    const expandedRowRender = (column: any) => {
        return <TableLookbook categoryId={column.id} />
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

export default LookbookSetting
