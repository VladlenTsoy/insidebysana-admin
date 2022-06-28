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

    const menuItems = [
        {
            key: "profile",
            className: styles.accountItem,
            label: (
                <>
                    <UserOutlined /> Профиль
                </>
            ),
            onClick: () => history.push("/profile")
        },
        {
            key: "settings",
            className: styles.accountItem,
            label: (
                <>
                    <SettingOutlined /> Настройки
                </>
            ),
            onClick: () => history.push("/settings")
        },
        {
            key: "exit",
            className: styles.accountItem,
            label: (
                <>
                    <PoweroffOutlined /> Выход
                </>
            ),
            onClick: logoutHandler
        }
    ]

    return <Menu items={menuItems} />
}

export default AccountNavigation
