import {Divider, Form, Switch} from "antd"
import React from "react"
import CheckboxGroupPaymentMethod
    from "features/payment-method/checkbox-group-payment-method/CheckboxGroupPaymentMethod"
import CheckboxGroupSource from "features/source/checkbox-group-source/CheckboxGroupSource"
import CheckboxGroup from "components/checkbox-group/CheckboxGroup"

interface PaymentConditionsProps {
}

const PaymentConditions: React.FC<PaymentConditionsProps> = () => {
    return (
        <>
            <Divider orientation="left">Условия попадание сделок</Divider>
            <CheckboxGroupPaymentMethod />
            <CheckboxGroup
                label="Статус оплаты"
                name={["conditions", "payments_state"]}
                rules={[{required: true, message: "Выберите статус оплаты!"}]}
                data={[
                    {label: "Оплачен", val: 1},
                    {label: "В ожидании", val: 0},
                    {label: "Отменен", val: -1}
                ]}
            />
            <CheckboxGroupSource />
            <Form.Item
                label="На обработку (POS)"
                name={["conditions", "processing"]}
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
        </>
    )
}

export default PaymentConditions
