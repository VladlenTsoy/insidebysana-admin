import React from "react"
import {Col, Form, InputNumber, Mentions, Row} from "antd"
import {CloseOutlined, PlusOutlined} from "@ant-design/icons"
import CheckboxGroup from "components/checkbox-group/CheckboxGroup"
import styles from "./StatusActions.module.less"

const StatusActions = () => {
    return (
        <div className={styles.container}>
            <Form.List name="sms">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(field => (
                            <div key={field.key} className={styles.action}>
                                <CloseOutlined onClick={() => remove(field.name)} className={styles.close} />
                                <div className={styles.title}>
                                    СМС - Уведомление
                                </div>
                                <Row gutter={15}>
                                    <Col span={24}>
                                        <CheckboxGroup
                                            label="Статус оптаты"
                                            name={[field.name, "payment_state"]}
                                            fieldKey={[field.key, "payment_state"]}
                                            rules={[{required: true, message: "Введите статус оплаты"}]}
                                            data={[
                                                {label: "Оплачен", val: "1"},
                                                {label: "В ожидании", val: "0"},
                                                {label: "Отменен", val: "-1"}
                                            ]}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Через (мин)"
                                            name={[field.name, "timeout"]}
                                            fieldKey={[field.key, "timeout"]}
                                            rules={[{required: true, message: "Введите через"}]}
                                        >
                                            <InputNumber
                                                style={{width: "100%"}}
                                                placeholder="Введите время в минутах"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    label="Сообщение"
                                    name={[field.name, "message"]}
                                    fieldKey={[field.key, "message"]}
                                    rules={[{required: true, message: "Введите сообщение"}]}
                                >
                                    <Mentions autoSize={{minRows: 2, maxRows: 6}} split="" prefix="{">
                                        <Mentions.Option value="orderId}">Id Заказы</Mentions.Option>
                                        <Mentions.Option value="amount}">Сумма</Mentions.Option>
                                    </Mentions>
                                </Form.Item>
                            </div>
                        ))}
                        <div className={styles.addActionButton} onClick={() => add()}>
                            <PlusOutlined />
                            Добавить действие
                        </div>
                    </>
                )}
            </Form.List>
        </div>
    )
}

export default StatusActions
