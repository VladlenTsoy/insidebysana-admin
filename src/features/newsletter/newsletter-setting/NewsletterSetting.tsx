import React from "react"
import {useGetAllNewsletterQuery} from "../newsletterApi"
import {formatDate} from "utils/formatDate"
import {Table, Tag} from "antd"

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Почта",
        dataIndex: "email"
    },
    {
        title: "Статус",
        dataIndex: "status",
        render: (status: string) => status === "active" ? <Tag color="green">Активный</Tag> : <Tag>Отключен</Tag>
    },
    {
        title: "Создан",
        dataIndex: "created_at",
        render: (created: string) => formatDate(created)
    }
]

const NewsletterSetting = () => {
    const {data, isLoading} = useGetAllNewsletterQuery()

    return (
        <>
            <Table columns={columns} rowKey="id" loading={isLoading} dataSource={data} pagination={false} />
        </>
    )
}

export default NewsletterSetting
