import React, {useEffect} from "react"
import {fetchSources} from "features/source/fetchSources"
import {useLoadingSources, useSelectSourceById} from "features/source/sourceSelectors"
import {useDispatch} from "store"
import {OrderTableColumn} from "./OrderTableColumn"

interface SourceRowBlockProps {
    sourdeId: OrderTableColumn["source_id"]
}

const SourceRowBlock: React.FC<SourceRowBlockProps> = ({sourdeId}) => {
    const source = useSelectSourceById(sourdeId || 0)
    const loading = useLoadingSources()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchSources())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <>{loading && !source ? "Загрука..." : source?.title}</>
}
export default SourceRowBlock
