import React from "react"
import {Col, DatePicker, Form, Row} from "antd"
import moment from "moment"
import styles from "./BaseInformation.module.less"

interface BaseInformationProps {
    createdAt?: string;
}

const BaseInformation: React.FC<BaseInformationProps> = ({createdAt}) => {
    return (
        <>
            <Form
                id="editor-order-drawer"
                size="large"
                // onFinish={onSubmitHandler}
                layout="vertical"
                initialValues={{
                    created_at: createdAt ? moment(createdAt) : moment()
                }}
            >
                <Row gutter={16}>
                    <Col xl={6}>
                        <Form.Item
                            label="Дата создания"
                            name="created_at"
                            rules={[{required: true, message: "Введите дату создания!"}]}
                        >
                            <DatePicker format="DD-MM-YYYY" style={{width: "100%"}} />
                        </Form.Item>
                    </Col>
                    <Col offset={18} />
                    <Col xl={6}>
                        <div className={styles.client}>Client</div>
                    </Col>
                    <Col xl={12}>
                        <div className={styles.delivery}>Delivery</div>
                    </Col>
                    <Col xl={6} />
                </Row>
            </Form>
        </>
    )
}

export default BaseInformation
