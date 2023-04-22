import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {OrderCardType} from "types/order/Order"
import {StoreState} from "store"
import {fetchOrders} from "./fetchOrders"
import {updateStatusOrder} from "./updateStatusOrder"
import {changePaymentStateOrder} from "./changePaymentStateOrder"
import {cancelOrder} from "./cancelOrder"
import {hideOrder} from "./order-card/hideOrder"
import {sendToArchiveOrder} from "./order-card/sendToArchiveOrder"
import {createOrder} from "./createOrder"
import {editOrder} from "./editOrder"
import {sendStatusNotification} from "../notification/sendStatusNotification"

export const orderAdapter = createEntityAdapter<OrderCardType>({
    sortComparer: (a, b) => (a.position > b.position ? 1 : -1)
})

export interface StateProps {
    loading: boolean
}

const initialState = orderAdapter.getInitialState<StateProps>({
    loading: false
})

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<OrderCardType>) => {
            orderAdapter.addOne(state, action.payload)
        },
        updateOrder: (state, action: PayloadAction<OrderCardType>) => {
            orderAdapter.upsertOne(state, action.payload)
        },
        clearPrevStatusId: (state, action: PayloadAction<OrderCardType["id"]>) => {
            orderAdapter.updateOne(state, {id: action.payload, changes: {prev_status_id: undefined}})
        }
    },
    extraReducers: builder => {
        // builder.addCase(fetchOrderById.fulfilled, (state, action) => {
        //     orderAdapter.addOne(state, action.payload)
        // })

        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            const {orderId, paymentState} = action.payload
            orderAdapter.updateOne(state, {id: orderId, changes: {payment_state: paymentState}})
        })
        //
        builder.addCase(changePaymentStateOrder.fulfilled, (state, action) => {
            const {orderId, paymentState} = action.payload
            orderAdapter.updateOne(state, {id: orderId, changes: {payment_state: paymentState}})
        })
        // Вывод Заказы
        builder.addCase(fetchOrders.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            orderAdapter.upsertMany(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchOrders.rejected, state => {
            state.loading = false
        })
        builder.addCase(sendToArchiveOrder.fulfilled, (state, action) => {
            orderAdapter.removeOne(state, action.payload)
        })
        // Отправить сделку в корзину
        builder.addCase(hideOrder.fulfilled, (state, action) => {
            orderAdapter.removeOne(state, action.payload)
        })
        // Обновить статус и позицию
        builder.addCase(updateStatusOrder.pending, (state, action) => {
            const {id, nextStatusId, prevStatusId, prevPosition, position} = action.meta.arg
            const isStatusChange = nextStatusId !== prevStatusId

            const items = Object.values(state.entities).reduce((accumulator: any[], item: any) => {
                if (isStatusChange) {
                    if (item.position >= position && item.id !== id && item.status_id === nextStatusId)
                        accumulator.push({id: item.id, changes: {position: item.position + 1}})
                    else if (
                        item.status_id === prevStatusId &&
                        item.id !== id &&
                        item.position >= prevPosition
                    )
                        accumulator.push({id: item.id, changes: {position: item.position - 1}})
                } else {
                    if (position < prevPosition) {
                        if (
                            item.position >= position &&
                            item.position <= prevPosition &&
                            item.id !== id &&
                            item.status_id === nextStatusId
                        )
                            accumulator.push({id: item.id, changes: {position: item.position + 1}})
                    } else if (position > prevPosition) {
                        if (
                            item.position <= position &&
                            item.position >= prevPosition &&
                            item.id !== id &&
                            item.status_id === nextStatusId
                        )
                            accumulator.push({id: item.id, changes: {position: item.position - 1}})
                    }
                }
                return accumulator
            }, [])

            items.push({id, changes: {loading: true, position, next_status_id: nextStatusId}})
            orderAdapter.updateMany(state, items)
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            const order = action.payload
            orderAdapter.upsertOne(state, order)
        })
        builder.addCase(editOrder.fulfilled, (state, action) => {
            const order = action.payload
            orderAdapter.upsertOne(state, order)
        })
        builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
            const {id, nextStatusId, position, prevStatusId} = action.meta.arg
            orderAdapter.updateOne(state, {
                id,
                changes: {
                    position,
                    status_id: nextStatusId,
                    prev_status_id: nextStatusId !== prevStatusId ? prevStatusId : undefined
                }
            })
        })
        //
        builder.addCase(sendStatusNotification.fulfilled, (state, action) => {
            const orderId = action.meta.arg
            orderAdapter.updateOne(state, {id: orderId, changes: {prev_status_id: undefined}})
        })
    }
})

export const {addOrder, updateOrder, clearPrevStatusId} = orderSlice.actions

export const {selectById: getOrderById, selectAll: selectAllOrders} = orderAdapter.getSelectors<StoreState>(
    state => state.order
)

export default orderSlice.reducer
