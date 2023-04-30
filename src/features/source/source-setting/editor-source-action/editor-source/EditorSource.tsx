import React from "react"
import {Input, Form} from "antd"
import {Source} from "types/Source"
import {useCreateSourceMutation, useEditSourceMutation} from "../../../sourceApi"

interface EditorSourceProps {
    source?: Source
    setLoading: any
    close: any
}

const EditorSource: React.FC<EditorSourceProps> = ({setLoading, close, source}) => {
    const [create] = useCreateSourceMutation()
    const [edit] = useEditSourceMutation()

    const onFinish = async (values: any) => {
        setLoading(true)
        if (source)
            await edit({id: source.id, data: values})
        else
            await create(values)
        setLoading(false)
        close()
    }

    return (
        <Form id="editor-source" onFinish={onFinish} size="large" layout="vertical" initialValues={source}>
            <Form.Item name="title" label="Название" rules={[{required: true, message: "Введите название!"}]}>
                <Input />
            </Form.Item>
        </Form>
    )
}

export default EditorSource
