import React from "react";
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Color} from "types/Color"
import {useDeleteColorMutation} from "../../colorApi"

interface DeleteItemProps {
    color: Color
}

const DeleteItem: React.FC<DeleteItemProps> = ({color}) => {
    const [deleteColor] = useDeleteColorMutation()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить цвет?",
            async onOk() {
                await deleteColor(color.id)
            }
        })
    }

    return (
        <div onClick={clickHideHandler}>
            <DeleteOutlined /> Удалить
        </div>
    )
};

export default DeleteItem;
