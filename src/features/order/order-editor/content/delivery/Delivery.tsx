import React, {useEffect, useState} from "react"
import styles from "./Delivery.module.less"
import {Card, Col, Divider, Form, FormInstance, Input, Row} from "antd"
import {YMaps} from "@pbe/react-yandex-maps"
import SelectCity from "features/city/select-city/SelectCity"
import SelectCountry from "features/country/select-country/SelectCountry"
import MapComponent from "components/map/Map"

interface DeliveryProps {
    type: "pickup" | "delivery"
    form: FormInstance;
}

const Delivery: React.FC<DeliveryProps & any> = ({form, type}) => {
    const [selectedCountryId, setSelectedCountryId] = useState<number>(1)

    const onChangeCountryId = (id: number) => {
        setSelectedCountryId(id)
    }

    useEffect(() => {
        form.resetFields(["city_id"])
    }, [selectedCountryId, form])

    return (
        <>
            {type === "delivery" && (
                <>
                    <Card>
                        <Row gutter={16}>
                            <Col span={12}>
                                {/* Карта */}
                                <div className={styles.map}>
                                    <YMaps query={{apikey: "4c39433a-67d6-42f4-b776-4ba711ce9508"}}>
                                        <MapComponent
                                            updateCountryName={() => null}
                                            updateCityName={() => null}
                                            form={form}
                                            autoGeolocation
                                            position={[41.311158, 69.279737]}
                                        />
                                    </YMaps>
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        {/* Выбор города */}
                                        <SelectCountry onChange={onChangeCountryId} />
                                    </Col>
                                    <Col span={12}>
                                        {/* Выбор города */}
                                        <SelectCity countryId={selectedCountryId} />
                                    </Col>
                                    <Col span={24}>
                                        {/* Выбор адрес */}
                                        <Form.Item label="Адрес" name="address">
                                            <Input placeholder="Введите адрес" id="address" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        {/* Имя */}
                                        <Form.Item label="Имя" name="delivery_name">
                                            <Input placeholder="Введите имя" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        {/* Номер телефона */}
                                        <Form.Item label="Номер телефона" name="delivery_phone">
                                            <Input placeholder="Введите номер телефона" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <Divider />
                </>
            )}
        </>
    )
}

export default Delivery
