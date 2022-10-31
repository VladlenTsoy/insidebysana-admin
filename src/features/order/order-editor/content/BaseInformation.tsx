import React, {useState} from "react"
import {Button, Col, DatePicker, Form, Row, Space} from "antd"
import moment from "moment"
import Delivery from "./delivery/Delivery"
import {useForm} from "antd/es/form/Form"
import SelectClient from "features/client/select-client/SelectClient"
import {CarOutlined, ShopOutlined} from "@ant-design/icons"

interface BaseInformationProps {
    createdAt?: string;
}

const BaseInformation: React.FC<BaseInformationProps> = ({createdAt}) => {
    const [form] = useForm()
    const [type, setType] = useState<"pickup" | "delivery">("pickup")

    return (
        <>
            <Form
                id="editor-order-drawer"
                form={form}
                size="large"
                // onFinish={onSubmitHandler}
                layout="vertical"
                initialValues={{
                    country_id: "1",
                    created_at: createdAt ? moment(createdAt) : moment()
                }}
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <Form.Item
                            label="Дата создания"
                            name="created_at"
                            rules={[{required: true, message: "Введите дату создания!"}]}
                        >
                            <DatePicker format="DD-MM-YYYY" style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <SelectClient form={form} />
                    </Col>
                    <Col span={11}>
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
                <Delivery form={form} type={type} />
            </Form>
        </>
    )
}

export default BaseInformation
