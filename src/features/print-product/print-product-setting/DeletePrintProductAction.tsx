import React from "react"
import {useDispatch} from "react-redux"
import {Modal} from "antd"
import {PrintProduct} from "../../../types/print/PrintProduct"
import {useDeletePrintProductMutation} from "../printProductApi"

interface DeleteCategoryActionProps {
    printProduct: PrintProduct
}

const {confirm} = Modal

const DeletePrintProductAction: React.FC<DeleteCategoryActionProps> = ({children, printProduct}) => {
    const dispatch = useDispatch()
    const [deletePrintProduct] = useDeletePrintProductMutation()

    const handleClick = async () => {
        confirm({
            type: "warning",
            title: `Удалить товар (${printProduct.title})?`,
            async onOk() {
                await dispatch(deletePrintProduct(printProduct.id))
            }
        })
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return <>{action}</>
}

export default DeletePrintProductAction
