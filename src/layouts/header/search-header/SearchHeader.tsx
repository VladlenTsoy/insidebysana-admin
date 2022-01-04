import React from "react"
import {Input} from "antd"
import {SearchOutlined} from "@ant-design/icons"
import styles from "./SearchHeader.module.less"

const SearchHeader = () => {
    return (
        <Input size="large" className={styles.input} placeholder="Поиск" prefix={<SearchOutlined />} />
    )
}

export default SearchHeader