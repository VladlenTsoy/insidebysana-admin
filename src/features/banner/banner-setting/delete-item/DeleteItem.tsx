import React from "react";
import {Modal} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {Banner} from "types/Banner";
import {useDeleteBannerMutation} from "../../bannerApi"

interface DeleteItemProps {
    banner: Banner
}

const DeleteItem: React.FC<DeleteItemProps> = ({banner}) => {
    const [deleteBanner] = useDeleteBannerMutation()

    const clickHideHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите удалить баннер?",
            async onOk() {
                await deleteBanner(banner.id)
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
