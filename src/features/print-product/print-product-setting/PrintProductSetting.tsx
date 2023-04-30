import React from "react"
import {PrintImage} from "../../../types/print/PrintImage"
import {Button, Menu, Space, Table} from "antd"
import EditorPrintImageAction
    from "../../print-image/print-image-setting/editor-print-image-action/EditorPrintImageAction"
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import EditorPrintProductAction from "./editor-print-product-action/EditorPrintProductAction"
import {PrintProduct} from "../../../types/print/PrintProduct"
import MenuButton from "../../../components/menu-button/MenuButton"
import ImageBlock from "../../../components/image-block/ImageBlock"
import {formatPrice} from "../../../utils/formatPrice"
import DeletePrintImageAction from "../../print-image/print-image-setting/DeletePrintImageAction"
import DeletePrintProductAction from "./DeletePrintProductAction"
import {useGetPrintProductsByImageIdQuery} from "../printProductApi"
import {useGetPrintImagesQuery} from "../../print-image/printImageApi"

const menu = (record: PrintImage) => (
    <Menu>
        <Menu.Item>
            <EditorPrintImageAction printImage={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorPrintImageAction>
        </Menu.Item>
        <Menu.Item>
            <DeletePrintImageAction printImage={record}>
                <span>
                    <DeleteOutlined /> Удалить
                </span>
            </DeletePrintImageAction>
        </Menu.Item>
    </Menu>
)

const _menu = (record: PrintProduct) => (
    <Menu>
        <Menu.Item>
            <EditorPrintProductAction printImageId={record.print_image_id} printProduct={record}>
                <span>
                    <EditOutlined /> Редактировать
                </span>
            </EditorPrintProductAction>
        </Menu.Item>
        <Menu.Item>
            <DeletePrintProductAction printProduct={record}>
                <span>
                    <DeleteOutlined /> Удалить
                </span>
            </DeletePrintProductAction>
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Категория",
        dataIndex: ["category", "title"]
    },
    {
        title: "Картинка",
        dataIndex: "url_thumbnail",
        render: (image: string) => (
            <div style={{width: "90px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Стоимость",
        dataIndex: "price",
        render: (price: number) => `${formatPrice(price)} сум`
    },
    {
        render: (_: undefined, record: any) => (
            <Space>
                <EditorPrintProductAction printImageId={record.id}>
                    <Button icon={<PlusOutlined />}>Товар</Button>
                </EditorPrintProductAction>
                <MenuButton overlay={menu(record)} />
            </Space>
        )
    }
]

const _columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Картинка",
        dataIndex: "url_thumbnail",
        render: (image: string) => (
            <div style={{width: "90px"}}>
                <ImageBlock image={image} title={""} />
            </div>
        )
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Товар",
        dataIndex: "title",
        render: (_: any, record: any) => `${record.product_color.title} (${record.product_color.color_title})`
    },
    {
        render: (_: undefined, record: any) => <MenuButton overlay={_menu(record)} />
    }
]

const TableRowRender: React.FC<{column: any}> = ({column}) => {
    const {data, isLoading} = useGetPrintProductsByImageIdQuery(column.id)

    return <Table columns={_columns} rowKey="id" dataSource={data} pagination={false} loading={isLoading} />
}


const PrintProductSetting = () => {
    const {data, isLoading} = useGetPrintImagesQuery()

    const expandedRowRender = (column: any) => {
        return <TableRowRender column={column} />
    }

    return (
        <>
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

export default PrintProductSetting
