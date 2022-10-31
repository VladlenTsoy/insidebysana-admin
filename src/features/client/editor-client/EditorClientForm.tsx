import React from "react"
import {Form, Input} from "antd"
import {Client} from "types/Client"
import {useCreateClientMutation} from "../clientApi"
import {clearPhone} from "utils/clearPhone"

interface EditorClientFormProps {
    client?: Client
    updateLoading: (loading: boolean) => void
    afterFinish?: (client: Client) => void
    close: () => void
}

const EditorClientForm: React.FC<EditorClientFormProps> = ({client, updateLoading, close, afterFinish}) => {
    const [form] = Form.useForm()
    const [createClient] = useCreateClientMutation()

    const onChangeHandler = (e: any) => {
        const phone = clearPhone(e.currentTarget.value).replace(/^d?(\d{2})(\d{3})(\d{2})(\d{2})$/, "($1)-$2-$3-$4")
        form.setFieldsValue({phone: phone})
    }

    const onFinish = async (values: any) => {
        updateLoading(true)
        const response = await createClient(values)
        // @ts-ignore
        if (response?.data && afterFinish) afterFinish(response?.data)
        updateLoading(false)
        close()
    }

    return (
        <Form id="editor-client" form={form} onFinish={onFinish} size="large" layout="vertical" initialValues={client}>
            <Form.Item name="full_name" label="Имя" rules={[{required: true, message: "Введите имя!"}]}>
                <Input autoFocus />
            </Form.Item>
            <Form.Item
                name="phone" label="Номер телефона"
                rules={[
                    {
                        required: true,
                        message: "Введите телефона!"
                    },
                    {
                        pattern: /^d?\((\d{2})\)-(\d{3})-(\d{2})-(\d{2})$/,
                        message: "Неверный формат телефона!"
                    }
                ]}
            >
                <Input prefix="+998" onChange={onChangeHandler} />
            </Form.Item>
        </Form>
    )
}

export default EditorClientForm
