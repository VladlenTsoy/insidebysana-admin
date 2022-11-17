import React from "react"
import {Status} from "types/Status"
import {Button, Col, Form, Input, Row, Select, Space} from "antd"
import OrderPaymentConditions from "./status-conditions/StatusConditions"
import {BranchesOutlined, CodeOutlined} from "@ant-design/icons"
import StatusActions from "./status-actions/StatusActions"
import {useDispatch} from "../../../store"
import {updateStatus} from "../updateStatus"
import {createStatus} from "../createStatus"

interface EditorStatusProps {
    status?: Status
    smsVisible: boolean
    onOpenSMS: () => void
    onCloseSMS: () => void
    conditionsVisible: boolean
    onOpenConditions: () => void
    onCloseConditions: () => void
    onClose: () => void
    updateLoading: (loading: boolean) => void
}

const EditorStatus: React.FC<EditorStatusProps> = (
    {
        status,
        onClose,
        smsVisible,
        onOpenSMS,
        onCloseSMS,
        updateLoading,
        conditionsVisible,
        onCloseConditions,
        onOpenConditions
    }
) => {
    const dispatch = useDispatch()

    const onFinishHandler = async (values: any) => {
        // Обновить загрузку
        updateLoading(true)
        // Обновить данные статуса
        if (status) await dispatch(updateStatus({id: status.id, data: values}))
        // Создать статус
        else await dispatch(createStatus(values))
        // Обновить загрузку
        updateLoading(false)
        // Закрыть
        onClose()
    }

    return (
        <>
            <Form layout="vertical" id="editor-status" initialValues={status || {}} size="large"
                  onFinish={onFinishHandler}>
                <Row gutter={16}>
                    <Col span={smsVisible ? 10 : 24}>
                        <Form.Item
                            label="Название"
                            name="title"
                            rules={[{required: true, message: "Введите название!"}]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Доступ"
                            name="access"
                            rules={[{required: true, message: "Выберите доступ!"}]}
                        >
                            <Select>
                                <Select.Option value="admin">только Администратор</Select.Option>
                                <Select.Option value="manager">Менеджер и Администратор</Select.Option>
                            </Select>
                        </Form.Item>
                        <Space>
                            <Button onClick={conditionsVisible ? onCloseConditions : onOpenConditions}
                                    type={conditionsVisible ? "primary" : "default"}
                                    icon={<BranchesOutlined />} block>
                                Условия
                            </Button>
                            <Button onClick={smsVisible ? onCloseSMS : onOpenSMS}
                                    type={smsVisible ? "primary" : "default"}
                                    icon={<CodeOutlined />} block>
                                Действия
                            </Button>
                        </Space>
                        {conditionsVisible && <OrderPaymentConditions />}
                    </Col>
                    {
                        smsVisible &&
                        <Col span={14}>
                            <StatusActions />
                        </Col>
                    }
                </Row>
            </Form>
        </>
    )
}

export default EditorStatus
