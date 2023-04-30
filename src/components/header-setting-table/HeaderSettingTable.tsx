import React from "react"
import styles from "./HeaderSettingTable.module.less"

interface HeaderSettingTableProps {
    children: React.ReactNode
}

const HeaderSettingTable: React.FC<HeaderSettingTableProps> = ({children}) => {
    return (
        <div className={styles.header}>
            {children}
        </div>
    )
}

export default HeaderSettingTable
