import React from "react"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {Lookbook} from "types/Lookbook"
import {useDeleteLookbookMutation} from "../../lookbookApi"

interface DeleteItemProps {
    lookbook: Lookbook
}

const DeleteItem: React.FC<DeleteItemProps> = ({lookbook}) => {
    const [deleteLookbook] = useDeleteLookbookMutation()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить lookbook?",
            async onOk() {
                await deleteLookbook(lookbook.id)
            }
        })
    }

    return (
        <div onClick={clickHideHandler}>
            <DeleteOutlined /> Удалить
        </div>
    )
}

export default DeleteItem
