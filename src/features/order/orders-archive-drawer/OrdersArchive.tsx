import moment from "moment"
import React, {useCallback, useEffect} from "react"
import {fetchOrdersArchive} from "features/order/order-archive/fetchOrdersArchive"
import {
    useFilterDatesOrdersArchive,
    useFilterSourceOrdersArchive,
    useLoadingOrdersArchive,
    useSelectAllOrdersArchive
} from "features/order/order-archive/orderArchiveSelectors"
import {updateFilterDates, updateFilterSource} from "features/order/order-archive/orderArchiveSlice"
import {useDispatch} from "store"
import OrdersTableBlock from "components/orders-table-block/OrdersTableBlock"
import {useLoadingPaymentMethods, useSelectAllPaymentMethods} from "features/payment-method/paymentMethodSelectors"
import {fetchPaymentMethods} from "features/payment-method/fetchPaymentMethods"
import {useSelectAllSources} from "features/source/sourceSelectors"
import {fetchSources} from "features/source/fetchSources"
import {useUser} from "../../../hooks/use-user"

const OrderArchive: React.FC = () => {
    const {user} = useUser()
    const orders = useSelectAllOrdersArchive()
    const loading = useLoadingOrdersArchive()
    const dispatch = useDispatch()
    const dates = useFilterDatesOrdersArchive()
    const loadingPayments = useLoadingPaymentMethods()
    const payments = useSelectAllPaymentMethods()
    const sources = useSelectAllSources()
    const sourceId = useFilterSourceOrdersArchive()

    const onChangeHandler = useCallback(
        (e: any) => {
            if (e)
                dispatch(
                    updateFilterDates({
                        from: moment(e[0]).toISOString(),
                        to: moment(e[1]).toISOString()
                    })
                )
        },
        [dispatch]
    )

    const onChangeSourceHandler = useCallback(
        (sourceId: number) => {
            dispatch(updateFilterSource(sourceId))
        },
        [dispatch]
    )

    useEffect(() => {
        if (dates) {
            const promise = dispatch(
                fetchOrdersArchive({
                    dateFrom: dates.from,
                    dateTo: dates.to,
                    sourceId
                })
            )
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, dates, sourceId])

    useEffect(() => {
        const promise = dispatch(fetchPaymentMethods())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    useEffect(() => {
        const promise = dispatch(fetchSources())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <OrdersTableBlock
            loading={loading || loadingPayments}
            orders={orders}
            onChangeHandler={onChangeHandler}
            sources={sources}
            onChangeSourceHandler={onChangeSourceHandler}
            access={user?.access || "manager"}
            payments={payments}
        />
    )
}

export default OrderArchive
