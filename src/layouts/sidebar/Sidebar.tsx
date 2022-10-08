import React from "react"
import styles from "./Sidebar.module.less"
import {Menu} from "antd"
import {AnimatePresence, motion} from "framer-motion"
import {
    CrownOutlined,
    DollarOutlined,
    HomeOutlined,
    SettingOutlined,
    SkinOutlined,
    TeamOutlined
} from "@ant-design/icons"
import {Link, useLocation} from "react-router-dom"
import LogoIconImage from "assets/images/logo-icon-152x152.png"

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

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({collapsed}) => {
    const location = useLocation()
    const pathnameArray = location.pathname.split("/")

    return (
        <div className={styles.logoMenuSticky}>
            <div className={styles.logo}>
                <div className={styles.logoImage}>
                    <img src={LogoIconImage} alt="logo" />
                </div>
                <AnimatePresence>
                    <div className={styles.title}>
                        {!collapsed && (
                            <motion.div
                                animate={{opacity: 1, x: 0, transition: {delay: 0.25}}}
                                initial={{opacity: 0, x: "100%"}}
                                exit={{opacity: 0, x: "100%"}}
                                key="icon"
                                className={styles.text}
                            >
                                Inside By Sana
                            </motion.div>
                        )}
                    </div>
                </AnimatePresence>
            </div>
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
