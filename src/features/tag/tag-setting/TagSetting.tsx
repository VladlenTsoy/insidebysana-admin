import React, {useEffect} from "react"
import {Menu, Table} from "antd"
import {useLoadingTag, useSelectAllTags} from "../tagSelectors"
import {useDispatch} from "store"
import {fetchTags} from "../fetchTags"
import MenuButton from "components/menu-button/MenuButton"
import {Tag} from "types/Tag"
import DeleteItem from "./delete-item/DeleteItem"
import EditorTagAction from "./editor-tag-action/EditorTagAction"
import {EditOutlined} from "@ant-design/icons"

const menu = (tag: Tag) => (
    <Menu>
        <Menu.Item>
            <EditorTagAction tag={tag}>
                <div>
                    <EditOutlined /> Редактировать
                </div>
            </EditorTagAction>
        </Menu.Item>
        <Menu.Item danger>
            <DeleteItem tag={tag} />
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
        dataIndex: "title"
    },
    {
        render: (_: any, record: Tag) => <MenuButton overlay={menu(record)} />
    }
]

const TagSetting = () => {
    const loading = useLoadingTag()
    const tags = useSelectAllTags()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchTags())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={tags} pagination={false} />
}

export default TagSetting
