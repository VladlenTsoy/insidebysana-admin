import React from "react"
import {Category} from "types/Category"
import {Modal} from "antd"
import {useUser} from "hooks/use-user"
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons"
import {useEditCategoryMutation} from "../../categoryApi"

interface DeleteCategoryActionProps {
    category: Category
}

const {confirm} = Modal

const HideItem: React.FC<DeleteCategoryActionProps> = ({category}) => {
    const {userId} = useUser()
    const [editCategory] = useEditCategoryMutation()

    const handleClick = async () => {
        category.hide_id ?
            confirm({
                type: "warning",
                title: `Показать категорию (${category.title})?`,
                async onOk() {
                    await editCategory({id: category.id, data: {...category, hide_id: null}})
                }
            }) :
            confirm({
                type: "warning",
                title: `Скрыть категорию (${category.title})?`,
                async onOk() {
                    await editCategory({id: category.id, data: {...category, hide_id: userId}})
                }
            })
    }

    return <div onClick={handleClick}>
        {
            category.hide_id ?
                <><EyeOutlined /> Показать</> :
                <><EyeInvisibleOutlined /> Скрыть</>
        }
    </div>
}

export default HideItem
