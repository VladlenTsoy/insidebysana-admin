import React, {useEffect} from "react"
import {Table} from "antd"
import {useLoadingTag, useSelectAllTags} from "../tagSelectors"
import {useDispatch} from "store"
import {fetchTags} from "../fetchTags"
// import MenuButton from "components/menu-button/MenuButton"
// import EditorTagAction from "../../../../../../../lib/components/editors/editor-tag-action/EditorTagAction"

// const menu = (tag: Tag) => (
//     <Menu>
//         <Menu.Item>
//             {/*<EditorTagAction tag={tag}>*/}
//             {/*    <div>*/}
//             {/*        <EditOutlined /> Редактировать*/}
//             {/*    </div>*/}
//             {/*</EditorTagAction>*/}
//         </Menu.Item>
//         <Menu.Item>
//             <DeleteItem tag={tag} />
//         </Menu.Item>
//     </Menu>
// )

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Название",
        dataIndex: "title"
    }
    // {
    // render: (_: any, record: Tag) => <MenuButton overlay={menu(record)} />
    // }
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

    return <Table columns={columns} rowKey="id" loading={loading} dataSource={tags} pagination={{pageSize: 20}} />
}

export default TagSetting
