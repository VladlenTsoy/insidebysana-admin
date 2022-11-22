import React from "react"
import {Button, Descriptions} from "antd"
import {Order} from "types/Order"
import {formatPhone} from "../../../utils/formatPhone"

interface OrderAddressProps {
    address: Order["address"]
}

const OrderAddress: React.FC<OrderAddressProps> = ({address}) => {
    return (
        <Descriptions
            bordered
            size="small"
            title="Адрес"
            column={1}
            style={{marginBottom: "1.5rem"}}
        >
            <Descriptions.Item label="Имя">{address?.full_name}</Descriptions.Item>
            <Descriptions.Item label="Телефон">{address?.phone ? formatPhone(address?.phone) : null}</Descriptions.Item>
            <Descriptions.Item label="Адрес">{address?.address}</Descriptions.Item>
            <Descriptions.Item label="Карта"><Button>Посмотреть на карте</Button></Descriptions.Item>
        </Descriptions>
    )
}

export default OrderAddress
