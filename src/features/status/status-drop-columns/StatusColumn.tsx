import React from "react"
import {Draggable, Droppable} from "react-beautiful-dnd"
import OrderCard from "features/order/order-card/OrderCard"
import {useSelectByStatusId} from "features/order/orderSelectors"
import {Status} from "types/Status"
import {LoadingOutlined, PushpinFilled, SettingOutlined} from "@ant-design/icons"
import styles from "./StatusColumn.module.less"
import cn from "classnames"
import EditorStatusAction from "../editor-status/EditorStatusAction"

interface StatusColumnProps {
    status: Status
    index: number
}

const StatusColumn: React.FC<StatusColumnProps> = ({status, index}) => {
    const orders = useSelectByStatusId(status.id)
    return (
        <Draggable draggableId={`status-${status.id}`} index={index} isDragDisabled={!!status.fixed}>
            {provided => (
                <div className={styles.column} {...provided.draggableProps} ref={provided.innerRef}>
                    <h3 className={cn(styles.title, "status-title")} {...provided.dragHandleProps}>
                        <span className={styles.loading}>
                            {!!status.fixed && <PushpinFilled />}
                            {status.loading && <LoadingOutlined />}
                        </span>
                        <span>{status.title}</span>
                        {/* Настройки статуса */}
                        <EditorStatusAction status={status}>
                            <span className={styles.actions}>
                                <SettingOutlined />
                            </span>
                        </EditorStatusAction>
                    </h3>
                    <Droppable droppableId={`drop-${status.id}`} type="order">
                        {provided => (
                            <div className={styles.tasks} ref={provided.innerRef} {...provided.droppableProps}>
                                {orders.map((order, key: number) => (
                                    <OrderCard order={order} index={key} key={key} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default StatusColumn
