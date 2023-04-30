import React from "react"
import {Button, Menu, Table} from "antd"
import {Banner} from "../../../types/Banner"
import MenuButton from "../../../components/menu-button/MenuButton"
import ImageBlock from "../../../components/image-block/ImageBlock"
import EditorBannerAction from "./editor-banner-action/EditorBannerAction"
import {EditOutlined, PlusOutlined} from "@ant-design/icons"
import HeaderSettingTable from "../../../components/header-setting-table/HeaderSettingTable"
import {useGetAllBannersQuery} from "../bannerApi"
import DeleteItem from "./delete-item/DeleteItem"

const menu = (banner: Banner) => (
    <Menu>
        <Menu.Item>
            <EditorBannerAction banner={banner}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorBannerAction>
        </Menu.Item>
        <Menu.Item>
            <DeleteItem banner={banner} />
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
        render: (image: string) => <div style={{width: '140px'}}>
            <ImageBlock image={image} title={""} />
        </div>
    },
    {
        title: "Название",
        dataIndex: "title"
    },
    {
        title: "Название кнопки",
        dataIndex: "button_title"
    },
    {
        title: "Ссылка кнопки",
        dataIndex: "button_link"
    },
    {
        render: (_: any, record: Banner) => <MenuButton overlay={menu(record)} />
    }
]

const BannerSetting = () => {
    const {data, isLoading} = useGetAllBannersQuery()

    return (
        <>
            <HeaderSettingTable>
                <EditorBannerAction>
                    <Button type="primary" size="large" icon={<PlusOutlined />}>
                        Создать баннер
                    </Button>
                </EditorBannerAction>
            </HeaderSettingTable>
            <Table columns={columns} rowKey="id" loading={isLoading} dataSource={data} pagination={false} />
        </>
    )
}

export default BannerSetting
