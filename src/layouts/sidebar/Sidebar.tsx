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

const Sidebar = () => {
    const location = useLocation()
    const pathnameArray = location.pathname.split("/")

    return (
        <div className={styles.logoMenuSticky}>
            <div className={styles.logo} />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[pathnameArray[1]]}
                className={styles.siteLayoutMenu}
            >
                <Menu.Item key="" icon={<HomeOutlined />}>
                    <Link to="/">Главная</Link>
                </Menu.Item>
                <Menu.Item key="orders" icon={<DollarOutlined />}>
                    <Link to="/orders">Заказы</Link>
                </Menu.Item>
                <Menu.Item key="products" icon={<SkinOutlined />}>
                    <Link to="/products/all">Одежда</Link>
                </Menu.Item>
                <Menu.Item key="clients" icon={<TeamOutlined />}>
                    <Link to="/clients">Клиенты</Link>
                </Menu.Item>
                <Menu.Item key="staff" icon={<CrownOutlined />}>
                    <Link to="/staff">Сотрудники</Link>
                </Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>
                    <Link to="/settings">Настройки</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar