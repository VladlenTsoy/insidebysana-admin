import React from "react"
import {useGetAllPromocodeQuery} from "../promocodeApi"
import {Button, Menu, Table, Tag} from "antd"
import {PromoCode} from "../../../types/PromoCode"
import EditorPromoCodeAction from "../editor-promo-code-action/EditorPromoCodeAction"
import {EditOutlined, PlusOutlined} from "@ant-design/icons"
import {formatDate} from "../../../utils/formatDate"
import MenuButton from "../../../components/menu-button/MenuButton"
import {formatPrice} from "../../../utils/formatPrice"
import StopItem from "./stop-item/StopItem"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"

const menu = (promoCode: PromoCode) => (
    <Menu>
        <Menu.Item>
            <EditorPromoCodeAction promoCode={promoCode}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorPromoCodeAction>
        </Menu.Item>
        <Menu.Item>
            <StopItem promoCode={promoCode} />
        </Menu.Item>
    </Menu>
)

const columns = [
    {
        title: "ID",
        dataIndex: "id"
    },
    {
        title: "Код",
        dataIndex: "code"
    },
    {
        title: "Тип",
        dataIndex: "type",
        render: (type: string) => type === "percent" ? "В процентах" : "Фиксированная"
    },
    {
        title: "Размер",
        dataIndex: "discount",
        render: (discount: string, record: any) =>
            record.type === "percent" ? `${discount}%` : `${formatPrice(discount)} сум`
    },
    {
        title: "Статус",
        dataIndex: "status",
        render: (status: string) => status === "active" ? <Tag color="green">Активный</Tag> : <Tag>Отключен</Tag>
    },
    {
        title: "Действителен",
        dataIndex: "end_at",
        render: (created: string) => formatDate(created)
    },
    {
        title: "Создан",
        dataIndex: "created_at",
        render: (created: string) => formatDate(created)
    },
    {
        render: (_: any, record: any) => <MenuButton overlay={menu(record)} />
    }
]


const PromocodeSetting = () => {
    const {data, isLoading} = useGetAllPromocodeQuery()

    return (
        <>
            <HeaderSettingTable>
                <EditorPromoCodeAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Добавить промокод
                    </Button>
                </EditorPromoCodeAction>
            </HeaderSettingTable>
            <Table columns={columns} rowKey="id" loading={isLoading} dataSource={data} pagination={false} />
        </>
    )
}

export default PromocodeSetting
