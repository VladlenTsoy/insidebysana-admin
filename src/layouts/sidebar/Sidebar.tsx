import React from "react"
import styles from "./Sidebar.module.less"
import {Menu} from "antd"
import {
    CrownOutlined,
    DollarOutlined,
    HomeOutlined,
    SettingOutlined,
    SkinOutlined,
    TeamOutlined
} from "@ant-design/icons"
import {Link, useLocation} from "react-router-dom"

const menuItems = [
    {icon: <HomeOutlined />, label: <Link to="/">Главная</Link>, key: ""},
    {
        icon: <DollarOutlined />,
        label: <Link to="/orders">Заказы</Link>,
        key: "orders"
    },
    {
        icon: <SkinOutlined />,
        label: <Link to="/products/all">Одежда</Link>,
        key: "products"
    },
    {
        icon: <TeamOutlined />,
        label: <Link to="/clients">Клиенты</Link>,
        key: "clients"
    },
    {
        icon: <CrownOutlined />,
        label: <Link to="/staff">Сотрудники</Link>,
        key: "staff"
    },
    {
        icon: <SettingOutlined />,
        label: <Link to="/settings">Настройки</Link>,
        key: "settings"
    }
]

const Sidebar = () => {
    const location = useLocation()
    const pathnameArray = location.pathname.split("/")

    return (
        <div className={styles.logoMenuSticky}>
            <div className={styles.logo} />
            <Menu
                theme="dark"
                mode="inline"
                items={menuItems}
                defaultSelectedKeys={[pathnameArray[1]]}
                className={styles.siteLayoutMenu}
            />
        </div>
    )
}

export default Sidebar
