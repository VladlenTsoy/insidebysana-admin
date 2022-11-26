import React, {useEffect, useState} from "react"
import styles from "./Delivery.module.less"
import {Card, Col, Divider, Form, FormInstance, Input, Row} from "antd"
import {YMaps} from "@pbe/react-yandex-maps"
import SelectCity from "features/city/select-city/SelectCity"
import SelectCountry from "features/country/select-country/SelectCountry"
import MapComponent from "components/map/Map"
import SelectTypeDelivery from "features/type-delivery/select-type-delivery/SelectTypeDelivery"

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
                        <Form.Item name={["address", "position"]} hidden>
                            <Input />
                        </Form.Item>
                        <Row gutter={16}>
                            <Col md={12} xs={24}>
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
                            <Col md={12} xs={24}>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        {/* Выбор тип доставки */}
                                        <SelectTypeDelivery countryId={selectedCountryId} />
                                    </Col>
                                    <Col md={12}>
                                        {/* Выбор города */}
                                        <SelectCountry onChange={onChangeCountryId} />
                                    </Col>
                                    <Col md={12}>
                                        {/* Выбор города */}
                                        <SelectCity countryId={selectedCountryId} />
                                    </Col>
                                    <Col md={24}>
                                        {/* Выбор адрес */}
                                        <Form.Item label="Адрес" name={["address", "address"]}>
                                            <Input placeholder="Введите адрес" id="address" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        {/* Имя */}
                                        <Form.Item label="Имя" name={["address", "full_name"]}>
                                            <Input placeholder="Введите имя" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        {/* Номер телефона */}
                                        <Form.Item label="Номер телефона" name={["address", "phone"]}>
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
