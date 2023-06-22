import React from "react"
import {Col, Form, Input, Row, Select, DatePicker} from "antd"
import {Client} from "types/Client"
import {emailRules, passwordRules} from "utils/formRules"
import {useCreateClientMutation, useUpdateClientMutation} from "../clientsApi"
import moment from "moment"

const {Option} = Select

interface EditorClientsProps {
    setLoading: any
    close: any
    client?: Client
}

const EditorClients: React.FC<EditorClientsProps> = ({client, setLoading, close}) => {
    const [create] = useCreateClientMutation()
    const [update] = useUpdateClientMutation()

    const onFinishHandler = async (values: any) => {
        values.date_of_birth = moment(values.date_of_birth).format('YYYY-MM-DD hh:mm:ss')
        setLoading(true)
        if (client)
            await update({id: client.id, data: values})
        else
            await create(values)
        setLoading(false)
        close()
    }

    return (
        <Form id="editor-clients" layout="vertical" initialValues={client} onFinish={onFinishHandler}>
            <Row gutter={15}>
                <Col xl={12} md={12} xs={24}>
                    <Form.Item
                        label="Имя"
                        name="full_name"
                        rules={[{required: true, message: "Введите имя!"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Почта"
                        name="email"
                        rules={emailRules({required: true})}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xl={12} md={12} xs={24}>
                    <Form.Item
                        label="Телефон"
                        name="phone"
                        rules={[{required: true, message: "Введите номер телефона"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={passwordRules({required: !client})}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col xl={12} md={12} xs={24}>
                <Form.Item
                        label="Дата рождения"
                        name="date_of_birth"
                        rules={[{required: false, message: "Дата рождения"}]}
                        valuePropName={'date_of_birth'}
                    >
                        <DatePicker
                        format={'DD/MM/YYYY'}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Facebook"
                        name="facebook"
                        rules={[{required: false, message: "Facebook"}]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xl={12} md={12} xs={24}>
                    <Form.Item
                        label="Instagram"
                        name="instagram"
                        rules={[{required: false, message: "Instagram"}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Откуда"
                        name="source_id"
                        rules={[{required: false}]}
                    >
                        <Select>
                            <Option value="1">Facebook</Option>
                            <Option value="2">Instagram</Option>
                            <Option value="3">Сайт</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xl={12} md={12} xs={24}>
                <Form.Item
                        label="Telegram"
                        name="telegram"
                        rules={[{required: false, message: "Telegram"}]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default EditorClients
