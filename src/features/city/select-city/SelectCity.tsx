import React from "react"
import {useGetCitiesByCountryIdQuery} from "../cityApi"
import {Form, Select} from "antd"

interface SelectCityProps {
    countryId?: number;
}

/**
 * Выбрать город
 * @param countryId
 * @constructor
 */
const SelectCity: React.FC<SelectCityProps> = ({countryId}) => {
    const {data: cities, isLoading: isLoadingCities} = useGetCitiesByCountryIdQuery(countryId || 0, {skip: !countryId})

    return (
        <Form.Item label="Выберите город" name="city_id" rules={[{required: true, message: "Выберите город!"}]}>
            <Select loading={isLoadingCities} showSearch optionFilterProp="label" placeholder="Выберите город">
                {cities?.map(city => (
                    <Select.Option val={city.id} key={city.id}>
                        {city.name}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default SelectCity
