import React, {useEffect} from "react"
import {useLoadingAdditionalServices, useSelectAllAdditionalServices} from "../additionalServiceSlice"
import {useDispatch} from "../../../store"
import {fetchAdditionalServices} from "../fetchAdditionalServices"
import {Button, Menu, Table, Tag} from "antd"
import {EditOutlined, PlusOutlined} from "@ant-design/icons"
import {AdditionalService} from "../../../types/AdditionalService"
import ImageBlock from "../../../components/image-block/ImageBlock"
import MenuButton from "../../../components/menu-button/MenuButton"
import {formatPrice} from "../../../utils/formatPrice"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"
import EditorAdditionalServiceAction from "./editor-additional-service-action/EditorAdditionalServiceAction"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (additionalService: AdditionalService) => (
    <Menu>
        <Menu.Item>
            <EditorAdditionalServiceAction additionalService={additionalService}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorAdditionalServiceAction>
        </Menu.Item>
        <Menu.Item danger>
            <DeleteItem additionalService={additionalService} />
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
        title: "Стоимость",
        dataIndex: "price",
        render: (text: any) => `${formatPrice(text)} сум`
    },
    {
        title: "Используется",
        dataIndex: "display",
        render: (display: string[]) =>
            !!display.length &&
            display.map((val, key) =>
                val === "site" ? (
                    <Tag color="red" key={key}>
                        Сайт
                    </Tag>
                ) : (
                    <Tag color="green" key={key}>
                        POS
                    </Tag>
                )
            )
    },
    {
        render: (_: any, record: AdditionalService) => <MenuButton overlay={menu(record)} />
    }
]

const AdditionalServiceSetting = () => {
    const additionalServices = useSelectAllAdditionalServices()
    const loading = useLoadingAdditionalServices()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAdditionalServices())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <>
            <HeaderSettingTable>
                <EditorAdditionalServiceAction>
                    <Button type="primary" icon={<PlusOutlined />} size="large">
                        Добавить доп. услугу
                    </Button>
                </EditorAdditionalServiceAction>
            </HeaderSettingTable>
            <Table
                columns={columns}
                loading={loading}
                rowKey="id"
                dataSource={additionalServices}
                pagination={false}
            />
        </>
    )
}

export default AdditionalServiceSetting
