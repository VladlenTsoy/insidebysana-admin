import React, {useState} from "react"
import {Button, Col, DatePicker, Form, Row, Space} from "antd"
import {Moment} from "moment"
import Delivery from "./delivery/Delivery"
import {useForm} from "antd/es/form/Form"
import SelectClient from "features/client/select-client/SelectClient"
import {CarOutlined, ShopOutlined} from "@ant-design/icons"
import SelectSource from "features/source/select-source/SelectSource"

interface BaseInformationProps {
    initialValues?: {
        client?: any
        country_id?: string
        source_id?: string
        created_at?: Moment
        delivery_id?: number
        address?: any
    }
    onFinish: (values: any) => void
}

const BaseInformation: React.FC<BaseInformationProps> = ({initialValues, onFinish}) => {
    const [form] = useForm()
    const [type, setType] = useState<"pickup" | "delivery">(initialValues?.delivery_id ? "delivery" : "pickup")

    return (
        <>
            <Form
                id="editor-order-drawer"
                form={form}
                size="large"
                onFinish={onFinish}
                layout="vertical"
                initialValues={initialValues}
            >
                <Row gutter={16}>
                    <Col md={4} xs={24}>
                        <Form.Item
                            label="Дата создания"
                            name="created_at"
                            rules={[{required: true, message: "Введите дату создания!"}]}
                        >
                            <DatePicker format="DD-MM-YYYY" style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <SelectClient form={form} clientId={initialValues?.client?.id} />
                    </Col>
                    <Col md={5} xs={24}>
                        <SelectSource />
                    </Col>
                    <Col md={7} xs={24}>
                        <Form.Item label="Доставка">
                            <Space align="end">
                                <Button
                                    icon={<ShopOutlined />}
                                    onClick={() => setType("pickup")}
                                    type={type === "pickup" ? "primary" : "default"}
                                >
                                    Самовызов
                                </Button>
                                <Button
                                    icon={<CarOutlined />}
                                    onClick={() => setType("delivery")}
                                    type={type === "delivery" ? "primary" : "default"}
                                >
                                    Доставка
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
                <Delivery form={form} type={type} position={initialValues?.address?.position} />
            </Form>
        </>
    )
}

export default BaseInformation
