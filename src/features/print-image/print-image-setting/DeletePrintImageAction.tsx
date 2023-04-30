import React from "react"
import {Modal} from "antd"
import {PrintImage} from "../../../types/print/PrintImage"
import {useDeletePrintImageMutation} from "../printImageApi"

interface DeleteCategoryActionProps {
    printImage: PrintImage
}

const {confirm} = Modal

const DeletePrintImageAction: React.FC<DeleteCategoryActionProps> = ({children, printImage}) => {
    const [deletePrintImage] = useDeletePrintImageMutation()

    const handleClick = async () => {
        confirm({
            type: "warning",
            title: `Удалить картинку (${printImage.title})?`,
            async onOk() {
                await deletePrintImage(printImage.id)
            }
        })
    }

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return <>{action}</>
}

export default DeletePrintImageAction
