import React from "react"
import {useDispatch} from "store"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {deleteSize} from "../../deleteSize"
import {Size} from "types/Size"

interface DeleteItemProps {
    size: Size
}

const DeleteItem: React.FC<DeleteItemProps> = ({size}) => {
    const dispatch = useDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить размер?",
            async onOk() {
                await dispatch(deleteSize(size.id))
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
