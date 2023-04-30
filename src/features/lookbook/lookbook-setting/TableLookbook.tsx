import {EditOutlined} from "@ant-design/icons"
import {Menu, Table} from "antd"
import DeleteItem from "./delete-lookbook-item/DeleteItem"
import React from "react"
import {Lookbook} from "../../../types/Lookbook"
import EditorLookbookAction from "./editor-lookbook-action/EditorLookbookAction"
import ImageBlock from "../../../components/image-block/ImageBlock"
import MenuButton from "../../../components/menu-button/MenuButton"
import {useGetLookbookByCategoryIdQuery} from "../lookbookApi"

const menu = (lookbook: Lookbook) => (
    <Menu>
        <Menu.Item>
            <EditorLookbookAction lookbook={lookbook}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorLookbookAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem lookbook={lookbook} />
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
        title: "Позиция",
        dataIndex: "position"
    },
    {
        render: (_: any, record: Lookbook) => <MenuButton overlay={menu(record)} />
    }
]

interface TableLookbookProps {
    categoryId: number
}

const TableLookbook: React.FC<TableLookbookProps> = ({categoryId}) => {
    const {isLoading, data} = useGetLookbookByCategoryIdQuery(categoryId)

    return (
        <>
            <Table dataSource={data} loading={isLoading} pagination={false} columns={columns} />
        </>
    )
}
export default TableLookbook
