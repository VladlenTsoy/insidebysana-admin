import React, {useEffect} from "react"
import {useLoadingSources, useSelectAllSources} from "../sourceSelectors"
import {useDispatch} from "store"
import {fetchSources} from "../fetchSources"
import CheckboxGroup from "components/checkbox-group/CheckboxGroup"

const CheckboxGroupSource = () => {
    const sources = useSelectAllSources()
    const loadingSources = useLoadingSources()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchSources())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <CheckboxGroup
        label="Откуда"
        name={["conditions", "source_ids"]}
        rules={[{required: true, message: "Выберите статус откуда!"}]}
        loading={loadingSources}
        data={sources.map(source => ({
            label: source.title,
            val: source.id
        }))}
    />
}

export default CheckboxGroupSource
