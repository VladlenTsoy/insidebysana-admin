import React from "react"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {LookbookCategory} from "types/Lookbook"
import {useDeleteLookbookCategoryMutation} from "../../lookbookApi"

interface DeleteItemProps {
    lookbookCategory: LookbookCategory
}

const DeleteItem: React.FC<DeleteItemProps> = ({lookbookCategory}) => {
    const [deleteLookbookCategory] = useDeleteLookbookCategoryMutation()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить категорию?",
            async onOk() {
                await deleteLookbookCategory(lookbookCategory.id)
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
