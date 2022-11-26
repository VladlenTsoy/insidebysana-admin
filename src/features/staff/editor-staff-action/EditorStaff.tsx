import React from "react"
import {Col, Form, Input, Row, Select} from "antd"
import {User} from "types/User"
import {emailRules, passwordRules} from "utils/formRules"
import {useCreateStaffMutation, useUpdateStaffMutation} from "../staffApi"

const {Option} = Select

interface EditorStaffProps {
    setLoading: any
    close: any
    user?: User
}

const EditorStaff: React.FC<EditorStaffProps> = ({user, setLoading, close}) => {
    const [create] = useCreateStaffMutation()
    const [update] = useUpdateStaffMutation()

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (user)
            await update({id: user.id, data: values})
        else
            await create(values)
        setLoading(false)
        close()
    }

    return (
        <Form id="editor-staff" layout="vertical" initialValues={user} onFinish={onFinishHandler}>
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
                        label="Доступ"
                        name="access"
                        rules={[{required: true, message: "Введите доступ!"}]}
                    >
                        <Select>
                            <Option value="admin">Администратор</Option>
                            <Option value="manager">Менеджер</Option>
                            <Option value="cashier">Кассир</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={passwordRules({required: !user})}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default EditorStaff
