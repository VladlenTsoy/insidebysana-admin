import React, {useEffect} from "react"
import {Form, Select} from "antd"
import {useLoadingSources, useSelectAllSources} from "../sourceSelectors"
import {useDispatch} from "store"
import {fetchSources} from "../fetchSources"

const SelectSource = () => {
    const sources = useSelectAllSources()
    const loading = useLoadingSources()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSources())
    }, [dispatch])

    return (
        <Form.Item label="Откуда" name="source_id" rules={[{required: true, message: "Выберите откуда!"}]}>
            <Select loading={loading}>
                {sources.map(source =>
                    <Select.Option key={source.id} val={source.id}>
                        {source.title}
                    </Select.Option>
                )}
            </Select>
        </Form.Item>
    )
}

export default SelectSource
