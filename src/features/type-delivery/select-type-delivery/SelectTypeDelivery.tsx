import React, {useEffect} from "react"
import {Form, Select} from "antd"
import {useSelectDeliveryTypes} from "../typeDeliverySlice"
import {useDispatch} from "store"
import {fetchDeliveryTypes} from "../fetchDeliveryTypes"
import {formatPrice} from "utils/formatPrice"

interface SelectTypeDeliveryProps {
    countryId: number
}

const SelectTypeDelivery: React.FC<SelectTypeDeliveryProps> = ({countryId}) => {
    const dispatch = useDispatch()
    const deliveryTypes = useSelectDeliveryTypes()

    useEffect(() => {
        const promise = dispatch(fetchDeliveryTypes(countryId))
        return () => {
            promise.abort()
        }
    }, [dispatch, countryId])

    return (
        <Form.Item
            label="Выберите тип доставки"
            name="delivery_id"
            rules={[{required: true, message: "Выберите тип доставки!"}]}
        >
            <Select>
                {deliveryTypes.map(typeDelivery =>
                    <Select.Option key={typeDelivery.id} value={typeDelivery.id}>
                        {typeDelivery.title}{" / "}{formatPrice(typeDelivery.price)}{" сум"}
                    </Select.Option>
                )}
            </Select>
        </Form.Item>
    )
}

export default SelectTypeDelivery
