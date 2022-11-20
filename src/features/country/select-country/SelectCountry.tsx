import React from "react"
import {Form, Select} from "antd"
import {useGetCountriesQuery} from "../countryApi"
import styles from "./SelectCountry.module.less"

interface SelectCountryProps {
    onChange?: (id: number) => void;
}

/**
 * Выбрать страну
 * @constructor
 */
const SelectCountry: React.FC<SelectCountryProps> = ({onChange}) => {
    const {data: countries, isLoading: isLoadingCountries} = useGetCountriesQuery()

    return (
        <Form.Item
            label="Выберите страну"
            name={["address", "country"]}
            rules={[{required: true, message: "Выберите страну!"}]}
        >
            <Select
                loading={isLoadingCountries}
                showSearch
                optionFilterProp="label"
                placeholder="Выберите страну"
                onChange={onChange}
            >
                {countries?.map(country => (
                    <Select.Option val={country.id} key={country.id} label={country.name}>
                        <div className={styles.name}>
                            <img src={country.url_flag} alt={country.name} className={styles.flag} />
                            {country.name}
                        </div>
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default SelectCountry
