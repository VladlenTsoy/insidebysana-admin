import React, {useEffect, useState} from "react"
import StatusColumn from "./StatusColumn"
import styles from "./StatusDropColumns.module.less"
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd"
import ScrollContainer from "react-indiana-drag-scroll"
import {updateStatusOrder} from "features/order/updateStatusOrder"
import {updatePositionStatus} from "features/status/updatePositionStatus"
import {useDispatch} from "../../../store"
import {Skeleton} from "antd"
import {fetchStatuses} from "features/status/fetchStatuses"
import {useLoadingStatuses, useSelectAllStatuses} from "features/status/statusSelectors"
import {hideOrder} from "../../order/order-card/hideOrder"
import {sendToArchiveOrder} from "../../order/order-card/sendToArchiveOrder"

const StatusDropColumns = () => {
    const dispatch = useDispatch()
    const loading = useLoadingStatuses()
    const statuses = useSelectAllStatuses()
    const [, setCacheDispatches] = useState<{orderId: number, dispatcher: any}[]>([])

    const onDragEnd = (result: DropResult) => {
        const {type, destination, source, draggableId} = result
        // Проверка на следующую колонну если не выбранная
        if (!destination) return
        // Проверка на следующую колонну если та же
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        if (type === "order") {
            const orderId = Number(draggableId.replace("order-", ""))
            // Проверка специальные параметры
            if (destination.droppableId?.includes("options")) {
                // В корзину
                if (destination.droppableId === "option-trash") dispatch(hideOrder(orderId))
                // В архив
                if (destination.droppableId === "option-archive") dispatch(sendToArchiveOrder(orderId))
            } else {
                // Предыдущий статус / Следующий статус
                const prevStatusId = Number(source.droppableId.replace("drop-", ""))
                const nextStatusId = Number(destination.droppableId.replace("drop-", ""))

                // Загрузить обновлении
                const dispatcher = dispatch(
                    updateStatusOrder({
                        id: orderId,
                        prevStatusId: prevStatusId,
                        nextStatusId: nextStatusId,
                        position: destination.index,
                        prevPosition: source.index
                    })
                )
                // Отменить предыдущие действия
                setCacheDispatches(prevState => {
                    // Действия только текущего orderId
                    const caches = prevState.filter(item => item.orderId === orderId)
                    if (caches.length) {
                        caches.map(cache => cache.dispatcher.abort())
                        const nextState = prevState.filter(item => item.orderId !== orderId)
                        return [...nextState, {orderId, dispatcher}]
                    }
                    return [...prevState, {orderId, dispatcher}]
                })
            }
        } else if (type === "status") {
            const finishStatusId = Number(draggableId.replace("status-", ""))
            dispatch(
                updatePositionStatus({
                    id: finishStatusId,
                    position: destination.index,
                    prevPosition: source.index
                })
            )
        }
    }

    useEffect(() => {
        const promise = dispatch(fetchStatuses())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading)
        return (
            <div className={styles.loadingBlock}>
                {Array(5)
                    .fill(1)
                    .map((_, key) => (
                        <div className={styles.loading} key={key}>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    ))}
            </div>
        )

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScrollContainer hideScrollbars={false} vertical horizontal ignoreElements=".order-card, .status-title">
                <div className={styles.container}>
                    <Droppable direction="horizontal" droppableId="statuses" type="status">
                        {provided => (
                            <div className={styles.columns} {...provided.droppableProps} ref={provided.innerRef}>
                                {statuses &&
                                    statuses.map((status, key) => (
                                        <StatusColumn status={status} index={key} key={status.id} />
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </ScrollContainer>
        </DragDropContext>
    )
}

export default StatusDropColumns
