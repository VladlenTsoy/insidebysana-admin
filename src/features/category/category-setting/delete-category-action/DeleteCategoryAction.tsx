import React from "react"
import {Category} from "types/Category"
import {Modal} from "antd"
import {useRemoveCategoryMutation} from "../../categoryApi"

interface DeleteCategoryActionProps {
    category: Category
}

const {confirm} = Modal

const DeleteCategoryAction: React.FC<DeleteCategoryActionProps> = ({children, category}) => {
    const [removeCategory] = useRemoveCategoryMutation()

    const handleClick = async () => {
        confirm({
            type: "warning",
            title: `Удалить категорию (${category.title})?`,
            async onOk() {
                await removeCategory(category.id)
            }
        })
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return <>{action}</>
}

export default DeleteCategoryAction
