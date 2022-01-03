import React from "react"
import {Menu, Modal} from "antd"
import styles from "./AccountNavigation.module.less"
import {PoweroffOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons"
import {useDispatch} from "store"
import {logoutUser} from "features/user/logoutUser"
import {useHistory} from "react-router-dom"

const AccountNavigation = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        Modal.confirm({
            title: "Вы действительно хотите выйти?",
            okText: "Да",
            onOk: () => {
                dispatch(logoutUser())
            }
        })
    }

    return <Menu>
        <Menu.Item
            key="profile"
            className={styles.accountItem}
            onClick={() => history.push("/profile")}
        >
            <UserOutlined /> Профиль
        </Menu.Item>
        <Menu.Item
            key="settings"
            className={styles.accountItem}
            onClick={() => history.push("/settings")}
        >
            <SettingOutlined /> Настройки
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
            className={styles.accountItem}
            onClick={logoutHandler}
            key="exit"
        >
            <PoweroffOutlined /> Выход
        </Menu.Item>
    </Menu>
}

export default AccountNavigation