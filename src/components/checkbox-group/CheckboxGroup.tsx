import React from "react"
import {Checkbox, Form} from "antd"
import styles from "./CheckboxGroup.module.less"
import cn from "classnames"
import {LoadingOutlined} from "@ant-design/icons"
import {NamePath, Rule} from "rc-field-form/lib/interface"

interface CheckboxGroupProps {
    label?: string
    name: NamePath
    fieldKey?: React.Key | React.Key[]
    rules: Rule[]
    loading?: boolean
    data: {
        label: string
        val: string | number
    }[]
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = (
    {
        data,
        fieldKey,
        loading,
        rules,
        name,
        label
    }
) => {
    return (
        <Form.Item
            fieldKey={fieldKey}
            label={label}
            name={name}
            rules={rules}
        >
            <Checkbox.Group className={styles.group}>
                <div className={cn(styles.grid, {[styles.loading]: loading})}>
                    {
                        loading ?
                            <div className={styles.loadingBlock}>
                                <LoadingOutlined />
                            </div> :
                            data.map(item => (
                                <div key={item.val} className={styles.item}>
                                    <Checkbox value={item.val}>{item.label}</Checkbox>
                                </div>
                            ))
                    }
                </div>
            </Checkbox.Group>
        </Form.Item>
    )
}

export default CheckboxGroup
