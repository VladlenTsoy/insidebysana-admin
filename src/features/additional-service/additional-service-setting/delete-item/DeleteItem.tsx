import React from "react"
import {useDispatch} from "store"
import {Modal} from "antd"
import {DeleteOutlined} from "@ant-design/icons"
import {AdditionalService} from "types/AdditionalService"
import {deleteAdditionalService} from "../../deleteAdditionalService"

interface DeleteItemProps {
    additionalService: AdditionalService
}

const DeleteItem: React.FC<DeleteItemProps> = ({additionalService}) => {
    const dispatch = useDispatch()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить доп. услугу?",
            async onOk() {
                await dispatch(deleteAdditionalService(additionalService.id))
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
