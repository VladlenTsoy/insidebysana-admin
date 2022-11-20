import React from "react"
import {Form, TreeSelect} from "antd"
import {useGetAllSelloCategoriesQuery} from "./selloCategoryApi"

const SelloCategoryFormSelect: React.FC = () => {
    const {isLoading, data: categories} = useGetAllSelloCategoriesQuery()

    return (
        <Form.Item
            label="Sello Категория"
            name="sello_category_id"
            // rules={[{required: true, message: "Выберите категорию для sello!"}]}
        >
            <TreeSelect
                style={{width: "100%"}}
                showSearch
                // optionFilterProp="title"
                loading={isLoading}
                allowClear
                dropdownStyle={{maxHeight: 800, overflow: "auto"}}
                treeData={categories}
                placeholder="Выберите категорию для sello"
                filterTreeNode={(input, option: any) => option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            />
        </Form.Item>
    )
}
export default SelloCategoryFormSelect
